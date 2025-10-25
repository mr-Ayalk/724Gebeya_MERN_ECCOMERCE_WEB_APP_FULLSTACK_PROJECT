// server/routes/payment.route.js
import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  capturePayPalOrder,
  createChapaPayment,
  createPayPalOrder,
} from "../controller/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/paypal/create", auth, createPayPalOrder);
paymentRouter.post("/paypal/capture", auth, capturePayPalOrder);
paymentRouter.post("/chapa/init", auth, createChapaPayment);

export default paymentRouter;
