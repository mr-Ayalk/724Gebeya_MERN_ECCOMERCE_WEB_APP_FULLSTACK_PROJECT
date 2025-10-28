import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { CircularProgress, Button } from "@mui/material";
import { MyContext } from "../../App";
import { uploadImage } from "../../utils/api";

import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import HomeIcon from "@mui/icons-material/Home";

function AccountSidebar() {
  const context = useContext(MyContext);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (context?.userData?.avatar) {
      setPreviews([context.userData.avatar]);
    }
  }, [context?.userData]);

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      setUploading(true);
      const files = e.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          )
        ) {
          context.openAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG, PNG, or WEBP image.",
          });
          setUploading(false);
          return;
        }

        const formdata = new FormData();
        formdata.append("avatar", file);
        const res = await uploadImage(apiEndPoint, formdata);
        if (res?.data?.avator) {
          setPreviews([res.data.avator]);
        }
      }
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden sticky top-[10px] border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      {/* Profile Header */}
      <div className="p-6 flex flex-col items-center text-center bg-gradient-to-b from-blue-500/10 to-transparent">
        <div className="relative group w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-blue-500/30 shadow-md">
          {uploading ? (
            <div className="flex items-center justify-center h-full">
              <CircularProgress size={36} color="inherit" />
            </div>
          ) : (
            <>
              {previews.length > 0 ? (
                <img
                  src={previews[0]}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/user.png"
                  alt="Default Avatar"
                  className="w-full h-full object-cover opacity-80"
                />
              )}
            </>
          )}

          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
            <FaCloudUploadAlt className="text-white text-2xl" />
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          {context?.userData?.name || "User Name"}
        </h3>
        <p className="text-sm text-gray-500">{context?.userData?.email}</p>
      </div>

      {/* Navigation List */}
      <ul className="flex flex-col divide-y divide-gray-100 bg-gray-50">
        {[
          { to: "/my-account", icon: <FaRegUser />, label: "My Profile" },
          {
            to: "/my-address",
            icon: <HomeIcon fontSize="small" />,
            label: "My Address",
          },
          { to: "/my-list", icon: <IoMdHeartEmpty />, label: "My Wishlist" },
          { to: "/my-orders", icon: <IoBagCheckOutline />, label: "My Orders" },
          { to: "/logout", icon: <IoIosLogOut />, label: "Logout" },
        ].map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-gray-700 font-medium transition-all 
                 ${
                   isActive
                     ? "bg-orange-500 text-white shadow-inner"
                     : "hover:bg-blue-50"
                 }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountSidebar;
