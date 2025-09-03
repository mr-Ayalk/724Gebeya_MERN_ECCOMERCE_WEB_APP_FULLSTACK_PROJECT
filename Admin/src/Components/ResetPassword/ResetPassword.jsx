import { useState } from "react";
import { useContext } from "react";
import TextField from "@mui/material/TextField";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { CircularProgress } from "@mui/material";
import { postData } from "../../utils/api";
import Logo from "../Logo";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
function ForgotPassword() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const context = useContext(MyContext);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const validateValue = Object.values(formFields).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.newPassword === "") {
      context.openAlertBox("error", "Please new password");

      setIsLoading(false);
      return false;
    }
    if (formFields.confirmPassword !== formFields.confirmPassword) {
      context.openAlertBox("error", "Password and confirm password not match");

      return false;
    }

    if (formFields.confirmPassword === "") {
      context.openAlertBox("error", "Please enter  confirm password");
      setIsLoading(false);
      return false;
    }
    postData(`/api/user/reset-password`, formFields).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        context.openAlertBox("success", res?.message);

        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");

        setIsLoading(false);
        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
    // console.log(res);
  };
  return (
    <section className="!bg-white ">
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
        <Link to={"/"}>
          <Logo
            className="text-emerald-950"
            spanDesign="group-hover:text-[#063c28] "
          />
        </Link>
        <div className="flex items-center ">
          <NavLink to={"/login"} exact={true} activeClassName="isActive">
            {" "}
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <CgLogIn className="text-[18px] " />
              Login
            </Button>
          </NavLink>

          <NavLink to={"/signup"} exact={true} activeClassName="isActive">
            {" "}
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <FaRegUser className="text-[15px] " />
              Sign Up
            </Button>
          </NavLink>
        </div>
      </header>

      <div className="loginBox card w-[45%] h-auto pb-20  mx-auto mt-20 relative z-50 border-2 border-gray-200 rounded-3xl shadow-md">
        <div className="text-center mx-auto">
          <Logo
            className="text-emerald-950"
            spanDesign="group-hover:text-[#063c28] "
          />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4">
          Welcome Back !<br />
          <span className="text-blue-600 text-[30px]">
            {" "}
            Sign in with your credentials
          </span>
        </h1>

        <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
          <div className="form-group w-full mb-5 relative">
            <TextField
              type={isShowPassword === false ? "password" : "text"}
              id="password"
              label="New Password"
              variant="outlined"
              className="w-full"
              name="newPassword"
              value={formFields.newPassword}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
            <Button
              type="button"
              className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[30px] !min-w-[35px] !rounded-full !text-black "
              onClick={() => {
                setIsShowPassword(!isShowPassword);
              }}
            >
              {isShowPassword === true ? (
                <IoMdEye className="text-[20px] opacity-75" />
              ) : (
                <IoMdEyeOff className="text-[20px] opacity-75" />
              )}
            </Button>
          </div>
          <div className="form-group w-full mb-5 relative">
            <TextField
              type={isShowPassword2 === false ? "password" : "text"}
              id="confirm_password"
              label="Confirm Password"
              variant="outlined"
              className="w-full"
              name="confirmPassword"
              value={formFields.confirmPassword}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
            <Button
              type="button"
              className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[30px] !min-w-[35px] !rounded-full !text-black "
              onClick={() => {
                setIsShowPassword2(!isShowPassword2);
              }}
            >
              {isShowPassword2 === true ? (
                <IoMdEye className="text-[20px] opacity-75" />
              ) : (
                <IoMdEyeOff className="text-[20px] opacity-75" />
              )}
            </Button>
          </div>

          <div className="flex items-center w-full mt-3 mb-3">
            <Button
              type="submit"
              disabled={!validateValue}
              className="btn-blue  btn-lg w-full flex gap-3 hover:!btn-blue/75"
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
