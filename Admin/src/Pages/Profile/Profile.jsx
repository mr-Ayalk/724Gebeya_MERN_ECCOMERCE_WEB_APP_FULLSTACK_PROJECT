import React, { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  fetchDataFromApi,
  uploadImage,
  editData,
  postData,
} from "../../utils/api";

import Button from "@mui/material/Button";
import { CircularProgress, TextField, Checkbox, Radio } from "@mui/material";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { useNavigate, NavLink } from "react-router-dom";
import { MyContext } from "../../App";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Profile = () => {
  const context = useContext(MyContext);
  const history = useNavigate();

  const [phone, setPhone] = useState("");
  const [previews, setPreviews] = useState([]);
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] =
    useState(false);

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

  // ✅ Load user data
  useEffect(() => {
    if (context?.userData?._id) {
      setUserId(context?.userData._id);
      setFormsFields({
        name: context?.userData.name || "",
        email: context?.userData.email || "",
        mobile: context?.userData.mobile || "",
      });
      setPhone(String(context?.userData?.mobile || ""));
      setChangePassword((prev) => ({
        ...prev,
        email: context?.userData.email || "",
      }));

      if (context?.userData?.avatar) {
        setPreviews([context.userData.avatar]);
      }

      // fetchDataFromApi(`/api/address/get?${context?.userData?._id}`).then(
      //   (res) => {
      //     console.log(res);
      //   }
      // );

      fetchDataFromApi(`/api/address/get/${context?.userData?._id}`).then(
        (res) => {
          // console.log(res);
          setAddress(res.data);
        }
      );
    }
  }, [context?.userData]);

  // ✅ Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (!token || context?.isLogin === false) {
      // history("/login");
    }
  }, [context?.isLogin, history]);

  // ✅ File Upload
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      setUploading(true);
      const files = e.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          )
        ) {
          const formdata = new FormData();
          formdata.append("avatar", file);

          const res = await uploadImage(apiEndPoint, formdata);

          if (res?.data?.avator) {
            setPreviews([res.data.avator]);
          }
        } else {
          context.openAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG, PNG, or WEBP image file.",
          });
          setUploading(false);
          return;
        }
      }
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const validateValue = Object.values(formFields).every((el) => el);
  const validateValuePassword = Object.values(changePassword).every((el) => el);

  const [selectedValue, setSelectedValue] = useState(""); // start empty

  const handleChangeradio = (event) => {
    setSelectedValue(event.target.value); // updates selected value
  };

  // ✅ Profile Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.name || !formFields.email || !formFields.mobile) {
      context.openAlertBox("error", "Please fill all required fields");
      setIsLoading(false);
      return;
    }

    const res = await editData(`/api/user/${userId}`, formFields, {
      withCredentials: true,
    });

    if (!res?.error) {
      context.openAlertBox("success", res?.message);
    } else {
      context.openAlertBox("error", res?.message);
    }
    setIsLoading(false);
  };

  // ✅ Change Password Submit
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setIsLoadingPassword(true);

    if (
      !changePassword.oldPassword ||
      !changePassword.newPassword ||
      !changePassword.confirmPassword
    ) {
      context.openAlertBox("error", "Please fill all password fields");
      setIsLoadingPassword(false);
      return;
    }

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      context.openAlertBox("error", "Passwords do not match");
      setIsLoadingPassword(false);
      return;
    }

    const res = await postData(`/api/user/change-password`, changePassword, {
      withCredentials: true,
    });

    if (!res?.error) {
      context.openAlertBox("success", res?.message);
      setFormsFields({ name: "", email: "", mobile: "" });
      history("/");
    } else {
      context.openAlertBox("error", res?.message);
    }
    setIsLoadingPassword(false);
  };

  // ✅ Input Change Handler
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields((prev) => ({ ...prev, [name]: value }));
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="card w-[65%] my-4 pt-5 shadow-md sm:rounded-lg bg-white px-5 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">User Profile</h2>
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

        {/* Avatar */}
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200 ">
          {uploading ? (
            <CircularProgress color="inherit" />
          ) : previews.length > 0 ? (
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
              alt="user avatar placeholder"
              className="w-full h-full object-cover"
            />
          )}

          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px] cursor-pointer" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

        {/* Profile Form */}
        <form className="form mt-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 ">
            <div className="w-[50%]">
              <input
                type="text"
                className="w-full h-[40px] border border-gray-300 focus:outline-none focus:border-gray-500 rounded-sm p-3 text-sm"
                name="name"
                onChange={onChangeInput}
                value={formFields.name}
                disabled={isLoading}
              />
            </div>
            <div className="w-[50%]">
              <input
                type="email"
                className="w-full h-[40px] border border-gray-300 focus:outline-none focus:border-gray-500 rounded-sm p-3 text-sm"
                name="email"
                onChange={onChangeInput}
                value={formFields.email}
                disabled
              />
            </div>
          </div>

          <div className="flex items-center mt-4 gap-5 ">
            <div className="w-[50%]">
              <PhoneInput
                defaultCountry="et"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormsFields((prev) => ({ ...prev, mobile: phone }));
                }}
                disabled={isLoading}
              />
            </div>
          </div>

          <br />
          <div
            className="flex items-center justify-center p-5 border border-dashed border-gray-300 bg-[#f1f1ff] hover:bg-[#e7f3f9] cursor-pointer"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Address",
              })
            }
          >
            <span className="text-[14px] font-[500]">Add Address</span>
          </div>

          <br />
          <div className="flex gap-2 flex-col mt-4">
            {address?.length > 0 &&
              address.map((addr, index) => (
                <label
                  key={index}
                  className="border border-dashed border-gray-300 addressBox w-full flex items-center justify-start bg-[#f1f1f1] p-3 rounded-md cursor-pointer mb-2"
                >
                  <Radio
                    name="selectedAddress" // all radios share the same name
                    value={addr._id || index} // unique value per address
                    checked={selectedValue === (addr._id || index)}
                    onChange={handleChangeradio}
                  />
                  <span>
                    {addr.address_line1}, {addr.city}, {addr.state},{" "}
                    {addr.country},{addr.pincode}
                  </span>
                </label>
              ))}
          </div>

          <div className="flex items-center w-full mt-3 mb-3">
            <Button
              type="submit"
              disabled={!validateValue}
              className="btn-blue btn-lg w-full flex gap-3 hover:!btn-org/75"
            >
              {isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password Form */}
      <Collapse isOpened={isChangePasswordFormShow}>
        <div className="card w-[65%] bg-white p-5 shadow-md rounded-md mb-5">
          <div className="flex items-center pb-3 font-black">
            <h2 className="pb-0">Change Password</h2>
          </div>
          <form onSubmit={handleSubmitPassword}>
            <div className="flex items-center gap-5 ">
              <div className="w-[50%]">
                <TextField
                  label="Old Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  type="password"
                  name="oldPassword"
                  onChange={onChangeInput}
                  value={changePassword.oldPassword}
                  disabled={isLoadingPassword}
                />
              </div>
              <div className="w-[50%]">
                <TextField
                  label="New Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  type="password"
                  name="newPassword"
                  onChange={onChangeInput}
                  value={changePassword.newPassword}
                  disabled={isLoadingPassword}
                />
              </div>
            </div>
            <div className="w-[50%] mt-3">
              <TextField
                label="Confirm Password"
                variant="outlined"
                size="small"
                className="w-full"
                type="password"
                name="confirmPassword"
                onChange={onChangeInput}
                value={changePassword.confirmPassword}
                disabled={isLoadingPassword}
              />
            </div>
            <br />
            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={!validateValuePassword}
                className="btn-blue btn-lg w-full flex gap-3 hover:!btn-org/75"
              >
                {isLoadingPassword ? (
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
