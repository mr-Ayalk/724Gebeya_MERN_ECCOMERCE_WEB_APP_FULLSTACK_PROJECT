import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddressController } from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);

export default addressRouter;
