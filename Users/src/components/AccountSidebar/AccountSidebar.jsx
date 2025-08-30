import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { CircularProgress } from "@mui/material";
import { uploadImage } from "../../utils/api";

function AccountSidebar() {
  const context = useContext(MyContext);

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
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [userData, setUserData] = useState([]);
  const formdata = new FormData();

  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];

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

  return (
    <>
      <div className="card bg-white shadow-md rounded-md sticky top-[10px] ">
        <div className="w-full p-5 flex items-center justify-center flex-col">
          <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200 ">
            {uploading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                {/* {previews?.length !== 0 &&
                  previews?.map((img, index) => {
                    return (
                      <img
                        src={img}
                        key={index}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    );

                  })} */}

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
              <FaCloudUploadAlt className="text-[#fff] text-[25]  cursor-pointer" />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
                name="avatar"
              />
            </div>
          </div>
          <h3>{context?.userData?.name}</h3>
          <h6 className="text-[13px] font-[500]">{context?.userData?.email}</h6>
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
