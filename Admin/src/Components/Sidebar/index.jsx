import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Button } from "@mui/material";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown, FaRegImage } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { Collapse } from "react-collapse";
import { useContext, useState } from "react";
import { MyContext } from "../../App";

const Sidebar = () => {
  const context = useContext(MyContext);

  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };
  return (
    <>
      <div
        className={`sidebar fixed top-0 left-0 bg-[#fff] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-2 
  transition-all duration-500 ease-in-out 
  ${context.isSidebarOpen ? "w-[18%] " : "w-0  overflow-hidden !px-0"}`}
      >
        <div className="py-2 w-full">
          <Link to="/">
            {/* <img src="" alt="" /> */}
            <Logo
              className="text-emerald-950"
              spanDesign="group-hover:text-[#063c28] "
            />
          </Link>
        </div>

        <ul className="mt-4">
          <li>
            <Link to="/">
              {" "}
              <Button className="w-full !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#f1f1f1]">
                <RxDashboard className="text-[20px]" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="w-full !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#f1f1f1]"
              onClick={() => isOpenSubMenu(1)}
            >
              <FaRegImage className="text-[20px]" />
              <span>Home Slides</span>
              <span className="ml-auto flex items-center justify-center w-[30px] h-[30px]">
                <FaAngleDown
                  className={`text-[16px] font-extralight transition-all ${
                    submenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 1 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/homeSlider/list">
                    {" "}
                    <Button className="!text-[rgba(0,0,0,0.6)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Home Banner List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.6)] !capitalize !justify-start w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Home Slide",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/users">
              {" "}
              <Button className="w-full !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#f1f1f1]">
                <FiUser className="text-[20px]" />
                <span>Users</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="w-full !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#f1f1f1]"
              onClick={() => isOpenSubMenu(3)}
            >
              <RiProductHuntLine className="text-[20px]" />
              <span>Products</span>
              <span className="ml-auto flex items-center justify-center w-[30px] h-[30px]">
                <FaAngleDown
                  className={`text-[16px] font-extralight transition-all ${
                    submenuIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/products">
                    <Button className="!text-[rgba(0,0,0,0.6)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Product List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.6)] !capitalize !justify-start w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                    Product Upload
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              className="w-full !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#f1f1f1]"
              onClick={() => isOpenSubMenu(4)}
            >
              <TbCategory className="text-[20px]" />

              <span>Category</span>
              <span className="ml-auto flex items-center justify-center w-[30px] h-[30px]">
                <FaAngleDown
                  className={`text-[16px] font-extralight transition-all ${
                    submenuIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 4 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/category/list">
                    <Button className="!text-[rgba(0,0,0,0.6)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]">
                        {" "}
                      </span>{" "}
                      Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.6)] !capitalize !justify-start w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Category",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                    Add a Category
                  </Button>
                </li>
                <li className="w-full">
                  <Link to="/subcategory/list">
                    <Button className="!text-[rgba(0,0,0,0.6)] !capitalize !justify-start w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                      Sub Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.6)] !capitalize !justify-start w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Sub Category",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                    Add Sub Category
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/orders">
              <Button className="w-full !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#f1f1f1]">
                <IoBagCheckOutline className="text-[20px]" />
                <span>Orders</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              {" "}
              <Button className="w-full !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#f1f1f1]">
                <IoMdLogOut className="text-[20px]" />
                <span>Logout</span>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
