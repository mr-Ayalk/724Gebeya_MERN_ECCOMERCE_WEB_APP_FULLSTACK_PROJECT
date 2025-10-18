// import React, { useState } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import ProductItem from "../../components/ProductItem/ProductItem";
// import { IoGridSharp } from "react-icons/io5";
// import Pagination from "@mui/material/Pagination";
// import { LuMenu } from "react-icons/lu";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ProductItemListView from "../../components/ProductItemListView/ProductItemListView";
// import ProductLoading from "../../components/ProductLoading/ProductLoading.jsx";
// function ProductListing() {
//   const [itemView, setItemView] = useState("grid");
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [productsData, setProductsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(10);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <section className="py-5 pb-0">
//       {/* <div className="container">
//         <div role="presentation" onClick={handleClick}>
//           <Breadcrumbs aria-label="breadcrumb">
//             <Link
//               underline="hover"
//               color="inherit"
//               href="/"
//               className="link transition !text-[14px]"
//             >
//               Home
//             </Link>
//             <Link
//               underline="hover"
//               color="inherit"
//               href="/ProductListing"
//               className="link transition !text-[14px]"
//             >
//               Fashion
//             </Link>
//           </Breadcrumbs>
//         </div>
//       </div> */}

//       <div className="bg-white p-2 mt-4">
//         <div className="container flex gap-3">
//           <div className="sidebarWrapper w-[20%] h-full bg-white ">
//             <Sidebar
//               productsData={productsData}
//               setProducts={setProductsData}
//               isLoading={isLoading}
//               setIsLoading={setIsLoading}
//               page={page}
//               setTotalPages={setTotalPages}
//             />
//           </div>

//           <div className="rightContent w-80% py-3">
//             <div className="bg-[#f1f1f1] p-2 w-full mb-4 rounded-md flex items-center justify-between">
//               <div className="col1 flex items-center itemViewActions">
//                 <Button
//                   className={`!w-[40px]  !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
//                     itemView === "list" && "active"
//                   }`}
//                   onClick={() => setItemView("list")}
//                 >
//                   <LuMenu className="text-[rgba(0,0,0,0.7)]" />
//                 </Button>
//                 <Button
//                   className={`!w-[40px]  !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
//                     itemView === "grid" && "active"
//                   }`}
//                   onClick={() => setItemView("grid")}
//                 >
//                   <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
//                 </Button>

//                 <span className="pl-3 font-[500] text-[14px] text-[rgba(0,0,0,0.7)]">
//                   There are{" "}
//                   {productsData?.length > 0
//                     ? productsData?.products?.length
//                     : 0}{" "}
//                   products.
//                 </span>
//               </div>

//               <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
//                 <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
//                   {" "}
//                   Sort By
//                 </span>
//                 <div>
//                   <Button
//                     id="basic-button"
//                     aria-controls={open ? "basic-menu" : undefined}
//                     aria-haspopup="true"
//                     aria-expanded={open ? "true" : undefined}
//                     onClick={handleClick}
//                     className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[000]"
//                   >
//                     Sales,highest to lowest
//                   </Button>
//                   <Menu
//                     id="basic-menu"
//                     anchorEl={anchorEl}
//                     open={open}
//                     onClose={handleClose}
//                     slotProps={{
//                       list: {
//                         "aria-labelledby": "basic-button",
//                       },
//                     }}
//                   >
//                     <MenuItem
//                       onClick={handleClose}
//                       className="!text-[13px] !text-[#000] !capitalize"
//                     >
//                       Sales,highest to lowest
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleClose}
//                       className="!text-[13px] !text-[#000] !capitalize"
//                     >
//                       Relevence
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleClose}
//                       className="!text-[13px] !text-[#000] !capitalize"
//                     >
//                       Name,A to Z
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleClose}
//                       className="!text-[13px] !text-[#000] !capitalize"
//                     >
//                       Name,A to Z
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleClose}
//                       className="!text-[13px] !text-[#000] !capitalize"
//                     >
//                       Name,Z to A
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleClose}
//                       className="!text-[13px] !text-[#000] !capitalize"
//                     >
//                       Price,low to high
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleClose}
//                       className="!text-[13px] !text-[#000] !capitalize"
//                     >
//                       Price,high to low
//                     </MenuItem>
//                   </Menu>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`w-full  grid ${
//                 itemView === "grid"
//                   ? "grid-cols-4 md:grid-cols-4 gap-4"
//                   : "grid-col-1 md:grid-col1"
//               } gap-4`}
//             >
//               {itemView === "grid w-[50%]" ? (
//                 <>
//                   {isLoading === true ? (
//                     <ProductLoading view={itemView} />
//                   ) : (
//                     productsData?.products?.length !== 0 &&
//                     productsData?.products?.map((item, index) => {
//                       return <ProductItem key={index} item={item} />;
//                     })
//                   )}
//                 </>
//               ) : (
//                 <>
//                   {isLoading === true ? (
//                     <ProductLoading view={itemView} />
//                   ) : (
//                     productsData?.products?.length !== 0 &&
//                     productsData?.products?.map((item, index) => {
//                       return <ProductItemListView key={index} item={item} />;
//                     })
//                   )}
//                 </>
//               )}
//             </div>
//             {totalPages > 1 && (
//               <div className="flex items-center justify-center mt-10">
//                 <Pagination
//                   count={totalPages}
//                   showFirstButton
//                   showLastButton
//                   page={page}
//                   onChange={(e, value) => setPage(value)}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductListing;
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../components/ProductItem/ProductItem";
import { IoGridSharp } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import { LuMenu } from "react-icons/lu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItemListView from "../../components/ProductItemListView/ProductItemListView";
import ProductLoading from "../../components/ProductLoading/ProductLoading.jsx";

function ProductListing() {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsData, setProductsData] = useState({ products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
                    Sales, highest to lowest
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
                    {[
                      "Sales, highest to lowest",
                      "Relevance",
                      "Name, A to Z",
                      "Name, Z to A",
                      "Price, low to high",
                      "Price, high to low",
                    ].map((option, i) => (
                      <MenuItem
                        key={i}
                        onClick={handleClose}
                        className="!text-[13px] !text-gray-800"
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
            </div>

            {/* Product Grid/List */}
            <div
              className={`grid ${
                itemView === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
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

export default ProductListing;
