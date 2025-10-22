// server/routes/order.route.js
import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createOrderController,
  getMyOrders,
} from "../controller/order.controller.js";

const orderRouter = Router();

orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/my-orders", auth, getMyOrders);

export default orderRouter;
