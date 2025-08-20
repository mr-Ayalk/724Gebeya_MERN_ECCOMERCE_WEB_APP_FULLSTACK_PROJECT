import { useState, PureComponent, useContext } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import superMarketImage from "../../Assets/supermarket.png";
import { FaPlus, FaRegEye, FaTrash } from "react-icons/fa";
import { Button } from "@mui/material";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import Badge from "../../components/Badge/Badge";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import Tooltip1 from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { BiExport } from "react-icons/bi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import LineChart1 from "../../Components/LineChart/LineChart";
import { MyContext } from "../../App";
const columns = [
  // {
  //   id: "id",
  //   label: "ID",
  //   minWidth: 40,
  // },
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  {
    id: "subcategory",
    label: "SUB CATEGORY",
    minWidth: 150,
  },

  {
    id: "price",
    label: "PRICE",
    minWidth: 100,
  },
  {
    id: "sales",
    label: "SALES",
    minWidth: 100,
  },
  {
    id: "action",
    label: "ACTION",
    minWidth: 120,
  },
];
const data = [
  {
    name: "Jan",
    TotalUsers: 4000,
    TotalSales: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    TotalUsers: 3000,
    TotalSales: 1398,
    amt: 2210,
  },
  {
    name: "March",
    TotalUsers: 2000,
    TotalSales: 9800,
    amt: 2290,
  },
  {
    name: "April",
    TotalUsers: 2780,
    TotalSales: 3908,
    amt: 2000,
  },
  {
    name: "May",
    TotalUsers: 1890,
    TotalSales: 4800,
    amt: 2181,
  },
  {
    name: "June",
    TotalUsers: 2390,
    TotalSales: 3800,
    amt: 2500,
  },
  {
    name: "July",
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    TotalUsers: 3490,
    TotalSales: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    TotalUsers: 8490,
    TotalSales: 2300,
    amt: 2100,
  },
  {
    name: "Dec",
    TotalUsers: 5490,
    TotalSales: 1300,
    amt: 2100,
  },
];
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Dashboard = () => {
  const context = useContext(MyContext);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };
  const [chartData, setChartDate] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <div className="w-full py-2 bg-[#f1faff] px-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3 ">
            Good Morning, <br /> Ayalk 👋
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Praesentium nemo cum neque repellat cupiditate id.
          </p>
          <br />
          <Button
            className="btn-blue !capitalize"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            <FaPlus /> Add Product
          </Button>
        </div>
        <img
          src={superMarketImage}
          alt="supermarket"
          className="w-[250px]  object-cover "
        />
      </div>
      <DashboardBoxes />
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            Products
            <span className="font-[400] text-[14px]">(Tailwind Css Table)</span>
          </h2>
        </div>

        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              size="small"
              className="w-full"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[30%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">
              <BiExport />
              Export
            </Button>
            <Button
              className="btn-blue !text-white btn-sm"
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              {" "}
              <FaPlus />
              Add Product
            </Button>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 pr-0 py-3 whitespace-nowrap w-[10%] "
                >
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th scope="col" className="px-0 py-3 whitespace-nowrap">
                  PRODUCT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  CATEGORY
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  SUB CATEGORY
                </th>
                {/* <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  BRAND
                </th> */}
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  PRICE
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  SALES
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/product/4545"}>
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                          className="w-full group-hover:scale-105 transition-all"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                        <Link to={"/product/4545"}>
                          {" "}
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Quia culpa
                        </Link>
                      </h3>
                      <span className="text-[12px]">Books</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                {/* <td className="px-6 py-2"></td> */}
                <td className="px-6 py-2">Women</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $44.99
                    </span>
                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                      $33.33
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>sale
                    <Progress value={40} type={"success"} />
                  </p>
                </td>

                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Tooltip1 title="Edit Product" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>

                    <Tooltip1
                      title="View Product Details"
                      placement="top-start"
                    >
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>

                    <Tooltip1 title="Remove Product" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <FaTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/product/4545"}>
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                          className="w-full group-hover:scale-105 transition-all"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                        <Link to={"/product/4545"}>
                          {" "}
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Quia culpa
                        </Link>
                      </h3>
                      <span className="text-[12px]">Books</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                {/* <td className="px-6 py-2"></td> */}
                <td className="px-6 py-2">Women</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $44.99
                    </span>
                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                      $33.33
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>sale
                    <Progress value={40} type={"success"} />
                  </p>
                </td>

                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Tooltip1 title="Edit Product" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>

                    <Tooltip1
                      title="View Product Details"
                      placement="top-start"
                    >
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>

                    <Tooltip1 title="Remove Product" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <FaTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end py-5 px-4">
          <Pagination count={10} color="primary" />
        </div>
      </div>

     

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            Products
            <span className="font-[400] text-[14px]">(Material Ui Table)</span>
          </h2>
        </div>
        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              size="small"
              className="w-full"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[30%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">
              <BiExport />
              Export
            </Button>
            <Button
              className="btn-blue !text-white btn-sm"
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              {" "}
              <FaPlus />
              Add Product
            </Button>
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/product/4545"}>
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                          className="w-full group-hover:scale-105 transition-all"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                        <Link to={"/product/4545"}>
                          {" "}
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Quia culpa
                        </Link>
                      </h3>
                      <span className="text-[12px]">Books</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  Women
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $44.99
                    </span>
                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                      $33.33
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>sale
                    <Progress value={40} type={"success"} />
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <Tooltip1 title="Edit Product" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>

                    <Tooltip1
                      title="View Product Details"
                      placement="top-start"
                    >
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>

                    <Tooltip1 title="Remove Product" placement="top-start">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                        <FaTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                      </Button>
                    </Tooltip1>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
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

      {/* <LineChart1 /> */}
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
        </div>
        <div className="flex items-center gap-5 px-5 py-5 pt-0">
          <span className="flex items-center gap-1 text-[15px]">
            <span className="bolck w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Users
          </span>
          <span className="flex items-center gap-1 text-[15px]">
            <span className="bolck w-[8px] h-[8px] rounded-full bg-blue-600"></span>
            Total Sales
          </span>
        </div>
        <LineChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="TotalUsers"
            strokeWidth={3}
            stroke="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="TotalUsers"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
