import React, { useState } from "react";
import Badge from "../../components/Badge/Badge";
import { Button } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SearchBox from "../../Components/SearchBox/SearchBox";

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };
  return (
    <div>
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
          <div className="w-[40%]">
           
            <SearchBox />
          </div>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  &nbsp;
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Payment Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 font-[500]">
                  {" "}
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1] "
                    onClick={() => isShowOrderedProduct(0)}
                  >
                    {isOpenOrderedProduct === 0 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]  " />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]  " />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4  font-[600] text-[#3872fa]">
                  3789vmrg9h#sorigvh4$%*^&#
                </td>
                <td className="px-6 py-4   font-[600] text-[#3872fa]">
                  ur-5467
                </td>
                <td className="px-6 py-4  font-[500] whitespace-nowrap">
                  Bami Love
                </td>
                <td className="px-6 py-4  font-[500]">245 535-465-45398</td>
                <td className="px-6 py-4  font-[500]">
                  <span className="block w-[200px]">
                    lorem dfosnopfvsnp slfbnsboir sapfbinofvid peroignoe
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">1234</td>

                <td className="px-6 py-4  font-[500]">Laptop</td>
                <td className="px-6 py-4  font-[500]">$2999</td>
                <td className="px-6 py-4  font-[500] userid text-primary">
                  1234
                </td>
                <td className="px-6 py-4  font-[500]">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4  font-[500]">$2999</td>
              </tr>

              {isOpenOrderedProduct === 0 && (
                <tr>
                  <td className="pl-20 " colSpan="6">
                    <div className="relative overflow-x-auto mt-5">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Sub Total
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4   font-[600] text-[#3872fa]">
                              2398327
                            </td>
                            <td className="px-6 py-4  font-[500]">Laptop</td>
                            <td className="px-6 py-4  font-[500]">
                              <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                                alt=""
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500]">Silver</td>
                            <td className="px-6 py-4  font-[500]">
                              <span className="block w-[200px]">
                                lorem dfosnopfvsnp slfbnsboir sapfbinofvid
                                peroignoe
                              </span>
                            </td>
                            <td className="px-6 py-4  font-[500]">Laptop</td>
                          </tr>{" "}
                          <tr>
                            <td className="bg-[#f1f1f1] " colSpan="12"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 font-[500]">
                  {" "}
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1] "
                    onClick={() => isShowOrderedProduct(1)}
                  >
                    {isOpenOrderedProduct === 1 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]  " />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]  " />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4   font-[600] text-[#3872fa]">
                  3789vmrg9h#sorigvh4$%*^&#
                </td>
                <td className="px-6 py-4 text-[#3872fa]  font-[600]">
                  ur-5467
                </td>
                <td className="px-6 py-4  font-[500] whitespace-nowrap">
                  Bami Love
                </td>
                <td className="px-6 py-4  font-[500]">245 535-465-45398</td>
                <td className="px-6 py-4  font-[500]">
                  <span className="block w-[200px]">
                    lorem dfosnopfvsnp slfbnsboir sapfbinofvid peroignoe
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">1234</td>

                <td className="px-6 py-4  font-[500]">Laptop</td>
                <td className="px-6 py-4  font-[500]">$2999</td>
                <td className="px-6 py-4  font-[500] userid text-primary">
                  1234
                </td>
                <td className="px-6 py-4  font-[500]">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4  font-[500]">$2999</td>
              </tr>

              {isOpenOrderedProduct === 1 && (
                <tr>
                  <td className="pl-20 " colSpan="6">
                    <div className="relative overflow-x-auto mt-5">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Sub Total
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4   font-[600] text-[#3872fa]">
                              2398327
                            </td>
                            <td className="px-6 py-4  font-[500]">Laptop</td>
                            <td className="px-6 py-4  font-[500]">
                              <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                                alt=""
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500]">Silver</td>
                            <td className="px-6 py-4  font-[500]">
                              <span className="block w-[200px]">
                                lorem dfosnopfvsnp slfbnsboir sapfbinofvid
                                peroignoe
                              </span>
                            </td>
                            <td className="px-6 py-4  font-[500]">Laptop</td>
                          </tr>{" "}
                          <tr>
                            <td className="bg-[#f1f1f1] " colSpan="12"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
