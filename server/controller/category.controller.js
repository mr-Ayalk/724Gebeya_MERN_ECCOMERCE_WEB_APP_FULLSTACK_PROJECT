import Categorymodel from "../models/catagory.js";
import { v2 as cloudinary } from "cloudinary";
import { error } from "console";

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

// image uploader

var imagesArr = [];
export async function uploadImages(request, response) {
  try {
    imagesArr = [];

    const image = request.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };
    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          // console.log(result);
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
          console.log(request.files[i].filename);
        }
      );
    }

    return response.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return response.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//create cateory

export async function createCategory(request, response) {
  try {
    let category = new Categorymodel({
      name: request.body.name,
      images: imagesArr,
      parentId: request.body.parentId,
      parentCatName: request.body.parentCatName,
    });

    if (!category) {
      return response.status(400).json({
        message: "Category not created",
        error: true,
        success: false,
      });
    }
    category = await category.save();
    imagesArr = [];
    return response.status(200).json({
      message: "Category Created",
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all category

export async function getCategories(request, response) {
  try {
    const categories = await Categorymodel.find();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });
    const rootCategories = [];
    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });
    return response.status(200).json({
      error: false,
      success: true,
      daata: rootCategories,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get category count
export async function getCategoryCount(request, response) {
  try {
    const categoryCount = await Categorymodel.countDocuments({
      parentId: undefined,
    });
    if (!categoryCount) {
      response.status(500).json({ success: false, error: true });
    } else {
      response.send({
        categoryCount: categoryCount,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//get sub category count
// export async function getsubCategoryCount(request, response) {
//   try {
//     const categories = await Categorymodel.find();
//     if (!categories) {
//       response.status(500).json({ success: false, error: true });
//     } else {
//       const subCatList = [];
//       for (let cat of categories) {
//         if (cat.parentId !== undefined) {
//           subCatList.push(cat);
//         }
//       }
//       response.send({
//         subCategoryCount: subCatList.length,
//       });
//     }
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// }
export async function getsubCategoryCount(request, response) {
  try {
    const subCategoryCount = await Categorymodel.countDocuments({
      parentId: { $ne: null }, // only where parentId is NOT null
    });

    return response.send({ subCategoryCount });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get single category
export async function getCategory(request, response) {
  try {
    const category = await Categorymodel.findById(request.params.id);
    if (!category) {
      response.status(500).json({
        message: "The category with the given Id was not found.",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function removeImageFromCloudinary(req, res) {
  try {
    const imgUrl = req.query.img;
    if (!imgUrl) {
      return res
        .status(400)
        .json({ error: true, message: "Image URL required" });
    }

    // Extract the file name part
    const fileName = imgUrl.split("/").pop(); // "1755768104262_image1_large_1.jpg"

    const publicId = fileName.split(".")[0]; // "1755768104262_image1_large_1"

    console.log("Deleting Cloudinary public_id:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return res
        .status(200)
        .json({ success: true, message: "Image deleted", result });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Image not found", result });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
}
// export async function deleteCatagory(request, response) {
//   try {
//     const category = await Categorymodel.findById(request.params.id);
//     const images = category.images;
//     for (let img of images) {
//       const imgUrl = img;
//       const urlArr = imgUrl.split("/");
//       const image = urlArr[urlArr.length - 1];
//       const imageName = image.split(".")[0];
//       if (imageName) {
//         cloudinary.uploader.destroy(imageName, (error, result) => {
//           // console.log(error,result)
//         });
//         //    console.log(imageName);
//       }
//       const subCategory = await Categorymodel.find({
//         parentId: request.params.id,
//       });

//       for (let i = 0; i < subCategory.length; i++) {
//         console.log(subCategory[i]._id);
//         const thirdsubCategory = await Categorymodel.find({
//           parentId: subCategory[i]._id,
//         });
//         for (let i = 0; i < thirdsubCategory.length; i++) {
//           const deletedThirdSubCat = await Categorymodel.findByIdAndDelete(
//             thirdsubCategory[i]._id
//           );
//         }
//         const deletedSubCat = await Categorymodel.findByIdAndDelete(
//           subCategory[i]._id
//         );
//       }

//       const deletedCat = await Categorymodel.findByIdAndDelete(
//         request.params.id
//       );
//       if (!deletedCat) {
//         response.status(404).json({
//           message: "Category not found !",
//           success: false,
//           error: true,
//         });
//       }

//       response.status(200).json({
//         success: true,
//         error: false,
//         message: "Category Deleted",
//       });
//     }
//   } catch (error) {
//     return response.status(500).json({
//       error: true,
//       message: error.message,
//       success: false,
//     });
//   }
// }
export async function deleteCatagory(request, response) {
  try {
    const category = await Categorymodel.findById(request.params.id);

    if (!category) {
      return response.status(404).json({
        success: false,
        error: true,
        message: "Category not found",
      });
    }

    // 1. Delete category images
    for (let imgUrl of category.images) {
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        await cloudinary.uploader.destroy(imageName);
      }
    }

    // 2. Delete subcategories (and third-level subcategories)
    const subCategories = await Categorymodel.find({ parentId: category._id });
    for (let i = 0; i < subCategories.length; i++) {
      const thirdLevelSubs = await Categorymodel.find({
        parentId: subCategories[i]._id,
      });

      for (let j = 0; j < thirdLevelSubs.length; j++) {
        await Categorymodel.findByIdAndDelete(thirdLevelSubs[j]._id);
      }

      await Categorymodel.findByIdAndDelete(subCategories[i]._id);
    }

    // 3. Delete main category
    await Categorymodel.findByIdAndDelete(category._id);

    return response.status(200).json({
      success: true,
      error: false,
      message: "Category Deleted",
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// export async function updatedCategory(request, response) {
//   const category = await Categorymodel.findByIdAndUpdate(
//     request.params.id,
//     {
//       name: request.body.name,
//       images: imagesArr.length > 0 ? imagesArr[0] : request.body.images,

//       parentId: request.body.parentId,
//       parentCatName: request.body.parentCatName,
//     },
//     { new: true }
//   );
//   if (!category) {
//     return response.status(404).json({
//       success: false,
//       error: true,
//       message: "Category cannot be updated",
//     });
//   }
//   imagesArr = [];
//   return response.status(200).json({
//     success: true,
//     error: false,
//     category: category,
//   });
// }
export async function updatedCategory(req, res) {
  try {
    let imageUrl = req.body.images; // fallback to existing

    // If new file(s) uploaded
    if (req.files && req.files.length > 0) {
      const uploaded = await cloudinary.uploader.upload(req.files[0].path, {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      });

      imageUrl = uploaded.secure_url;

      // cleanup local file
      fs.unlinkSync(`uploads/${req.files[0].filename}`);
    }

    const category = await Categorymodel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        images: imageUrl,
        parentId: req.body.parentId,
        parentCatName: req.body.parentCatName,
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Category cannot be updated",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message,
    });
  }
}
