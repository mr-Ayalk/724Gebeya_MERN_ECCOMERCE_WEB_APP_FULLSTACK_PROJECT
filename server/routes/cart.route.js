import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";
import {
  addToCartItemController,
  getCartItemController,
} from "../controller/cart.controller.js";

const cartRoute = Router();

cartRoute.post("/add", auth, addToCartItemController);
cartRoute.get("/get", auth, getCartItemController);

export default cartRoute;
