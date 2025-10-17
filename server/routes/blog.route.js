import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  addBlog,
  deleteBlog,
  getBlog,
  getBolgs,
  removeImageFromCloudinary,
  updatedBlog,
  uploadImages,
} from "../controller/blog.controller.js";

const blogRouter = Router();
blogRouter.post("/uploadImages", auth, upload.array("images"), uploadImages);

blogRouter.post("/add", auth, addBlog);
blogRouter.get("/", getBolgs);

blogRouter.get("/:id", getBlog);
blogRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
blogRouter.delete("/:id", auth, deleteBlog);

blogRouter.put("/:id", auth, upload.array("images"), updatedBlog);

export default blogRouter;
