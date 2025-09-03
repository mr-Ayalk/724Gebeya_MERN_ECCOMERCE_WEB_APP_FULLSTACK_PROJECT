import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../../utils/api";

import { FaRegUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";
import { MyContext } from "../../App";

import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api";

import { Collapse } from "react-collapse";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
const Profile = () => {
  const context = useContext(MyContext);
  const history = useNavigate();
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userData]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [userData, setUserData] = useState([]);
  const formdata = new FormData();

  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];
  //
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      setUploading(true);
      const files = e.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png" ||
          file.type === "image/webp"
        ) {
          const formdata = new FormData(); // create new for each file
          formdata.append("avatar", file);

          const res = await uploadImage(apiEndPoint, formdata);

          if (res?.data?.avator) {
            setPreviews([res.data.avator]); // set avatar URL from backend
          }
        } else {
          context.openAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG or PNG image file.",
          });
          setUploading(false);
          return;
        }
      }

      setUploading(false); // ✅ stop loading after success
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] =
    useState(false);
  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormsFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });

      const ph = `"${context?.userData?.mobile}"`;
      //console.log(ph)
      setPhone(ph);
      setChangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const [formFields, setFormsFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accesstoken"); // match handleSubmit
    if (!token) {
      history("/login");
    }
  }, [context?.isLogin, history]);

  const validateValue = Object.values(formFields).every((el) => el);

  const validateValuePassword = Object.values(changePassword).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter your Full name");
      return;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter your email id");
      return;
    }
    if (formFields.mobile === "") {
      context.openAlertBox("error", "Please enter your mobile phone number");
      return;
    }
    const res = await editData(`/api/user/${userId}`, formFields, {
      withCredentials: true,
    });
    // console.log(res);
    if (res?.error !== true) {
      context.openAlertBox("success", res?.message);

      // context.setIsLogin(true);
      setIsLoading(false);
      // history("/");
    } else {
      context.openAlertBox("error", res?.message);
      setIsLoading(false);
    }

    // console.log(res);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    setIsLoadingPassword(true);

    if (changePassword.oldPassword === "") {
      context.openAlertBox("error", "Please enter your Old Password");
      return;
    }
    if (changePassword.newPassword === "") {
      context.openAlertBox("error", "Please enter new Password");
      setIsLoadingPassword(false);
      return;
    }
    if (changePassword.confirmPassword === "") {
      context.openAlertBox("error", "Please enter confirm Password");
      setIsLoadingPassword(false);
      return;
    }
    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.openAlertBox(
        "error",
        "New password and confirm password do not match"
      );
      setIsLoadingPassword(false);
      return false;
    }
    const res = await postData(`/api/user/change-password`, changePassword, {
      withCredentials: true,
    });
    // console.log(res);
    if (res?.error !== true) {
      context.openAlertBox("success", res?.message);

      setFormsFields({
        name: "",
        email: "",
        mobile: "",
      });

      // context.setIsLogin(true);
      setIsLoadingPassword(false);
      history("/");
    } else {
      context.openAlertBox("error", res?.message);
      setIsLoadingPassword(false);
    }

    // console.log(res);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
    setChangePassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="card w-[65%] my-4 pt-5 shadow-md sm:rounded-lg bg-white px-5 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Users Profile</h2>
          <Button
            className="!ml-auto"
            onClick={() =>
              setIsChangePasswordFormShow(!isChangePasswordFormShow)
            }
          >
            Change Password
          </Button>
        </div>
        <br />
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200 ">
          {uploading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {previews.length > 0 ? (
                previews.map((img, index) => (
                  <img
                    src={img}
                    key={index}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ))
              ) : (
                <img
                  src="/user.png"
                  alt="user image avatar place holder"
                  className="w-full h-full object-cover"
                />
              )}
            </>
          )}

          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px]  cursor-pointer" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

        <form className="form mt-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 ">
            <div className="w-[50%]">
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                name="name"
                onChange={onChangeInput}
                value={formFields.name}
                disabled={isLoading === true ? true : false}
              />
            </div>
            <div className="w-[50%]">
              <input
                type="email"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                name="email"
                onChange={onChangeInput}
                value={formFields.email}
                disabled={true}
              />
            </div>
          </div>
          <div className="flex items-center mt-4 gap-5 ">
            <div className="w-[50%]">
              <PhoneInput
                defaultCountry="et" // Ethiopia (prefix +251)
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormsFields({
                    mobile: phone,
                  });
                }}
                disabled={isLoading === true ? true : false}
              />
            </div>
          </div>

          <br />
          <div
            className="flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1f1ff] hover:bg-[#e7f3f9] cursor-pointer"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Address",
              })
            }
          >
            <span className="text-[]14px] font-[500]">Add Address</span>
          </div>

          <br />
          <div className="flex items-center w-full mt-3 mb-3">
            <Button
              type="submit"
              disabled={!validateValue}
              className="btn-blue  btn-lg w-full flex gap-3 hover:!btn-org/75"
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>

      <Collapse isOpened={isChangePasswordFormShow}>
        <div className="card w-[65%] bg-white p-5 shadow-md rounded-md mb-5">
          {" "}
          <div className="flex items-center pb-3 font-black">
            <h2 className="pb-0">Change Password</h2>
          </div>
          <form action="mt-8" onSubmit={handleSubmitPassword}>
            <div className="flex items-center gap-5 ">
              <div className="w-[50%]">
                <TextField
                  label="Old Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  type="text"
                  name="oldPassword"
                  onChange={onChangeInput}
                  value={changePassword.oldPassword}
                  disabled={isLoading === true ? true : false}
                />
              </div>
              <div className="w-[50%]">
                <TextField
                  label="New Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  type="text"
                  name="newPassword"
                  onChange={onChangeInput}
                  value={changePassword.newPassword}
                />
              </div>
            </div>
            <div className="w-[50%] mt-3">
              <TextField
                label="Confirm Password"
                variant="outlined"
                size="small"
                className="w-full"
                type="confirmPassword"
                name="confirmPassword"
                onChange={onChangeInput}
                value={changePassword.confirmPassword}
              />
            </div>
            <br />
            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={!validateValuePassword}
                className="btn-blue  btn-lg w-full flex gap-3 hover:!btn-org/75"
              >
                {isLoadingPassword === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default Profile;
