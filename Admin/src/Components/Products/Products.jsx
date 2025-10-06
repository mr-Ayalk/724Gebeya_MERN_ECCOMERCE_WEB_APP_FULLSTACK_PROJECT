import { Button, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaRegEye, FaTrash } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
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
import SearchBox from "../SearchBox/SearchBox";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
//
import { LazyLoadImage } from "react-lazy-load-image-component";
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

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Products = () => {
  const context = useContext(MyContext);
  const [category, setCategory] = useState("");
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [sortedIds, setsortedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productData, setProductData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });
  useEffect(() => {
    getProducts();
  }, [context?.setIsOpenFullScreenPanel]);
  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      // setProductData(res?.products);
      let productArr = [];
      console.log(res);
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductData(productArr);
          setIsLoading(false);
        }, 500);
        // setProductData(productArr);
        // console.log(productArr);
        // setProductData(res?.products);
      }
    });
  };
  useEffect(() => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      console.log(res);
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  }, []);
  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts();
      context.openAlertBox("success", "Product deleted successfully");
      // console.log(res);

      // if (res?.error === false) {
      //   getProducts();
      //   // console.log(res);
      //   context.openAlertBox(
      //     "error",
      //     res?.message || "Please enter product name"
      //   );
      // } else {
      //   context.openAlertBox("success", "Product deleted successfully");
      // }
    });
  };
  const deleteMultipleProduct = () => {
    if (sortedIds.length === 0) {
      context.openAlertBox("error", "Please select items to delete");
      return;
    }
    // console.log(sortedIds);
    try {
      deleteMultipleProduct(`/api/product/deleteMultiple`, {
        data: { ids: sortedIds },
      }).then((res) => {
        console.log(res);
        getProducts();
        context.openAlertBox("success", "Product deleted");
      });
    } catch (error) {
      // context.openAlertBox("error", "Error deleting items.");
      console.log(error);
    }
  };
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLevelCat("");
    setIsLoading(true);
    // formFields.catId = event.target.value;
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`
    ).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };
  const handleChangeProductSubCat = (event) => {
    setIsLoading(true);
    setProductSubCat(event.target.value);
    setProductCat("");

    setProductThirdLevelCat("");
    // formFields.subCatId = event.target.value;
    fetchDataFromApi(
      `/api/product/getAllProductsBysubCatId/${event.target.value}`
    ).then((res) => {
      console.log(res);
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };
  const handleChangeProductThirdLevelCat = (event) => {
    setIsLoading(true);
    setProductThirdLevelCat(event.target.value);
    setProductCat("");
    setProductSubCat("");

    // formFields.thirdLevelCat = event.target.value;
    fetchDataFromApi(
      `/api/product/getAllProductsthridLevelCatId/${event.target.value}`
    ).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        setProductData(res?.products);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    });
  };
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    //Update all items checked status
    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    //update the sorted IDs state
    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      console.log(ids);
      setsortedIds(ids);
    } else {
      setsortedIds([]);
    }
  };
  //Handler to toggle individual checkbox
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updatedItems);
    //Update the sorted IDs state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setsortedIds(selectedIds);
    // console.log(selectedIds);
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">
          Products
          <span className="font-[400] text-[14px]">(Material Ui Table)</span>
        </h2>

        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          {sortedIds?.length !== 0 && (
            <Button
              variant="contained"
              className="btn-sm"
              size="small"
              color="error"
              onClick={deleteMultipleProduct}
            >
              Delete
            </Button>
          )}
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
            <FaPlus />
            Add Product
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between  gap-4">
          <div className="col w-[15%] py-3">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-white"
                size="small"
                value={productCat}
                label="Age"
                onChange={handleChangeProductCat}
              >
                {context?.catData?.map((cat, index) => {
                  return (
                    <MenuItem value={cat?._id} key={index}>
                      {cat?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>
          <div className="col w-[15%] py-3">
            <h4 className="font-[600] text-[13px] mb-2">Sub Category By</h4>
            {/* <Select
              size="small"
              className="w-full"
              style={{ zoom: "80%" }}
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
            </Select> */}
            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-white"
                size="small"
                value={productSubCat}
                label="Age"
                onChange={handleChangeProductSubCat}
              >
                {context?.catData?.map(
                  (cat, index) =>
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat, index_) => (
                      <MenuItem key={subCat?._id} value={subCat?._id}>
                        {subCat?.name}
                      </MenuItem>
                    ))
                )}
              </Select>
            )}
          </div>
          <div className="col w-[15%] py-3">
            <h4 className="font-[600] text-[13px] mb-2">
              Third Level Category By
            </h4>
            {/* <Select
              size="small"
              className="w-full"
              style={{ zoom: "80%" }}
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
            </Select> */}
            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-white"
                size="small"
                value={productThirdLevelCat}
                label="Age"
                onChange={handleChangeProductThirdLevelCat}
              >
                {context?.catData?.map(
                  (cat) =>
                    cat?.children?.length !== 0 &&
                    cat?.children?.map(
                      (subCat) =>
                        subCat?.children?.length !== 0 &&
                        subCat?.children?.map((thirdLevelCat, index) => (
                          <MenuItem
                            value={thirdLevelCat?._id}
                            key={thirdLevelCat?._id || index}
                          >
                            {thirdLevelCat?.name}
                          </MenuItem>
                        ))
                    )
                )}
              </Select>
            )}
          </div>
          <div className="col w-[20%] ml-auto">
            <SearchBox />
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox
                    {...label}
                    size="small"
                    onChange={handleSelectAll}
                    checked={
                      productData?.length > 0
                        ? productData.every((item) => item.checked)
                        : false
                    }
                  />
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
              {isLoading === false ? (
                productData?.length !== 0 &&
                productData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.reverse()
                  ?.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <Checkbox
                            {...label}
                            size="small"
                            checked={product.checked === true ? true : false}
                            onChange={(e) =>
                              handleCheckboxChange(e, product._id, index)
                            }
                          />
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4 w-[300px]">
                            <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                              <Link to={`/product/${product?._id}`}>
                                <LazyLoadImage
                                  className="w-full group-hover:scale-105 transition-all"
                                  alt={"category image"}
                                  effect="blur"
                                  src={product.images[0]} // ✅ use url field from object
                                />
                              </Link>
                            </div>

                            <div className="info w-[75%]">
                              <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                <Link to={`/product/${product?._id}`}>
                                  {product?.name}
                                </Link>
                              </h3>
                              <span className="text-[12px]">
                                {product?.brand}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.catName}
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.subCat}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex gap-1 flex-col">
                            <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                              &#x20b9; {product?.price}
                            </span>
                            <span className="price text-[#3872fa] text-[14px] font-[600]">
                              &#x20b9; {product?.oldPrice}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px] w-[100px]">
                            <span className="font-[600]">{product?.sale} </span>
                            sale
                            {/* <Progress value={40} type={"success"} /> */}
                          </p>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4">
                            <Tooltip1
                              title="Edit Product"
                              placement="top-start"
                            >
                              <Button
                                className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]"
                                onClick={() =>
                                  context.setIsOpenFullScreenPanel({
                                    open: true,
                                    model: "Edit Product",
                                    id: product?._id,
                                  })
                                }
                              >
                                <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                              </Button>
                            </Tooltip1>

                            <Tooltip1
                              title="View Product Details"
                              placement="top-start"
                            >
                              <Link to={`/product/${product?._id}`}>
                                <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]">
                                  <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                </Button>
                              </Link>
                            </Tooltip1>

                            <Tooltip1
                              title="Remove Product"
                              placement="top-start"
                            >
                              <Button
                                className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]"
                                onClick={() => deleteProduct(product?._id)}
                              >
                                <FaTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                              </Button>
                            </Tooltip1>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="flex items-center justify-center w-full min-h-[400px] ">
                        {" "}
                        <CircularProgress color="inherit" />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Products;
