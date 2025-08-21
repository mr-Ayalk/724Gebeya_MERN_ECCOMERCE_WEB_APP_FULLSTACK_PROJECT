import { Router } from "express";
import {
  //   forgotPasswordController,
  loginController,
  logoutController,
  //   refreshToken,
  registerUserController,
  //   resetPassword,
  //   updateUserDetails,
  //   uploadAvatar,
  verifyEmailController,
  //   verifyForgotPasswordOtp,
  //   userDetails,
} from "../controller/user.controller.js";
import auth from "../middlewares/auth.js";
// import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verifyEmail", verifyEmailController);
userRouter.post("/login", loginController);

userRouter.get("/logout", auth, logoutController);
// userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
// userRouter.put("/update-user", auth, updateUserDetails);
// userRouter.put("/forgot-password", forgotPasswordController);
// userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
// userRouter.put("/reset-password", resetPassword);
// userRouter.post("/refresh-token", refreshToken);
// userRouter.get("/user-details", auth, userDetails);

export default userRouter;
