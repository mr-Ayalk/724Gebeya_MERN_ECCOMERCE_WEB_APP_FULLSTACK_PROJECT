import BlogModel from "../models/blog.js";
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

//create blog
export async function addBlog(request, response) {
  try {
    let blog = new BlogModel({
      title: request.body.title,
      images: request.body.images,
      description: request.body.description,
    });

    if (!blog) {
      return response.status(400).json({
        message: "Blog not created",
        error: true,
        success: false,
      });
    }
    blog = await blog.save();

    return response.status(200).json({
      message: "Blog Created Successfully",
      error: false,
      success: true,
      blog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get blogs
export async function getBolgs(req, res) {
  try {
    const blogs = await BlogModel.find();
    if (!blogs) {
      return res
        .status(500)
        .json({ error: true, success: false, message: "blog not found" });
    }
    return res.status(200).json({
      error: false,
      success: true,
      blogs,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, success: false, message: error.message });
  }
}

//get single blog
export async function getBlog(request, response) {
  try {
    const blog = await BlogModel.findById(request.params.id);
    if (!blog) {
      response.status(500).json({
        message: "The blog with the given Id was not found.",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      blog,
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

//delete Blog
export async function deleteBlog(req, res) {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "blog not found" });

    // Delete images properly
    for (let img of blog.images) {
      if (img?.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await BlogModel.findByIdAndDelete(blog._id);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Blog Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message,
    });
  }
}

//Update Blog
export async function updatedBlog(req, res) {
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

    const blog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        images: req.body.images,
        description: req.body.description,
      },
      { new: true }
    );

    if (!blog)
      return res
        .status(404)
        .json({ success: false, error: true, message: "Blog not found" });

    return res.status(200).json({
      success: true,
      error: false,
      blog,
      message: "Blog updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message,
    });
  }
}
