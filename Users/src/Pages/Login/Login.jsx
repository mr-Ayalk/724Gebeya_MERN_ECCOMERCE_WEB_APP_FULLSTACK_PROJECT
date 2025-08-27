import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { CircularProgress } from "@mui/material";
function Login() {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const forgotPassword = () => {
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email id");
      return false;
    } else {
      context.openAlertBox("success", `OTP Send to ${formFields.email}`);
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgot-password");

      postData("/api/user/forgot-password", {
        email: formFields.email,
      }).then((res) => {
        // console.log(res);

        if (res?.error === false) {
          context.openAlertBox("success", res?.message);

          history("/verify");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    }
  };
  const validateValue = Object.values(formFields).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email");
      return;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password");
      return;
    }

    const res = await postData("/api/user/login", formFields, {
      withCredentials: true,
    });
    if (res?.error !== true) {
      context.openAlertBox("success", res?.message);

      setFormFields({
        email: "",
        password: "",
      });
      localStorage.setItem("accesstoken", res?.data?.accesstoken);
      localStorage.setItem("refreshToken", res?.data?.refreshToken);

      context.setIsLogin(true);
      history("/");
    } else {
      context.openAlertBox("error", res?.message);
      setIsLoading(false);
    }

    // console.log(res);
  };
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black ">
            Login to your account
          </h3>

          <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
                value={formFields.email}
                disabled={isLoading === true ? true : false}
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isShowPassword === false ? "password" : "text"}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
                value={formFields.password}
                disabled={isLoading === true ? true : false}
              />
              <Button
                type="submit"
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

            <a
              href="#"
              className="link cursor-pointer text-[14px] font-[600]"
              onClick={forgotPassword}
            >
              Forgot Password
            </a>
            {/* <div className="flex items-center w-full mt-3 mb-3">
              <Button className="btn-org  btn-lg w-full">Login</Button>
            </div> */}
            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={!validateValue}
                className="btn-org  btn-lg w-full flex gap-3 hover:!btn-org/75"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <p className="text-center">
              Not Registered?
              <Link
                className="link text-[14px] text-primary  font-[600]"
                to="/register"
              >
                Sign Up
              </Link>
            </p>

            <p className="text-center font-[500]">
              Or continue with social account
            </p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black">
              <FcGoogle className="text-[20px]" />
              Login with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
