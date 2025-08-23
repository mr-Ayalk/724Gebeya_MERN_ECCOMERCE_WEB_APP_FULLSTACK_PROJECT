import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addToCartItemController,
  deleteCartItemWtyController,
  getCartItemController,
  updateCartItemQtyController,
} from "../controller/cart.controller.js";

const cartRoute = Router();

cartRoute.post("/add", auth, addToCartItemController);
cartRoute.get("/get", auth, getCartItemController);
cartRoute.put("/update-qty",auth,updateCartItemQtyController);
cartRoute.delete("/deleteCartItem",auth,deleteCartItemWtyController)
export default cartRoute;
