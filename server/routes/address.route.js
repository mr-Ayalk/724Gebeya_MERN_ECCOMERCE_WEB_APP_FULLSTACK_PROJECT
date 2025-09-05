import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addAddressController,
  getAddressController,
} from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get/:id", auth, getAddressController);
export default addressRouter;
