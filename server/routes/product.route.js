import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  createProduct,
  getAllProducts,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsByPrice,
  getAllProductsBysubCatId,
  getAllProductsBysubCatName,
  getAllProductsByThirdLevelCatId,
  getAllProductsByThirdLevelCatName,
  uploadImages,
} from "../controller/product.controller.js";

const productRoute = Router();
productRoute.post("/uploadImages", auth, upload.array("images"), uploadImages);
productRoute.post("/create", auth, createProduct);
productRoute.get("/getAllProducts", getAllProducts);
productRoute.get("/getAllProductsByCatId/:id", getAllProductsByCatId);
productRoute.get("/getAllProductsByCatName", getAllProductsByCatName);

productRoute.get("/getAllProductsBysubCatId/:id", getAllProductsBysubCatId);
productRoute.get("/getAllProductsBysubCatName", getAllProductsBysubCatName);
productRoute.get(
  "/getAllProductsthridLevelCatId/:id",
  getAllProductsByThirdLevelCatId
);
productRoute.get(
  "/getAllProductsthridLevelCatName",
  getAllProductsByThirdLevelCatName
);
productRoute.get("/getAllProductByPrice", getAllProductsByPrice);
export default productRoute;
