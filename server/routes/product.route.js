import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  createProduct,
  getAllProducts,
  getAllProductsByCatId,
  uploadImages,
} from "../controller/product.controller.js";

const productRoute = Router();
productRoute.post("/uploadImages", auth, upload.array("images"), uploadImages);
productRoute.post("/create", auth, createProduct);
productRoute.get("/getAllProducts", getAllProducts);
productRoute.get("/getAllProductsByCatId/:id", getAllProductsByCatId);
export default productRoute;
