import { Button, IconButton } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import CategoryPanel from "./CategoryPanel";
import { useState, useContext, useEffect } from "react";
import "../Navigation/Navigation.css";
import { fetchDataFromApi } from "../../../utils/api";
import { MyContext } from "../../../App";

function Navigation() {
  const context = useContext(MyContext);
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const openCategoryPanel = () => setIsOpenCatPanel(true);

  useEffect(() => {
    if (!context.catData || context.catData.length === 0) {
      fetchDataFromApi("/api/category/getAllCategories").then((res) => {
        if (Array.isArray(res?.categoryList)) {
          context.setCatData(res.categoryList);
        }
      });
    }
  }, []);

  return (
    <>
      <nav className="w-full bg-white shadow-sm border-b">
        <div className="container mx-auto px-3 lg:px-6 py-2 flex items-center justify-between gap-3">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <IconButton onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <HiOutlineMenuAlt3 className="text-[26px]" />
            </IconButton>
          </div>

          {/* Categories Button */}
          <div className="hidden lg:block lg:w-[22%]">
            <Button
              className="!text-black gap-2 font-bold w-full !py-2"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="text-[18px]" />
              Shop Categories
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold cursor-pointer" />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:w-[58%] justify-center">
            <ul className="flex items-center gap-1 nav">
              <li>
                <Link to="/">
                  <Button className="!text-gray-800 !py-2 hover:!text-[#ff5252]">
                    Home
                  </Button>
                </Link>
              </li>

              {context.catData?.length > 0 &&
                context.catData.map((cat, index) => (
                  <li className="relative group px-1" key={index}>
                    <Link to={`/category/${cat?._id}`}>
                      <Button className="!text-gray-800 !py-2 hover:!text-[#ff5252] whitespace-nowrap">
                        {cat?.name}
                      </Button>
                    </Link>

                    {/* Desktop Submenu */}
                    {cat.children?.length > 0 && (
                      <div className="absolute top-full left-0 min-w-[180px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <ul>
                          {cat.children.map((sub, i2) => (
                            <li className="relative group/sub" key={i2}>
                              <Link to={`/category/${sub?._id}`}>
                                <Button className="!text-gray-700 w-full !text-left !justify-start !rounded-none hover:!bg-gray-100">
                                  {sub?.name}
                                </Button>
                              </Link>

                              {/* Third level */}
                              {sub.children?.length > 0 && (
                                <div className="absolute top-0 left-full min-w-[180px] bg-white shadow-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all">
                                  <ul>
                                    {sub.children.map((third, i3) => (
                                      <li key={i3}>
                                        <Link to={`/category/${third?._id}`}>
                                          <Button className="!text-gray-600 w-full !text-left !justify-start !rounded-none hover:!bg-gray-100">
                                            {third?.name}
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex lg:w-[5%] justify-end">
            {/* <p className="text-[13px] font-[500] flex items-center gap-2 whitespace-nowrap">
              <GoRocket className="text-[18px]" />
              Free Delivery
            </p> */}
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-white shadow-md px-3 pb-4 animate-slideDown">
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={() => setMobileNavOpen(false)}>
                  Home
                </Link>
              </li>
              {context.catData?.map((cat) => (
                <li key={cat._id}>
                  <Link
                    to={`/category/${cat._id}`}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {cat?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {context.catData?.length > 0 && (
        <CategoryPanel
          isOpenCatPanel={isOpenCatPanel}
          setIsOpenCatPanel={setIsOpenCatPanel}
          data={context.catData}
        />
      )}
    </>
  );
}

export default Navigation;
