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

export async function getCategory(request, response) {
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
