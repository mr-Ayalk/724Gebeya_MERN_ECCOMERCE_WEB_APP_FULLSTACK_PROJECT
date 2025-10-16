import BannerV1Model from "../models/bannerV1";
import { v2 as cloudinary } from "cloudinary";
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

//Add BannerV1
export async function addBanner(request, response) {
  try {
    let banner = new BannerV1Model({
      bannerTitle: request.body.bannerTitle,
      images: request.body.images,
      catId: request.body.catId || null,
      subCatId: request.body.subCatId || null,
      thirdsubCatId: request.body.thirdsubCatId || null,
      price: request.body.price || "",
    });

    if (!banner) {
      return response.status(400).json({
        message: "Banner not created",
        error: true,
        success: false,
      });
    }
    banner = await banner.save();

    return response.status(200).json({
      message: "Banner Created",
      error: false,
      success: true,
      banner,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get single banner
export async function getBanner(request, response) {
  try {
    const banner = await BannerV1Model.findById(request.params.id);
    if (!banner) {
      response.status(500).json({
        message: "The banner with the given Id was not found.",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      banner,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Get Banners
export async function getBanners(req, res) {
  try {
    const banners = await BannerV1Model.find();
    if (!banners) {
      return res.status(400).json({ error: true, message: "No banners found" });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: banners,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
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

//delete banner
export async function deleteBanner(req, res) {
  try {
    const banner = await BannerV1Model.findById(req.params.id);
    if (!banner)
      return res
        .status(404)
        .json({ success: false, message: "banner not found" });

    // Delete images properly
    for (let img of banner.images) {
      if (img?.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await BannerV1Model.findByIdAndDelete(banner._id);

    return res.status(200).json({ success: true, message: "Banner Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

//update banner
export async function updatedBanner(req, res) {
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

    const banner = await BannerV1Model.findByIdAndUpdate(
      req.params.id,
      {
        bannerTitle: request.body.bannerTitle,
        images: request.body.images,
        catId: request.body.catId || null,
        subCatId: request.body.subCatId || null,
        thirdsubCatId: request.body.thirdsubCatId || null,
        price: request.body.price || "",
      },
      { new: true }
    );

    if (!banner)
      return res
        .status(404)
        .json({ success: false, error: true, message: "Banner not found" });

    return res.json({ success: true, error: false, banner });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: true, message: err.message });
  }
}
