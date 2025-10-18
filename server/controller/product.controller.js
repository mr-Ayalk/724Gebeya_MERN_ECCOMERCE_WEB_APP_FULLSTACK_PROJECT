import ProductModel from "../models/product.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ProductRAMSModel from "../models/productRAMS.js";
import ProductWEIGHTModel from "../models/productWEIGHT.js";
import ProductSIZEModel from "../models/productSIZE.js";

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
var bannerimage = [];
export async function uploadBannerImages(request, response) {
  try {
    bannerimage = [];

    const image = request.files;
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const result = await cloudinary.uploader.upload(image[i].path, options);

      // Save both url and public_id
      bannerimage.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      // cleanup local file
      fs.unlinkSync(`uploads/${request.files[i].filename}`);
    }

    return response.status(200).json({
      images: bannerimage,
    });
  } catch (error) {
    return response.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function createProduct(request, response) {
  try {
    let product = new ProductModel({
      name: request.body.name,
      bannerTitlename: request.body.bannerTitlename,
      description: request.body.description,
      images: request.body.images,
      bannerimages: request.body.bannerimages,
      isDisplayOnHomeBanner: request.body.isDisplayOnHomeBanner,
      brand: request.body.brand,
      price: request.body.price,
      oldPrice: request.body.oldPrice,
      catName: request.body.catName,
      catId: request.body.catId,
      category: request.body.category,
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
    return response.status(200).json({
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
      // .populate("category")
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
      // .populate("category")
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
      // .populate("category")
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
      // .populate("category")
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
      // .populate("category")
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
      // .populate("category")
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
      // .populate("category")
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
        // .populate("category")
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
        // .populate("category")
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
        // .populate("category")
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

//delete all products

export async function deleteMultipleProduct(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(400).json({
      error: true,
      success: false,
      message: "Invalid input",
    });
  }
  for (let i = 0; i < ids?.length; i++) {
    const product = await ProductModel.findById(ids[i]);
    const images = product.images;
    let img = "";
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        cloudinary.uploader.destroy(imageName, (error, result) => {
          //console.log(error,result)
        });
      }
    }
  }
  try {
    await ProductModel.deleteMany({ _id: { $in: ids } });
    return response.status(200).json({
      message: "Product deleted successfully",
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
//updated product

export async function updatedProduct(request, response) {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        description: request.body.description,
        //   images: imagesArr,
        bannerTitlename: request.body.bannerTitlename,
        isDisplayOnHomeBanner: request.body.isDisplayOnHomeBanner,
        bannerimages: request.body.bannerimages,
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

/////////////////////////////////////////////////////
///////////RAMS CONTROLLER////////////////
//create ram

export async function createProductRAMS(request, response) {
  try {
    let productRAMS = new ProductRAMSModel({
      name: request.body.name,
    });
    productRAMS = await productRAMS.save();
    if (!productRAMS) {
      response.status(400).json({
        message: "Product RAMS Not Created",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "ProductRAM Created Successfully",
      error: false,
      success: true,
      product: productRAMS,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// delete product RAMS

export async function deleteProductRAMS(request, response) {
  const productRAMS = await ProductRAMSModel.findById(request.params.id);
  if (!productRAMS) {
    return response.status(404).json({
      message: "Product RAM Not found",
      error: true,
      success: false,
    });
  }

  const deletedProductRAMS = await ProductRAMSModel.findByIdAndDelete(
    request.params.id
  );
  if (!deletedProductRAMS) {
    response.status(404).json({
      message: "Product RAM not deleted !",
      success: false,
      error: true,
    });
  }
  return response.status(200).json({
    success: true,
    error: false,
    message: "Product RAM Deleted!",
  });
}

//delete all RAMS

export async function deleteMultipleProductRAMS(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(400).json({
      error: true,
      success: false,
      message: "Invalid input",
    });
  }
  for (let i = 0; i < ids?.length; i++) {
    const productRAMS = await ProductRAMSModel.findById(ids[i]);
  }
  try {
    await ProductRAMSModel.deleteMany({ _id: { $in: ids } });
    return response.status(200).json({
      message: "Product Ram deleted successfully",
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
//update product rams
export async function updateProductRAMS(request, response) {
  try {
    const productRAMS = await ProductRAMSModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
      },
      {
        new: true,
      }
    );
    if (!productRAMS) {
      return response.status(400).json({
        message: "Product Ram can not be updated",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "The product ram is updated",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//get rams
export async function getProductRAMS(request, response) {
  try {
    const productRAMS = await ProductRAMSModel.find();
    if (!productRAMS) {
      return response.status(404).json({
        message: "No Product RAMS found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      data: productRAMS,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get rams byID
export async function getProductRAMSById(request, response) {
  try {
    const productRAMS = await ProductRAMSModel.findById(request.params.id);
    if (!productRAMS) {
      return response.status(404).json({
        message: "No Product RAMS found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      data: productRAMS,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
/////////////////////////////////////////////////////
///////////Weight CONTROLLER////////////////

//create Weight

export async function createProductWEIGHT(request, response) {
  try {
    let productWEIGHT = new ProductWEIGHTModel({
      name: request.body.name,
    });
    productWEIGHT = await productWEIGHT.save();
    if (!productWEIGHT) {
      response.status(400).json({
        message: "Product WEIGHT Not Created",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "Product WEIGHT Created Successfully",
      error: false,
      success: true,
      product: productWEIGHT,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// delete product WEIGHT

export async function deleteProductWEIGHT(request, response) {
  const productWEIGHT = await ProductWEIGHTModel.findById(request.params.id);
  if (!productWEIGHT) {
    return response.status(404).json({
      message: "Product WEIGHT Not found",
      error: true,
      success: false,
    });
  }

  const deletedProductWEIGHT = await ProductWEIGHTModel.findByIdAndDelete(
    request.params.id
  );
  if (!deletedProductWEIGHT) {
    response.status(404).json({
      message: "Product WEIGHT not deleted !",
      success: false,
      error: true,
    });
  }
  return response.status(200).json({
    success: true,
    error: false,
    message: "Product WEIGHT Deleted!",
  });
}

//delete all WEIGHT

export async function deleteMultipleProductWEIGHT(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(400).json({
      error: true,
      success: false,
      message: "Invalid input",
    });
  }
  for (let i = 0; i < ids?.length; i++) {
    const productWEIGHT = await ProductWEIGHTModel.findById(ids[i]);
  }
  try {
    await ProductWEIGHTModel.deleteMany({ _id: { $in: ids } });
    return response.status(200).json({
      message: "Product Ram deleted successfully",
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
//update product WEIGHT
export async function updateProductWEIGHT(request, response) {
  try {
    const productWEIGHT = await ProductWEIGHTModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
      },
      {
        new: true,
      }
    );
    if (!productWEIGHT) {
      return response.status(400).json({
        message: "Product Ram can not be updated",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "The product ram is updated",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//get WEIGHT
export async function getProductWEIGHT(request, response) {
  try {
    const productWEIGHT = await ProductWEIGHTModel.find();
    if (!productWEIGHT) {
      return response.status(404).json({
        message: "No Product WEIGHT found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      data: productWEIGHT,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get WEIGHT byID
export async function getProductWEIGHTById(request, response) {
  try {
    const productWEIGHT = await ProductWEIGHTModel.findById(request.params.id);
    if (!productWEIGHT) {
      return response.status(404).json({
        message: "No Product RAMS found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      data: productWEIGHT,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

/////////////////////////////////////////////////////
///////////SIZE CONTROLLER////////////////

//create SIZE

export async function createProductSIZE(request, response) {
  try {
    let productSIZE = new ProductSIZEModel({
      name: request.body.name,
    });
    productSIZE = await productSIZE.save();
    if (!productSIZE) {
      response.status(400).json({
        message: "Product SIZE Not Created",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "Product SIZE Created Successfully",
      error: false,
      success: true,
      product: productSIZE,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// delete product SIZE

export async function deleteProductSIZE(request, response) {
  const productSIZE = await ProductSIZEModel.findById(request.params.id);
  if (!productSIZE) {
    return response.status(404).json({
      message: "Product SIZE Not found",
      error: true,
      success: false,
    });
  }

  const deletedProductSIZE = await ProductSIZEModel.findByIdAndDelete(
    request.params.id
  );
  if (!deletedProductSIZE) {
    response.status(404).json({
      message: "Product SIZE not deleted !",
      success: false,
      error: true,
    });
  }
  return response.status(200).json({
    success: true,
    error: false,
    message: "Product SIZE Deleted!",
  });
}

//delete all WEIGHT

export async function deleteMultipleProductSIZE(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(400).json({
      error: true,
      success: false,
      message: "Invalid input",
    });
  }
  for (let i = 0; i < ids?.length; i++) {
    const productSIZE = await ProductSIZEModel.findById(ids[i]);
  }
  try {
    await ProductSIZEModel.deleteMany({ _id: { $in: ids } });
    return response.status(200).json({
      message: "Product SIZE deleted successfully",
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
//update product SIZE
export async function updateProductSIZE(request, response) {
  try {
    const productSIZE = await ProductSIZEModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
      },
      {
        new: true,
      }
    );
    if (!productSIZE) {
      return response.status(400).json({
        message: "Product SIZE can not be updated",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "The product SIZE is updated",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//get SIZE
export async function getProductSIZE(request, response) {
  try {
    const productSIZE = await ProductSIZEModel.find();
    if (!productSIZE) {
      return response.status(404).json({
        message: "No Product SIZE found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      data: productSIZE,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get SIZE byID
export async function getProductSIZEById(request, response) {
  try {
    const productSIZE = await ProductSIZEModel.findById(request.params.id);
    if (!productSIZE) {
      return response.status(404).json({
        message: "No Product SIZE found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      data: productSIZE,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function filters(request, response) {
  try {
    let {
      catId,
      subCatId,
      thirdsubCatId,
      minPrice,
      maxPrice,
      rating,
      page = 1,
      limit = 10,
    } = request.body;

    const filters = {};

    // Category filters
    if (catId?.length) filters.catId = { $in: catId };
    if (subCatId?.length) filters.subCatId = { $in: subCatId };
    if (thirdsubCatId?.length) filters.thirdsubCatId = { $in: thirdsubCatId };

    // Price filter
    if (minPrice || maxPrice) {
      filters.price = {
        $gte: Number(minPrice) || 0,
        $lte: Number(maxPrice) || Number.MAX_SAFE_INTEGER,
      };
    }

    // Rating filter
    if (rating?.length) filters.rating = { $in: rating };

    // Pagination calculation
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    // Fetch data
    const products = await ProductModel.find(filters)
      .populate("catId") // <-- use correct field name (e.g., category, catId, etc.)
      .skip(skip)
      .limit(limit);

    // Count total
    const total = await ProductModel.countDocuments(filters);

    return response.status(200).json({
      error: false,
      success: true,
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
