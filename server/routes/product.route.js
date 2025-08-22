import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  createProduct,
  deleteProduct,
  getAllFeaturedProducts,
  getAllProducts,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsByPrice,
  getAllProductsByRating,
  getAllProductsBysubCatId,
  getAllProductsBysubCatName,
  getAllProductsByThirdLevelCatId,
  getAllProductsByThirdLevelCatName,
  getProduct,
  getProductCount,
  removeImageFromCloudinary,
  updatedProduct,
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
productRoute.get("/getAllProductByRating", getAllProductsByRating);
productRoute.get("/getAllProductCount", getProductCount);
productRoute.get("/getAllFeaturedProducts", getAllFeaturedProducts);
productRoute.delete("/:id", deleteProduct);
productRoute.get("/:id", getProduct);

productRoute.delete("/deleteImage", auth, removeImageFromCloudinary);

productRoute.put("/updateProduct/:id", auth, updatedProduct);

export default productRoute;
