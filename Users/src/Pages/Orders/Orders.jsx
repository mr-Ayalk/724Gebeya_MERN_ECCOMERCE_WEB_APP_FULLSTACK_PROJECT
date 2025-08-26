import  { useState } from "react";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";
import Badge from "../../components/Badge/Badge";
function Orders() {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };
  return (
    <>
      {" "}
      <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSidebar />
          </div>

          <div className="col2 w-[70%]">
            <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2>My Orders</h2>
                <p className="mt-0">
                  There are <span className="font-bold text-primary">2 </span>{" "}
                  orders
                </p>
                <div className="relative overflow-x-auto mt-5">
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
                            {
                                isOpenOrderedProduct===0 ?  <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]  " />: <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]  " />
                            }
                           
                          </Button>
                        </td>
                        <td className="px-6 py-4  font-[500] text-primary">
                          3789vmrg9h#sorigvh4$%*^&#
                        </td>
                        <td className="px-6 py-4  font-[500]">ur-5467</td>
                        <td className="px-6 py-4  font-[500] whitespace-nowrap">
                          Bami Love
                        </td>
                        <td className="px-6 py-4  font-[500]">
                          245 535-465-45398
                        </td>
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
                                    <td className="px-6 py-4  font-[500] text-gray-600">
                                    2398327
                                    </td>
                                    <td className="px-6 py-4  font-[500]">
                                      Laptop
                                    </td>
                                    <td className="px-6 py-4  font-[500]">
                                      <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                                        alt=""
                                        className="w-[40px] h-[40px] object-cover rounded-md"
                                      />
                                    </td>
                                    <td className="px-6 py-4 font-[500]">
                                      Silver
                                    </td>
                                    <td className="px-6 py-4  font-[500]">
                                      <span className="block w-[200px]">
                                        lorem dfosnopfvsnp slfbnsboir
                                        sapfbinofvid peroignoe
                                      </span>
                                    </td>
                                    <td className="px-6 py-4  font-[500]">
                                      Laptop
                                    </td>
                                  </tr>{" "}
                                  <tr>
                                    <td
                                      className="bg-[#f1f1f1] "
                                      colSpan="12"
                                    ></td>
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
          </div>
        </div>
      </section>
    </>
  );
}

export default Orders;
