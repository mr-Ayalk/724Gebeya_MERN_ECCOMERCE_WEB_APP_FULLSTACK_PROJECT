import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  addBanner,
  deleteBanner,
  getBanner,
  getBanners,
  removeImageFromCloudinary,
  updatedBanner,
} from "../controller/bannerV1.controller";

const bannerV1Router = Router();

bannerV1Router.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  uploadImages
);

bannerV1Router.post("/add", auth, addBanner);
bannerV1Router.get("/", getBanners);

bannerV1Router.get("/:id", getBanner);
bannerV1Router.delete("/deleteImage", auth, removeImageFromCloudinary);
bannerV1Router.delete("/:id", auth, deleteBanner);

bannerV1Router.put("/:id", auth, upload.array("images"), updatedBanner);

export default bannerV1Router;
