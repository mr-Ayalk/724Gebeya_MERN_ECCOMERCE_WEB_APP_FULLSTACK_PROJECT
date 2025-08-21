import UserModel from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import sendEmailFun from "../lib/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplates.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

// registration conttroller
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

// verification of email controller
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

// login controller
export async function loginController(request, response) {
  try {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "Invalid Credential",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Contact to admin",
        error: true,
        success: false,
      });
    }
    if (user.verify_email !== true) {
      return response.status(400).json({
        message: "Your Email is not verify yet.Please verify your email first",
        error: true,
        success: false,
      });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return response.status(400).json({
        message: "Invalid Credential",
        error: true,
        success: false,
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      semeSite: "None",
    };
    response.cookie("accessToken", accesstoken, cookiesOption);
    response.cookie("refereshToken", refreshToken, cookiesOption);

    return response.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// loout controller

export async function logoutController(request, response) {
  try {
    const userid = request.userId; //middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refereshToken", cookiesOption);
    const removeRefereshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });
    return response.json({
      message: "Logout Successfullly",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// image upload

var imagesArr = [];
export async function userAvatarController(request, response) {
  try {
    imagesArr = [];

    const userId = request.userId;
    const image = request.files;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return response.status(500).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    //first remove image from cloudinary

    const imgUrl = user.avatar;

    const urlArr = imgUrl.split("/");
    const avatar_image = urlArr[urlArr.length - 1];
    const imageName = avatar_image.split(".")[0];
    if (imageName) {
      const res = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {
          //console.log(error,res)
        }
      );
    }

    // console.log(image);

    for (let i = 0; i < image?.length; i++) {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          // console.log(result);
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
          console.log(request.files[i].filename);
        }
      );
    }

    user.avatar = imagesArr[0];
    await user.save();

    return response.status(200).json({
      _id: userId,
      avator: imagesArr[0],
    });
  } catch (error) {
    return response.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// export async function removeImageFromCloudinary(request, response) {
//   const imgUrl = request.query.img;

//   const urlArr = imgUrl.split("/");
//   const image = urlArr[urlArr.length - 1];
//   const imageName = image.split(".")[0];
//   if (imageName) {
//     const res = await cloudinary.uploader.destroy(
//       imageName,
//       (error, result) => {
//         //console.log(error,res)
//       }
//     );
//     if (res) {
//       response.status(200).send(res);
//     }
//   }
// }

export async function removeImageFromCloudinary(req, res) {
  try {
    const imgUrl = req.query.img;
    if (!imgUrl) {
      return res
        .status(400)
        .json({ error: true, message: "Image URL required" });
    }

    // Extract the file name part
    const fileName = imgUrl.split("/").pop(); // "1755768104262_image1_large_1.jpg"

    const publicId = fileName.split(".")[0]; // "1755768104262_image1_large_1"

    console.log("Deleting Cloudinary public_id:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return res
        .status(200)
        .json({ success: true, message: "Image deleted", result });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Image not found", result });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
}
//update user details
export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId; //auth middleware
    const { name, email, mobile, password } = request.body;
    const userExist = await UserModel.findById(userId);

    if (!userExist)
      return response.status(400).send("The user cannot be updated!");
    // Use existing name if not provided
    const finalName = name || userExist.name;
    const finalEmail = email || userExist.email;
    let verifyCode = "";
    if (finalEmail && email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    }
    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    } else {
      hashPassword = userExist.password;
    }

    // const updateUser = await UserModel.findByIdAndUpdate(
    //   userId,
    //   {
    //     name: finalName,
    //     mobile: mobile,
    //     email: email,
    //     verify_email: email !== userExist.email ? false : true,
    //     password: hashPassword,
    //     otp: verifyCode !== "" ? verifyCode : null,
    //     otpExpires: verifyCode !== "" ? Date.now() + 600000 : "",
    //   },
    //   { new: true }
    // );
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: finalName,
        mobile: mobile,
        email: finalEmail,
        verify_email: email && email !== userExist.email ? false : true,
        password: hashPassword,
        otp: verifyCode !== "" ? verifyCode : null,
        otpExpires: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      { new: true }
    );
    // if (email !== userExist.email) {
    //   // Send verification email
    //   await sendEmailFun({
    //     sendTo: email,
    //     subject: "Verify email from 724 Gebeya",
    //     text: "",
    //     html: VerificationEmail(finalName, verifyCode),
    //   });
    // }
    if (verifyCode) {
      await sendEmailFun({
        sendTo: finalEmail,
        subject: "Verify email from 724 Gebeya",
        text: "",
        html: VerificationEmail(finalName, verifyCode),
      });
    }
    return response.json({
      message: "User Updated successfully",
      error: false,
      success: true,
      user: updateUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//forgot password

export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const updateUser = await UserModel.findByIdAndUpdate(
      user?._id,
      {
        otp: verifyCode,
        otpExpires: Date.now() + 600000,
      },
      { new: true }
    );

    await sendEmailFun({
      sendTo: email,
      subject: "Verify email from Eccommerce App",
      text: "",
      html: VerificationEmail(user?.name, verifyCode),
    });

    return response.json({
      message: "check your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    if (!email || !otp) {
      return response.status(400).json({
        message: "Provide required field email,otp.",
        error: true,
        success: false,
      });
    }

    if (otp !== user.otp) {
      return response.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.otpExpires < currentTime) {
      return response.status(400).json({
        message: "Otp is expired",
        error: true,
        success: false,
      });
    }

    user.otp = "";
    user.otpExpires = "";
    await user.save();

    return response.status(400).json({
      message: "OTP Verified Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//reset password

export async function resetpassword(request, response) {
  try {
    const { email, newPassword, confirmPassword } = request.body;
    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "provide required fields email,newPassword,confirmPassword",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "Email is not available",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "newPassword and confirmPassword must be same",
        error: true,
        success: false,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(confirmPassword, salt);
    user.password = hashPassword;
    await user.save();
    // const update = await UserModel.findOneAndUpdate(user._id, {
    //   password: hashPassword,
    // });
    return response.json({
      message: "password updated successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// export async function updateUserDetails(request, response) { try { const userId ==request.userId;
//    //auth middleware
//    const { name, email, mobile, password } = request.body; const userExist = await UserModel.findById(userId); if (!userExist) return response.status(400).send("The user cannot be updated!");
//    // Use existing name if not provided
//    const finalName = name || userExist.name; let verifyCode = ""; if (email !== userExist.email) { verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); } let hashPassword = ""; if (password) { const salt = await bcryptjs.genSalt(10); hashPassword = await bcryptjs.hash(password, salt); } else { hashPassword = userExist.password; } const updateUser = await UserModel.findByIdAndUpdate( userId, { name: finalName, mobile: mobile, email: email, verify_email: email !== userExist.email ? false : true, password: hashPassword, otp: verifyCode !== "" ? verifyCode : null, otpExpires: verifyCode !== "" ? Date.now() + 600000 : "", }, { new: true } ); if (email !== userExist.email) {
//      // Send verification email
//      await sendEmailFun({ sendTo: email, subject: "Verify email from 724 Gebeya", text: "", html: VerificationEmail(finalName, verifyCode), }); } return response.json({ message: "User Updated successfully", error: false, success: true, user: updateUser, }); } catch (error) { return response.status(500).json({ message: error.message || error, error: true, success: false, }); } }
