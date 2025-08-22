import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  createCategory,
  deleteCatagory,
  getCategories,
  getCategory,
  getCategoryCount,
  getsubCategoryCount,
  removeImageFromCloudinary,
  updatedCategory,
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
categoryRouter.get("/", getCategories);
categoryRouter.get("/get/count", getCategoryCount);
categoryRouter.get("/get/count/subCat", getsubCategoryCount);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
categoryRouter.delete("/:id", auth, deleteCatagory);
// categoryRouter.put("/:id", auth, updatedCategory);
categoryRouter.put("/:id", auth, upload.array("images"), updatedCategory);

export default categoryRouter;
