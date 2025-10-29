import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import { IoGridSharp } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import { LuMenu } from "react-icons/lu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItemListView from "../../components/ProductItemListView/ProductItemListView.jsx";
import ProductLoading from "../../components/ProductLoading/ProductLoading.jsx";
import { postData } from "../../utils/api.js";

function SearchPage() {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsData, setProductsData] = useState({ products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [selectedSortValue, setSelectedSortValue] = useState("Name, A to Z");
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // ✅ Sort Handler
  const handleSortBy = async (sortBy, order, products, displayValue) => {
    try {
      setIsLoading(true);
      setSelectedSortValue(displayValue);

      const data = await postData(`/api/product/sortBy`, {
        products,
        sortBy,
        order,
      });

      if (data?.products) {
        setProductsData({ products: data.products });
      }

      setAnchorEl(null);
    } catch (error) {
      console.error("Error sorting products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-5 bg-[#f9fafb] min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="!text-[14px] hover:underline"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/ProductListing"
              className="!text-[14px] hover:underline"
            >
              Fashion
            </Link>
          </Breadcrumbs>
        </div>

        {/* Layout Wrapper */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="sidebarWrapper w-full md:w-[25%] lg:w-[20%] bg-white p-3 rounded-lg shadow-sm">
            <Sidebar
              productsData={productsData}
              setProducts={setProductsData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              page={page}
              setTotalPages={setTotalPages}
            />
          </div>

          {/* Right Content */}
          <div className="rightContent flex-1 bg-white p-4 rounded-lg shadow-sm">
            {/* Header Controls */}
            <div className="bg-[#f5f5f5] p-3 mb-5 rounded-md flex flex-col md:flex-row items-center justify-between gap-3">
              {/* View Toggle + Product Count */}
              <div className="flex items-center gap-2">
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full ${
                    itemView === "list"
                      ? "!bg-black !text-white"
                      : "!text-gray-600"
                  }`}
                  onClick={() => setItemView("list")}
                >
                  <LuMenu className="text-[18px]" />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full ${
                    itemView === "grid"
                      ? "!bg-black !text-white"
                      : "!text-gray-600"
                  }`}
                  onClick={() => setItemView("grid")}
                >
                  <IoGridSharp className="text-[18px]" />
                </Button>

                <span className="pl-3 font-medium text-[14px] text-gray-700">
                  {`There are ${productsData?.products?.length || 0} products.`}
                </span>
              </div>

              {/* Sort Menu */}
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-gray-700">
                  Sort By
                </span>
                <div>
                  <Button
                    id="sort-button"
                    aria-controls={open ? "sort-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="!bg-white !border !border-gray-300 !text-[13px] !text-gray-700 !capitalize"
                  >
                    {selectedSortValue}
                  </Button>
                  <Menu
                    id="sort-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "sort-button",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                        handleSortBy(
                          "name",
                          "asc",
                          productsData,
                          "Name, A to Z"
                        )
                      }
                      className="!text-[13px] !text-gray-800 !capitalize"
                    >
                      Name, A to Z
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleSortBy(
                          "name",
                          "desc",
                          productsData,
                          "Name, Z to A"
                        )
                      }
                      className="!text-[13px] !text-gray-800 !capitalize"
                    >
                      Name, Z to A
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleSortBy(
                          "price",
                          "asc",
                          productsData,
                          "Price, Low to High"
                        )
                      }
                      className="!text-[13px] !text-gray-800 !capitalize"
                    >
                      Price, Low to High
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleSortBy(
                          "price",
                          "desc",
                          productsData,
                          "Price, High to Low"
                        )
                      }
                      className="!text-[13px] !text-gray-800 !capitalize"
                    >
                      Price, High to Low
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>

            {/* Product Grid/List */}
            <div
              className={`grid ${
                itemView === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
                  : "grid-cols-1"
              }`}
            >
              {isLoading ? (
                <ProductLoading view={itemView} />
              ) : productsData?.products?.length > 0 ? (
                productsData?.products?.map((item, index) =>
                  itemView === "grid" ? (
                    <ProductItem key={index} item={item} />
                  ) : (
                    <ProductItemListView key={index} item={item} />
                  )
                )
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  No products found.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  count={totalPages}
                  showFirstButton
                  showLastButton
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
