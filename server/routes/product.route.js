import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  createProduct,
  createProductRAMS,
  deleteMultipleProduct,
  deleteMultipleProductRAMS,
  deleteProduct,
  deleteProductRAMS,
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
  getProductRAMS,
  getProductRAMSById,
  removeImageFromCloudinary,
  updatedProduct,
  updateProductRAMS,
  uploadImages,
} from "../controller/product.controller.js";

const productRoute = Router();
productRoute.post("/uploadImages", auth, upload.array("images"), uploadImages);
productRoute.post("/create", auth, createProduct);
productRoute.get("/getAllProducts", getAllProducts);
productRoute.get("/getAllProductsByCatId/:id", getAllProductsByCatId);
productRoute.get("/getAllProductsByCatName", getAllProductsByCatName);
//
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
productRoute.delete("/deleteMultiple", deleteMultipleProduct);
productRoute.put("/updateProduct/:id", auth, updatedProduct);
productRoute.post("/productRAMS/create", auth, createProductRAMS);
productRoute.delete("/productRAMS/:id", deleteProductRAMS);
productRoute.put("/productRAMS/:id", auth, updateProductRAMS);
productRoute.delete("/deleteMultipleRAMS", deleteMultipleProductRAMS);
// productRoute.get("/productRAMS/getAllProducts", getAllProducts);
productRoute.get("/productRAMS/get", getProductRAMS);

productRoute.get(`/productRAMS/:id`, getProductRAMSById);
export default productRoute;
