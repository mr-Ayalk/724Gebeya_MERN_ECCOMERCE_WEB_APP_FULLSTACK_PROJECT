import { Router } from "express";
import {
  loginController,
  logoutController,
  //   refreshToken,
  registerUserController,
  verifyEmailController,
  userAvatarController,
  removeImageFromCloudinary,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetpassword,

  //   userDetails,
} from "../controller/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/muller.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verifyEmail", verifyEmailController);
userRouter.post("/login", loginController);

userRouter.get("/logout", auth, logoutController);
userRouter.put(
  "/user-avatar",
  auth,
  upload.array("avatar"),
  userAvatarController
);
userRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
userRouter.put("/:id", auth, updateUserDetails);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.post("/reset-password", resetpassword);
// userRouter.post("/refresh-token", refreshToken);
// userRouter.get("/user-details", auth, userDetails);

export default userRouter;
