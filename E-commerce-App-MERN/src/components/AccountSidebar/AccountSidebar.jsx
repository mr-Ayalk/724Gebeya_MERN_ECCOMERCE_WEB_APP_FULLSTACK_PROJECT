import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { NavLink } from "react-router";

function AccountSidebar() {
  return (
    <>
      <div className="card bg-white shadow-md rounded-md sticky top-[10px] ">
        <div className="w-full p-5 flex items-center justify-center flex-col">
          <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group ">
            <img
              src="https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmxzfGVufDB8fDB8fHww"
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
              <FaCloudUploadAlt className="text-[#fff] text-[25]  cursor-pointer" />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <h3>Bami Love</h3>
          <h6 className="text-[13px] font-[500]">bami@gmail.com</h6>
        </div>

        <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
          <li className="w-full">
            <NavLink to="/my-account" activeclassname="isActive">
              <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
                <FaRegUser className="text-[18px]" />
                User Profile
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to="/my-list" activeclassname="isActive">
              <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
                <IoMdHeartEmpty className="text-[18px]" />
                My List
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to="/my-orders" activeclassname="isActive">
              <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
                <IoBagCheckOutline className="text-[18px]" />
                My Orders
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to="/logout" activeclassname="isActive">
              <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
                <IoIosLogOut className="text-[18px]" />
                Logout
              </Button>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AccountSidebar;
