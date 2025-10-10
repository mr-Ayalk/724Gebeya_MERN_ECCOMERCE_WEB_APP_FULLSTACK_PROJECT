import HomeSliderModel from "../models/homeSlider.js";
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

// create home slider
export async function addHomeSlider(request, response) {
  try {
    let homeSlider = new HomeSliderModel({
      images: request.body.images,
    });

    if (!homeSlider) {
      return response.status(400).json({
        message: "homeSlider not created",
        error: true,
        success: false,
      });
    }
    homeSlider = await homeSlider.save();

    return response.status(200).json({
      message: "homeSlider Created",
      error: false,
      success: true,
      homeSlider,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// get all home sliders

export async function getAllHomeSliders(req, res) {
  try {
    const sliders = await HomeSliderModel.find().sort({ createdAt: -1 });
    if (!sliders) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "No sliders found",
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: sliders,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
}

//get single slide
export async function getSlide(request, response) {
  try {
    const slide = await HomeSliderModel.findById(request.params.id);
    if (!slide) {
      response.status(500).json({
        message: "The slide with the given Id was not found.",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      slide: slide,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// delete image from cloudinary
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

//delete slide
export async function deleteSlide(req, res) {
  try {
    const slide = await HomeSliderModel.findById(req.params.id);
    if (!slide)
      return res
        .status(404)
        .json({ success: false, message: "slide not found" });

    // Delete images properly
    for (let img of slide.images) {
      if (img?.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await HomeSliderModel.findByIdAndDelete(slide._id);

    return res.status(200).json({ success: true, message: "slide Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

//updated slide

export async function updatedSlide(req, res) {
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

    const slide = await HomeSliderModel.findByIdAndUpdate(
      req.params.id,
      {
        // name: req.body.name,
        images,
        // parentId: req.body.parentId || null,
        // parentCatName: req.body.parentCatName || "",
      },
      { new: true }
    );

    if (!slide)
      return res
        .status(404)
        .json({ success: false, message: "slide not found" });

    return res.json({ success: true, error: false, slide });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

//delete all slides

export async function deleteMultipleSlides(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(400).json({
      error: true,
      success: false,
      message: "Invalid input",
    });
  }
  for (let i = 0; i < ids?.length; i++) {
    const slide = await HomeSliderModel.findById(ids[i]);
    const images = slide.images;
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
    await HomeSliderModel.deleteMany({ _id: { $in: ids } });
    return response.status(200).json({
      message: "Slides deleted successfully",
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
