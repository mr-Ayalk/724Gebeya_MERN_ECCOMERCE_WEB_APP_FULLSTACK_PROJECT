import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import { Button } from "@mui/material";
import { CgLogIn } from "react-icons/cg";
import {  FaRegUser } from "react-icons/fa";

import OtpBox from "../OtpBox/OtpBox";
const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };
  const verifyOTP = (e) => {
    e.preventDefault();
    alert(otp);
  };
  return (
    <section className="!bg-white w-full h-[100vh] ">
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
        <div className="text-center flex items-center justify-center rounded-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7bAKfVQneauHMG6E-bQLIAyBzqRnyGw6w4A&s"
            alt=""
            width="80 mx-auto "
          />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4">
          Welcome Back !<br />
          <span className="text-blue-600 text-[30px]">
            {" "}
            Please Verify your Email
          </span>
        </h1>{" "}
        <br />
        <div className="w-full flex items-center justify-center gap-3">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>

          <span className="text-[14px] font-[500]">
            OTP sent to ayalk@gmial.com
          </span>

          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
        </div>
        <br />
        <form action="" onSubmit={verifyOTP}>
          <OtpBox length={6} onChange={handleOtpChange} />

          <div className="flex items-center justify-center mt-5 px-3">
            <Link to="/change-password"> <Button type="submit" className="w-full btn-blue btn-lg">
              Verify OTP
            </Button></Link>
           
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerifyAccount;
