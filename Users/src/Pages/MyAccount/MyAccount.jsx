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
    if (context?.userData?._id) {
      setUserId(context.userData._id);
      setFormsFields({
        name: context.userData.name || "",
        email: context.userData.email || "",
        mobile: context.userData.mobile || "",
      });
      setPhone(String(context?.userData?.mobile || ""));
      setChangePassword((prev) => ({
        ...prev,
        email: context?.userData.email || "",
      }));
      if (context?.userData?.avatar) {
        setPreviews([context.userData.avatar]);
      }
      fetchDataFromApi(`/api/address/get/${context?.userData?._id}`).then(
        (res) => {
          setAddress(res.data);
        }
      );
    }
  }, [context?.userData]);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (!token) history("/");
  }, [context?.isLogin, history]);

  const validateValue = Object.values(formFields).every((el) => el);
  const validateValuePassword = Object.values(changePassword).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await editData(`/api/user/${userId}`, formFields, {
      withCredentials: true,
    });
    if (res?.error !== true) {
      context.openAlertBox("success", res?.message);
      context.setIsLogin(true);
    } else {
      context.openAlertBox("error", res?.message);
    }
    setIsLoading(false);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setIsLoadingPassword(true);

    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.openAlertBox(
        "error",
        "New password and confirm password do not match"
      );
      setIsLoadingPassword(false);
      return;
    }

    const res = await postData(`/api/user/change-password`, changePassword, {
      withCredentials: true,
    });
    if (res?.error !== true) {
      context.openAlertBox("success", res?.message);
      context.setIsLogin(true);
      history("/");
    } else {
      context.openAlertBox("error", res?.message);
    }
    setIsLoadingPassword(false);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields((prev) => ({ ...prev, [name]: value }));
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-10 w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto flex gap-8 px-6">
        {/* Sidebar */}
        <div className="w-[22%] hidden lg:block">
          <AccountSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-3xl mx-auto">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-primary pl-3">
                My Profile
              </h2>
              <Button
                variant="outlined"
                size="small"
                className="!text-primary !border-primary hover:!bg-orange-50"
                onClick={() =>
                  setIsChangePasswordFormShow(!isChangePasswordFormShow)
                }
              >
                {isChangePasswordFormShow ? "Cancel" : "Change Password"}
              </Button>
            </div>

            <hr className="mb-5" />

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex gap-6">
                <TextField
                  label="Full Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="name"
                  onChange={onChangeInput}
                  value={formFields.name}
                  disabled={isLoading}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="email"
                  onChange={onChangeInput}
                  value={formFields.email}
                  disabled
                />
              </div>

              <PhoneInput
                defaultCountry="et"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormsFields((prev) => ({ ...prev, mobile: phone }));
                }}
                disabled={isLoading}
                className="!w-full border rounded-md p-2 bg-gray-50"
              />

              <Button
                type="submit"
                disabled={!validateValue || isLoading}
                className="!bg-gradient-to-r !from-primary !to-orange-600 !text-white w-full py-2.5 rounded-md font-medium hover:!opacity-90 transition-all"
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </div>

          {/* Password Section */}
          <Collapse isOpened={isChangePasswordFormShow}>
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-primary pl-3 mb-4">
                Change Password
              </h2>
              <hr className="mb-5" />

              <form onSubmit={handleSubmitPassword} className="space-y-5">
                <div className="flex gap-6">
                  <TextField
                    label="Old Password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="password"
                    name="oldPassword"
                    onChange={onChangeInput}
                    value={changePassword.oldPassword}
                    disabled={isLoadingPassword}
                  />
                  <TextField
                    label="New Password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="password"
                    name="newPassword"
                    onChange={onChangeInput}
                    value={changePassword.newPassword}
                    disabled={isLoadingPassword}
                  />
                </div>

                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="password"
                  name="confirmPassword"
                  onChange={onChangeInput}
                  value={changePassword.confirmPassword}
                  disabled={isLoadingPassword}
                />

                <Button
                  type="submit"
                  disabled={!validateValuePassword || isLoadingPassword}
                  className="!bg-gradient-to-r !from-primary !to-orange-600 !text-white w-full py-2.5 rounded-md font-medium hover:!opacity-90 transition-all"
                >
                  {isLoadingPassword ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
