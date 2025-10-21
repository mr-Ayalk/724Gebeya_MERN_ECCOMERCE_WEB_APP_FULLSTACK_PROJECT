import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import { useState, useContext, useEffect } from "react";
import "../Navigation/Navigation.css";
import { fetchDataFromApi } from "../../../utils/api";
import { MyContext } from "../../../App";

function Navigation() {
  const context = useContext(MyContext);
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  // 🔄 Fetch categories (optional if not already fetched globally)
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
      <nav>
        <div className="container flex items-center justify-end gap-8">
          {/* 🛍️ Categories Button */}
          <div className="col1 w-[20%]">
            <Button
              className="!text-black gap-2 font-bold w-full"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="text-[18px]" />
              Shop By Categories
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold cursor-pointer" />
            </Button>
          </div>

          {/* 🧭 Navigation Menu */}
          <div className="col2 w-[60%] pl-5">
            <ul className="flex items-center gap-2 nav">
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                    Home
                  </Button>
                </Link>
              </li>

              {/* ✅ Dynamic Categories */}
              {context.catData?.length > 0 &&
                context.catData.map((cat, index) => (
                  <li className="list-none relative group" key={index}>
                    <Link
                      to={`/category/${cat?._id}`}
                      className="link transition text-[14px] font-[500]"
                    >
                      <Button className="!font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                        {cat?.name}
                      </Button>
                    </Link>

                    {/* 🔽 Subcategories */}
                    {Array.isArray(cat?.children) &&
                      cat.children.length > 0 && (
                        <div className="submenu absolute top-[100%] left-0 min-w-[180px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                          <ul>
                            {cat.children.map((subcat, i2) => (
                              <li
                                className="list-none relative group/sub"
                                key={i2}
                              >
                                <Link
                                  to={`/category/${subcat?._id}`}
                                  className="w-full"
                                >
                                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!bg-gray-100">
                                    {subcat?.name}
                                  </Button>
                                </Link>

                                {/* ➡️ Third-level categories */}
                                {Array.isArray(subcat?.children) &&
                                  subcat.children.length > 0 && (
                                    <div className="submenu absolute top-0 left-full min-w-[180px] bg-white shadow-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all">
                                      <ul>
                                        {subcat.children.map((third, i3) => (
                                          <li className="list-none" key={i3}>
                                            <Link
                                              to={`/category/${third?._id}`}
                                              className="w-full"
                                            >
                                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!bg-gray-100">
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

          {/* 🚀 Right Section */}
          <div className="col3 w-[20%]">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <GoRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* 🪟 Category Panel (Side Popup) */}
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
