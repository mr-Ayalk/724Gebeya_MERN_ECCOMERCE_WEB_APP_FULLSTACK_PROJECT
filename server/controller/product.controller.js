import ProductModel from "../models/product.js";
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
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//create product

export async function createProduct(request, response) {
  try {
    let product = new ProductModel({
      name: request.body.name,
      description: request.body.description,
      images: imagesArr,
      brand: request.body.brand,
      price: request.body.price,
      oldPrice: request.body.oldPrice,
      catName: request.body.catName,
      catId: request.body.catId,
      subCatId: request.body.subCatId,
      subCat: request.body.subCat,
      thirdsubCat: request.body.thirdsubCat,
      thirdsubCatId: request.body.thirdsubCatId,
      countInStock: request.body.countInStock,

      rating: request.body.rating,
      isFeatured: request.body.isFeatured,
      discount: request.body.discount,
      productRam: request.body.productRam,
      size: request.body.size,
      productWeight: request.body.productWeight,
    });

    product = await product.save();
    if (!product) {
      response.status(500).json({
        message: "Product Not Created",
        error: true,
        success: false,
      });
    }
    imagesArr = [];
    response.status(200).json({
      message: "Product Created Successfully",
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//get all products
export async function getAllProducts(request, response) {
  try {
    // let { page, limit, search } = request.body;
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all products byCategory Id

export async function getAllProductsByCatId(request, response) {
  try {
    // let { page, limit, search } = request.body;
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      catId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all products byCategory name

export async function getAllProductsByCatName(request, response) {
  try {
    // let { page, limit, search } = request.body;
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      catName: request.query.catName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all products by subCategory Id

export async function getAllProductsBysubCatId(request, response) {
  try {
    // let { page, limit, search } = request.body;
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      subCatId: request.params.subCatId,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all products by subCategory name

export async function getAllProductsBysubCatName(request, response) {
  try {
    // let { page, limit, search } = request.body;
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      subCat: request.query.subCat,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// dddddddddddddddddddddddddddddddddd

//get all products by Third Level Category Id

export async function getAllProductsByThirdLevelCatId(request, response) {
  try {
    // let { page, limit, search } = request.body;
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      thirdsubCatId: request.params.thirdsubCatId,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all products by Third Level Category name

export async function getAllProductsByThirdLevelCatName(request, response) {
  try {
    // let { page, limit, search } = request.body;
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      thirdsubCat: request.query.thirdsubCat,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get all product by price
export async function getAllProductsByPrice(request, response) {
  let productList = [];
  if (request.query.catId !== "" && request.query.catId !== undefined) {
    const productListArr = await ProductModel.find({
      catId: request.query.catId,
    }).populate("category");
    productList = productListArr;
  }
  if (request.query.subCatId !== "" && request.query.subCatId !== undefined) {
    const productListArr = await ProductModel.find({
      subCatId: request.query.subCatId,
    }).populate("category");
    productList = productListArr;
  }
  if (
    request.query.thirdsubCatId !== "" &&
    request.query.thirdsubCatId !== undefined
  ) {
    const productListArr = await ProductModel.find({
      thirdsubCatId: request.query.thirdsubCatId,
    }).populate("category");
    productList = productListArr;
  }

  const filteredProducts = productList.filter((product) => {
    if (
      request.query.minPrice &&
      product.price < parseInt(+request.query.minPrice)
    ) {
      return false;
    }
    if (
      request.query.maxPrice &&
      product.price > parseInt(+request.query.maxPrice)
    ) {
      return false;
    }
    return true;
  });
  return response.status(200).json({
    success: true,
    error: false,
    products: filteredProducts,
    totalPages: 0,
    page: 0,
  });
}

//get all products by rating

export async function getAllProductsByRating(request, response) {
  try {
    // let { page, limit, search } = request.body;
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 5;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }
    let products = [];
    if (request.query.catId !== undefined) {
      products = await ProductModel.find({
        rating: request.query.rating,
        catId: request.query.catId,
        //subCatId: request.query.subCatId,
        //   thirdsubCatId: request.query.thirdsubCatId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }
    if (request.query.subCat !== undefined) {
      products = await ProductModel.find({
        rating: request.query.rating,
        //catId: request.query.catId,
        subCatId: request.query.subCatId,
        //   thirdsubCatId: request.query.thirdsubCatId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (request.query.thirdsubCat !== undefined) {
      products = await ProductModel.find({
        rating: request.query.rating,
        //catId: request.query.catId,
        //   subCatId: request.query.subCatId,
        thirdsubCatId: request.query.thirdsubCatId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//get all product count

export async function getProductCount(request, response) {
  try {
    const productsCount = await ProductModel.countDocuments();
    if (!productsCount) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      productsCount: productsCount,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get all feature products

export async function getAllFeaturedProducts(request, response) {
  try {
    const products = await ProductModel.find({
      isFeatured: true,
    }).populate("category");

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
        message: "No Product Available",
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// delete product

export async function deleteProduct(request, response) {
  const product = await ProductModel.findById(request.params.id).populate(
    "category"
  );
  if (!product) {
    return response.status(404).json({
      message: "Product Not found",
      error: true,
      success: false,
    });
  }
  const images = product.images;
  for (let img of images) {
    const imgUrl = img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];
    if (imageName) {
      cloudinary.uploader.destroy(imageName, (error, result) => {
        // cloudinary.uploader.destroy(imageName, (error, result));
      });
    }
    //console.log(imageName)
  }

  const deletedProduct = await ProductModel.findByIdAndDelete(
    request.params.id
  );
  if (!deletedProduct) {
    response.status(404).json({
      message: "Product not deleted !",
      success: false,
      error: true,
    });
  }
  return response.status(200).json({
    success: true,
    error: false,
    message: "Product Deleted!",
  });
}

// get single product

export async function getProduct(request, response) {
  try {
    const product = await ProductModel.findById(request.params.id).populate(
      "category"
    );

    if (!product) {
      return response.status(404).json({
        message: "The product is not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//remove image from cloudinary

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

//updated product

export async function updatedProduct(request, response) {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        description: request.body.description,
        //   images: imagesArr,
        images: request.body.images,
        brand: request.body.brand,
        price: request.body.price,
        oldPrice: request.body.oldPrice,
        catName: request.body.catName,
        catId: request.body.catId,
        subCatId: request.body.subCatId,
        subCat: request.body.subCat,
        thirdsubCat: request.body.thirdsubCat,
        thirdsubCatId: request.body.thirdsubCatId,
        countInStock: request.body.countInStock,
        category: request.body.category,
        rating: request.body.rating,
        isFeatured: request.body.isFeatured,
        discount: request.body.discount,
        productRam: request.body.productRam,
        size: request.body.size,
        productWeight: request.body.productWeight,
      },
      { new: true }
    );
    if (!product) {
      return response.status(404).json({
        message: "The product can not be updated",
        error: true,
        success: false,
      });
    }
    imagesArr = [];
    return response.status(200).json({
      message: "The product is updated",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
