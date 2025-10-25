import Categorymodel from "../models/catagory.js";
import { v2 as cloudinary } from "cloudinary";

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
      const result = await cloudinary.uploader.upload(image[i].path, options);

      // Save both url and public_id
      imagesArr.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      // cleanup local file
      fs.unlinkSync(`uploads/${request.files[i].filename}`);
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

export async function createCategory(request, response) {
  try {
    let category = new Categorymodel({
      name: request.body.name,
      images: request.body.images, // ✅ take directly from request
      parentId: request.body.parentId || null,
      parentCatName: request.body.parentCatName || "",
    });

    if (!category) {
      return response.status(400).json({
        message: "Category not created",
        error: true,
        success: false,
      });
    }
    category = await category.save();

    return response.status(200).json({
      message: "Category Created",
      error: false,
      success: true,
      category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await Categorymodel.find();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });

    const rootCategories = [];
    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId]?.children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    return res.status(200).json({
      error: false,
      success: true,
      data: rootCategories, // ✅ fixed typo
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
}

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
    const publicId = req.query.public_id;

    if (!publicId) {
      return res
        .status(400)
        .json({ error: true, message: "public_id required" });
    }

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
async function deleteCategoryRecursive(categoryId) {
  const category = await Categorymodel.findById(categoryId);
  if (!category) return;

  // Delete images from Cloudinary
  for (const img of category.images) {
    if (img.public_id) {
      await cloudinary.uploader.destroy(img.public_id);
    }
  }

  // Delete subcategories first
  const subCategories = await Categorymodel.find({ parentId: category._id });
  for (const sub of subCategories) {
    await deleteCategoryRecursive(sub._id);
  }

  // Delete category itself
  await Categorymodel.findByIdAndDelete(category._id);
}

// export async function deleteCatagory(req, res) {
//   try {
//     const category = await Categorymodel.findById(req.params.id);
//     if (!category)
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });

//     // Delete images properly
//     for (let img of category.images) {
//       if (img?.public_id) {
//         await cloudinary.uploader.destroy(img.public_id);
//       }
//     }

//     // Delete subcategories recursively
//     const subCategories = await Categorymodel.find({ parentId: category._id });
//     for (const sub of subCategories) {
//       await deleteCatagory({ params: { id: sub._id } }, res); // recursive
//     }

//     await Categorymodel.findByIdAndDelete(category._id);

//     return res.status(200).json({ success: true, message: "Category Deleted" });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// }

export async function deleteCatagory(req, res) {
  try {
    const { id } = req.params;
    const category = await Categorymodel.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await deleteCategoryRecursive(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function updatedCategory(req, res) {
  try {
    let images = req.body.images || [];

    if (req.files?.length > 0) {
      const uploaded = await Promise.all(
        req.files.map((file) => cloudinary.uploader.upload(file.path))
      );
      images = uploaded.map((u) => ({
        url: u.secure_url,
        public_id: u.public_id,
      }));
      req.files.forEach((f) => fs.unlinkSync(`uploads/${f.filename}`));
    }

    const category = await Categorymodel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        images,
        parentId: req.body.parentId || null,
        parentCatName: req.body.parentCatName || "",
      },
      { new: true }
    );

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    return res.json({ success: true, category });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
