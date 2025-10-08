import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMinusSquare } from "react-icons/fi";
function CategoryPanel(props) {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innersubmenuIndex, setInnerSubmenuIndex] = useState(null);
  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const openInnerSubmenu = (index) => {
    if (innersubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
        Shop By Categories
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer  text-[20px]"
        />
      </h3>
      {props.data.length !== 0 && (
        <div className="scroll">
          <ul className="w-full">
            {props.data.length !== 0 &&
              props?.data?.map((cat, index) => {
                return (
                  <li
                    className="list-none flex items-center relative flex-col"
                    key={index}
                  >
                    <Link to="/" className="w-full">
                      <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                        {cat?.name}
                      </Button>
                    </Link>
                    {submenuIndex === index ? (
                      <FiMinusSquare
                        className="absolute top-[10px] right-[15px] cursor-pointer"
                        onClick={() => openSubmenu(index)}
                      />
                    ) : (
                      <FaRegSquarePlus
                        className="absolute top-[10px] right-[15px] cursor-pointer"
                        onClick={() => openSubmenu(index)}
                      />
                    )}

                    {submenuIndex === index && (
                      <ul className="submenu  w-full pl-3">
                        {cat?.children?.length !== 0 &&
                          cat?.children?.map((subcat, index_) => {
                            return (
                              <li className="list-non relative" key={index_}>
                                <Link to="/">
                                  <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                    {subcat?.name}
                                  </Button>
                                </Link>
                                {innersubmenuIndex === index_ ? (
                                  <FiMinusSquare
                                    className="absolute top-[10px] right-[15px] cursor-pointer"
                                    onClick={() => openInnerSubmenu(index_)}
                                  />
                                ) : (
                                  <FaRegSquarePlus
                                    className="absolute top-[10px] right-[15px] cursor-pointer"
                                    onClick={() => openInnerSubmenu(index_)}
                                  />
                                )}

                                {innersubmenuIndex === index_ && (
                                  <ul className=" inner_submenu w-full pl-3">
                                    {subcat?.children?.length !== 0 &&
                                      subcat?.children?.map(
                                        (thirdLevel, index__) => {
                                          return (
                                            <li
                                              className="list-non relative mb-1"
                                              key={index__}
                                            >
                                              <Link
                                                to="/"
                                                className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                              >
                                                {thirdLevel?.name}
                                              </Link>
                                            </li>
                                          );
                                        }
                                      )}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </Box>
  );
  return (
    <div>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default CategoryPanel;
