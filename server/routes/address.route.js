import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addAddressController,
  deleteAddressController,
  getAddressController,
} from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get/:id", auth, getAddressController);
addressRouter.delete("/:id", auth, deleteAddressController);
export default addressRouter;
