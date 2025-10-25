import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

function CategoryPanel(props) {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const toggleSubmenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };

  const toggleInnerSubmenu = (index) => {
    setInnerSubmenuIndex(innerSubmenuIndex === index ? null : index);
  };

  const DrawerList = (
    <Box
      sx={{ width: { xs: 260, sm: 300 } }}
      role="presentation"
      className="categoryPanel bg-white"
    >
      <div className="p-4 border-b flex justify-between items-center shadow-sm">
        <h3 className="text-[16px] font-semibold tracking-wide text-primary py-2 pl-3">
          Shop By Categories
        </h3>
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[24px] opacity-80 hover:opacity-100 transition "
        />
      </div>

      <div className="scroll mt-1">
        <ul>
          {props?.data?.map((cat, index) => (
            <li className="border-b" key={index}>
              <div
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleSubmenu(index)}
              >
                <Link to={`/category/${cat._id}`} className="flex-1">
                  <span className="text-[15px] text-gray-800 font-medium">
                    {cat?.name}
                  </span>
                </Link>

                {submenuIndex === index ? (
                  <IoIosArrowUp className="text-[20px] opacity-70" />
                ) : (
                  <IoIosArrowDown className="text-[20px] opacity-70" />
                )}
              </div>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  submenuIndex === index ? "max-h-[600px]" : "max-h-0"
                }`}
              >
                <ul className="bg-gray-50 pl-6 py-2 border-l">
                  {cat.children?.map((subcat, subIndex) => (
                    <li key={subIndex} className="mb-2">
                      <div
                        className="flex justify-between items-center pr-4 cursor-pointer hover:text-black"
                        onClick={() => toggleInnerSubmenu(subIndex)}
                      >
                        <Link to={`/category/${subcat._id}`}>
                          <span className="text-[14px] text-gray-700">
                            {subcat?.name}
                          </span>
                        </Link>

                        {innerSubmenuIndex === subIndex ? (
                          <IoIosArrowUp className="text-[18px] opacity-70" />
                        ) : (
                          <IoIosArrowDown className="text-[18px] opacity-70" />
                        )}
                      </div>

                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          innerSubmenuIndex === subIndex
                            ? "max-h-[500px]"
                            : "max-h-0"
                        }`}
                      >
                        <ul className="pl-5 py-1">
                          {subcat?.children?.map((third, idx) => (
                            <li key={idx} className="py-1">
                              <Link
                                to={`/category/${third._id}`}
                                className="text-[13px] text-gray-600 hover:text-black block"
                              >
                                {third?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );

  return (
    <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}

export default CategoryPanel;
