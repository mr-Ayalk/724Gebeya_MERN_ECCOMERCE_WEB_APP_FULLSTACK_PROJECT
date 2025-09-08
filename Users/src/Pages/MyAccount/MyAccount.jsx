import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, fetchDataFromApi, postData } from "../../utils/api";
import { CircularProgress } from "@mui/material";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
function MyAccount() {
  const [phone, setPhone] = useState("");
  const [previews, setPreviews] = useState([]);
  const [address, setAddress] = useState([]);
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] =
    useState(false);
  // useEffect(() => {
  //   if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
  //     setUserId(context?.userData?._id);
  //     setFormsFields({
  //       name: context?.userData?.name,
  //       email: context?.userData?.email,
  //       mobile: context?.userData?.mobile,
  //     });
  //     setChangePassword({
  //       email: context?.userData?.email,
  //     });
  //   }
  // }, [context?.userData]);
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

  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accesstoken"); // match handleSubmit
    if (!token) {
      history("/");
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

      // setFormsFields({
      //   name: "",
      //   email: "",
      //   mobile: "",
      // });

      context.setIsLogin(true);
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

      context.setIsLogin(true);
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
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">My Profile</h2>
              <Button
                className="!ml-auto"
                onClick={() =>
                  setIsChangePasswordFormShow(!isChangePasswordFormShow)
                }
              >
                Change Password
              </Button>
            </div>

            <hr />
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="flex items-center gap-5 ">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="text"
                    id="name"
                    name="name"
                    onChange={onChangeInput}
                    value={formFields.name}
                    disabled={isLoading === true ? true : false}
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="email"
                    id="email"
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
              <div className="flex items-center w-full mt-3 mb-3">
                <Button
                  type="submit"
                  disabled={!validateValue}
                  className="btn-org  btn-lg w-full flex gap-3 hover:!btn-org/75"
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
            <div className="card bg-white p-5 shadow-md rounded-md mb-5">
              {" "}
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Change Password</h2>
              </div>
              <hr />
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
                    className="btn-org  btn-lg w-full flex gap-3 hover:!btn-org/75"
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
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
