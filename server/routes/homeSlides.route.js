import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  addHomeSlider,
  deleteMultipleSlides,
  deleteSlide,
  getAllHomeSliders,
  getSlide,
  removeImageFromCloudinary,
  updatedSlide,
  uploadImages,
} from "../controller/homeSlider.js";

const homeSliderRouter = Router();
homeSliderRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  uploadImages
);

homeSliderRouter.post("/add", auth, addHomeSlider);
homeSliderRouter.get("/", getAllHomeSliders);

homeSliderRouter.get("/:id", getSlide);
homeSliderRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
homeSliderRouter.delete("/:id", auth, deleteSlide);

homeSliderRouter.put("/:id", auth, upload.array("images"), updatedSlide);
homeSliderRouter.delete("/deleteMultipleSlides", deleteMultipleSlides);

export default homeSliderRouter;
