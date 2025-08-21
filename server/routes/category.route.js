import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  createCategory,
  getCategory,
  getCategoryCount,
  uploadImages,
} from "../controller/category.controller.js";

const categoryRouter = Router();
categoryRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  uploadImages
);

categoryRouter.post("/create", auth, createCategory);
categoryRouter.get("/", auth, getCategory);
categoryRouter.get("/get/count", auth, getCategoryCount);
export default categoryRouter;
