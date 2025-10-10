import { Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import { useState } from "react";
import "../Navigation/Navigation.css";
import { use } from "react";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../../utils/api";
function Navigation() {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [catData, setCatData] = useState([]);
  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
      // console.log(res);
    });
  }, []);

  return (
    <>
      <nav>
        <div className="container flex items-center justify-end gap-8">
          <div className="col1 w-[20%]">
            <Button
              className="!text-black gap-2 font-bold  w-full "
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="text-[18px]" />
              Shop By Categories
              <LiaAngleDownSolid className="text-[13px]  ml-auto font-bold cursor-pointer " />
            </Button>
          </div>

          <div className="col2 w-[60%] pl-5">
            <ul className="flex items-center gap-2 nav">
              <li className="list-none ">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition  text-capitalize  !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                    Home
                  </Button>
                </Link>
              </li>
              {catData?.length !== 0 &&
                catData?.map((cat, index) => {
                  return (
                    <li className="list-none relative" key={index}>
                      <Link
                        to="/"
                        className="link transition text-[14px] font-[500]"
                      >
                        <Button className="link transition  text-capitalize  !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                          {cat?.name}
                        </Button>
                      </Link>
                      {cat?.children?.length !== 0 && (
                        <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            {cat?.children?.map((subcat, index_) => {
                              return (
                                <li
                                  className="list-none w-full relative"
                                  key={index_}
                                >
                                  <Link to="/" className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none ">
                                      {subcat?.name}
                                    </Button>
                                  </Link>

                                  {subcat?.children?.length !== 0 && (
                                    <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                      <ul>
                                        {subcat?.children?.map(
                                          (thirdLevel, index__) => {
                                            return (
                                              <li className="list-none w-full">
                                                <Link
                                                  to="/"
                                                  className="w-full"
                                                  key={index__}
                                                >
                                                  <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none ">
                                                    {thirdLevel?.name}
                                                  </Button>
                                                </Link>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="col3 w-[20%]">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <GoRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>
      {/* category pannel componenets */}
      {catData?.length !== 0 && (
        <CategoryPanel
          isOpenCatPanel={isOpenCatPanel}
          setIsOpenCatPanel={setIsOpenCatPanel}
          data={catData}
        />
      )}
    </>
  );
}

export default Navigation;
