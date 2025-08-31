import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import { Button, FormControlLabel } from "@mui/material";
import { CgLogIn } from "react-icons/cg";
import { FaEyeSlash, FaRegEye, FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const SignUp = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const history = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const validateValue = Object.values(formFields).every((el) => el);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  function handleClickFacebook() {
    setLoadingFacebook(true);
  }
  function handleClickGoogle() {
    setLoadingGoogle(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter full name");
      return;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email");
      return;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password");
      return;
    }

    setIsLoading(true); // Show loading before starting request

    const res = await postData("/api/user/register", formFields);
    if (res?.error !== true) {
      context.openAlertBox("success", res?.message);
      localStorage.setItem("userEmail", formFields.email);
      setIsLoading(false);
      setFormFields({
        name: "",
        email: "",
        password: "",
      });
      history("/verify-account");
    } else {
      context.openAlertBox("error", res?.message);
      setIsLoading(false);
    }

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
          Join us today !<br />
          <span className="text-blue-600 text-[30px]">
            {" "}
            Get special benefits and stay
            <br /> up-to-date
          </span>
        </h1>{" "}
        <div className="flex items-center justify-center w-full mt-5 gap-4">
          <Button
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle className="text-[20px]" />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !text-[15px] !py-2 !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            Signin with Google
          </Button>
          <Button
            size="small"
            onClick={handleClickFacebook}
            endIcon={<BsFacebook className="text-[20px]" fill="blue" />}
            loading={loadingFacebook}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            Signin with Facebook
          </Button>
        </div>
        <br />
        <div className="w-full flex items-center justify-center gap-3">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>

          <span className="text-[14px] font-[500]">
            Or,Sign in with your email
          </span>

          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
        </div>
        <br />
        <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Full Name</h4>
            <input
              type="text"
              id="name"
              name="name"
              onChange={onChangeInput}
              value={formFields.name}
              disabled={isLoading}
              className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
            />
          </div>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChangeInput}
              value={formFields.email}
              disabled={isLoading}
              className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
            />
          </div>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow ? "text" : "password"}
                id="password"
                name="password"
                onChange={onChangeInput}
                value={formFields.password}
                disabled={isLoading}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              />
              <Button
                type="button" // ✅ prevents accidental submit
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow ? (
                  <FaRegEye className="text-[18px]" />
                ) : (
                  <FaEyeSlash className="text-[18px]" />
                )}
              </Button>
            </div>
          </div>

          <div className="form-group mb-4 w-full flex items-center justify-between">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember Me"
            />
            <Link
              to={"/login"}
              className="text-blue-600 font-[700] text-[15px] hover:underline hover:text-gray-700"
            >
              Already have an Account
            </Link>
          </div>
          <div className="flex items-center w-full mt-3 mb-3">
            <Button
              type="submit"
              disabled={!validateValue || isLoading}
              className="btn-blue btn-lg w-full flex gap-3 hover:!btn-org/75"
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
