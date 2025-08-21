import UserModel from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import sendEmailFun from "../lib/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplates.js";

export async function registerUserController(request, response) {
  try {
    let user;
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email,name,password",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({
      email: email,
    });

    if (user) {
      return response.json({
        message: "User already Registered with this email",
        error: true,
        success: false,
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    user = new UserModel({
      email: email,
      password: hashPassword,
      name: name,
      //isAdmin,
      otp: verifyCode,
      otpExpires: Date.now() + 600000, //10minutes
    });

    await user.save();

    //Send verification email

    await sendEmailFun({
      sendTo: email,
      subject: "Verify email from 724 Gebeya",
      text: "",
      html: VerificationEmail(name, verifyCode),
    });

    //Create a JWT token for verification purposes

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return response.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully ! Please verify your email.",
      token: token, //Optional include this if needed for verification
    });

    // const resp = sendEmailFun(
    //   email,
    //   "Verify Email",
    //   "",
    //   "Your OTP is" + verifyCode
    // );
    // html:verifyEmailTemplate({
    //       name,
    //       url:verifyEmailUrl
    //   })
    // const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { email, otp } = request.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otpExpires > Date.now();

    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return response.status(200).json({
        error: false,
        success: true,
        message: "Email verified successfuly",
      });
    } else if (!isCodeValid) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Invalid OTP",
      });
    } else {
      return response.status(400).json({
        error: true,
        success: false,
        message: "OTP expired",
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
