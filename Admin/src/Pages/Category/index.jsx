import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaRegEye, FaTrash } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import Tooltip1 from "@mui/material/Tooltip";
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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox/SearchBox";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const columns = [
  { id: "image", label: "CATEGORY IMAGE", minWidth: 250 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 240 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Category = () => {
  const context = useContext(MyContext);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [catData, setCatData] = useState([]);
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      //console.log(res?.data);
      context.setCatData(res?.data);
    });
  }, [context?.isOpenFullScreenPanel]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      context.openAlertBox(
        "success",
        res?.message || "Category deleted successfully"
      );
      fetchDataFromApi("/api/category").then((res) => {
        console.log(res?.data);
        context.setCatData(res?.data);
      });
    });
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">
          Category List
          <span className="font-[400] text-[14px]">(Material Ui Table)</span>
        </h2>
        <div className="col w-[33%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">
            <BiExport />
            Export
          </Button>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category",
              })
            }
          >
            <FaPlus className="items-center" />
            Add New Category
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between ">
          <div className="col w-[20%] py-3">
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

          <div className="col w-[20%] ml-auto">
            <SearchBox />
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow width={60}>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {context.catData?.length !== 0 &&
                context.catData?.map((item, index) => {
                  return (
                    <TableRow>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex items-center gap-4 w-[100px]">
                          <div className="img w-full h-24  rounded-md overflow-hidden group">
                            <Link to="/product/4545" data-discover="true">
                              <LazyLoadImage
                                alt="image"
                                effect="blur"
                                className="w-full group-hover:scale-105 transition-all h-full object-cover"
                                src={item.images[0]?.url} // ✅ fixed
                              />
                            </Link>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell width={250}>{item?.name}</TableCell>

                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex items-center gap-4">
                          <Tooltip1 title="Edit Product" placement="top-start">
                            <Button
                              className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]"
                              onClick={() =>
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Category",
                                  id: item?._id,
                                })
                              }
                            >
                              <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                            </Button>
                          </Tooltip1>

                          {/* <Tooltip1
                            title="View Product Details"
                            placement="top-start"
                          >
                            <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                              <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                            </Button>
                          </Tooltip1> */}

                          <Tooltip1
                            title="Remove Product"
                            placement="top-start"
                          >
                            <Button
                              className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]"
                              onClick={() => deleteCat(item?._id)}
                            >
                              <FaTrash className="text-[rgba(0,0,0,0.7)] tex t-[20px]" />
                            </Button>
                          </Tooltip1>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
    </>
  );
};

export default Category;
