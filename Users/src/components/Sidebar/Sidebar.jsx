// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { useState } from "react";
// import { Collapse } from "react-collapse";
// import "../Sidebar/Sidebar.css";
// import { FaAngleDown } from "react-icons/fa6";
// import { FaAngleUp } from "react-icons/fa";
// import Button from "@mui/material/Button";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import Rating from "@mui/material/Rating";
// import { useContext, useEffect } from "react";
// import { MyContext } from "../../App";
// import { useLocation } from "react-router-dom";
// import { postData } from "../../utils/api";
// function Sidebar(props) {
//   const context = useContext(MyContext);
//   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
//   const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
//   const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
//   const [filters, setFilters] = useState({
//     catId: [],
//     subCatId: [],
//     thirdsubCatId: [],
//     minPrice: "",
//     maxPrice: "",
//     rating: "",
//     page: 1,
//     limit: 5,
//   });

//   const location = useLocation();

//   // useEffect(()=>{
//   //   const url=window.location.href;
//   //   const params=new URL(url).searchParams;
//   //   const catIdFromUrl=params.get("catId");
//   //   if(catIdFromUrl){

//   //   }
//   // })
//   // useEffect(() => {
//   //   const url = window.location.href;
//   //   const queryParameters = new URLSearchParams(location.search);
//   //   if (url.includes("catId")) {
//   //     const categoryId = queryParameters.get("catId");
//   //     const catArr = [];
//   //     catArr.push(categoryId);
//   //     filters.catId = catArr;
//   //     filters.subCatId = [];
//   //     filters.thirdsubCatId = [];
//   //     filters.rating = [];
//   //   }
//   //   if (url.includes("subCatId")) {
//   //     const subcategoryId = queryParameters.get("subCatId");
//   //     const subcatArr = [];
//   //     subcatArr.push(subcategoryId);
//   //     filters.subCatId = subcatArr;
//   //     filters.catId = [];
//   //     filters.thirdsubCatId = [];
//   //     filters.rating = [];
//   //   }
//   //   if (url.includes("thirdLavelCatId")) {
//   //     const thirdcategoryId = queryParameters.get("thirdLavelCatId");
//   //     const thirdcatArr = [];
//   //     thirdcatArr.push(thirdcategoryId);
//   //     filters.subCatId = thirdcatArr;
//   //     filters.catId = [];
//   //     filters.subCatId = [];
//   //     filters.thirdsubCatId = thirdcatArr;
//   //     filters.rating = [];
//   //   }
//   //   filters.page = 1;
//   //   setTimeout(() => {
//   //     filtersData();
//   //   }, 200);
//   // }, [location]);
//   useEffect(() => {
//     const url = window.location.href;
//     const queryParameters = new URLSearchParams(location.search);

//     const newFilters = {
//       catId: [],
//       subCatId: [],
//       thirdsubCatId: [],
//       rating: [],
//       page: 1,
//       limit: 5,
//       minPrice: filters.minPrice,
//       maxPrice: filters.maxPrice,
//     };

//     if (url.includes("catId")) {
//       const categoryId = queryParameters.get("catId");
//       newFilters.catId = [categoryId];
//     }
//     if (url.includes("subCatId")) {
//       const subcategoryId = queryParameters.get("subCatId");
//       newFilters.subCatId = [subcategoryId];
//     }
//     if (url.includes("thirdLavelCatId")) {
//       const thirdcategoryId = queryParameters.get("thirdLavelCatId");
//       newFilters.thirdsubCatId = [thirdcategoryId];
//     }

//     setFilters(newFilters);
//   }, [location]);

//   // 👇 This useEffect runs whenever filters or page change
//   useEffect(() => {
//     filtersData();
//   }, [
//     filters.catId,
//     filters.subCatId,
//     filters.thirdsubCatId,
//     filters.minPrice,
//     filters.maxPrice,
//     filters.rating,
//     props.page,
//   ]);

//   const filtersData = async () => {
//     props.setIsLoading(true);
//     try {
//       const res = await postData(`/api/product/filter`, {
//         ...filters,
//         page: props.page,
//       });
//       props.setProducts(res);
//       props.setTotalPages(res?.totalPages);
//     } catch (err) {
//       console.error("Error fetching filtered products:", err);
//     } finally {
//       props.setIsLoading(false);
//       window.scrollTo(0, 0);
//     }
//   };

//   // const filtersData = () => {
//   //   props.setIsLoading(true);
//   //   postData(`/api/product/filter`, filters).then((res) => {
//   //     props.setProducts(res);
//   //     props.setIsLoading(false);
//   //     props.setTotalPages(res?.totalPages);
//   //     window.scrollTo(0, 0);
//   //   });
//   // };
//   useEffect(() => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       minPrice: price[0],
//       maxPrice: price[1],
//     }));
//   }, []);
//   useEffect(() => {
//     filters.page = props.page;
//     filtersData();
//   }, [filters, props.page]);
//   const [price, setPrice] = useState([0, 600000]);
//   const handleCheckboxChange = (filterName, value) => {
//     setFilters((prevFilters) => {
//       const currentValues = prevFilters[filterName];
//       let updatedValues;

//       if (currentValues.includes(value)) {
//         // Remove value
//         updatedValues = currentValues.filter((v) => v !== value);
//       } else {
//         // Add value
//         updatedValues = [...currentValues, value];
//       }

//       // ✅ RETURN new state
//       return {
//         ...prevFilters,
//         [filterName]: updatedValues,
//       };
//     });
//   };

//   return (
//     <aside className="sidebar py-5">
//       <div className="box mb-3">
//         <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center ">
//           Shop by Category
//           <Button
//             className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
//             onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
//           >
//             {isOpenCategoryFilter === true ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenCategoryFilter}>
//           <div className="scroll px-4 relative -left-[13px]">
//             {context?.catData?.length !== 0 &&
//               context?.catData?.map((item, index) => {
//                 return (
//                   <FormControlLabel
//                     key={index}
//                     value={item?._id}
//                     control={<Checkbox size="small" />}
//                     checked={filters?.catId?.includes(item?._id)}
//                     label={item.name}
//                     onChange={() => handleCheckboxChange("catId", item?._id)}
//                     className="w-full"
//                   />
//                 );
//               })}
//           </div>
//         </Collapse>
//       </div>
//       <div className="box mb-3">
//         <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center ">
//           Availability
//           <Button
//             className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
//             onClick={() => setIsOpenAvailFilter(!isOpenAvailFilter)}
//           >
//             {isOpenAvailFilter === true ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenAvailFilter}>
//           <div className="scroll px-4 relative -left-[13px]">
//             <FormControlLabel
//               control={<Checkbox size="small" />}
//               label="Available (17)"
//               className="w-full"
//             />
//             <FormControlLabel
//               control={<Checkbox size="small" />}
//               label="In stoke (17)"
//               className="w-full"
//             />
//             <FormControlLabel
//               control={<Checkbox size="small" />}
//               label="Not Available (1)"
//               className="w-full"
//             />
//           </div>
//         </Collapse>
//       </div>

//       <div className="box mb-3">
//         <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center ">
//           Size
//           <Button
//             className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
//             onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
//           >
//             {isOpenSizeFilter === true ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenSizeFilter}>
//           <div className="scroll px-4 relative -left-[13px]">
//             <FormControlLabel
//               control={<Checkbox size="small" />}
//               label="Small (6)"
//               className="w-full"
//             />
//             <FormControlLabel
//               control={<Checkbox size="small" />}
//               label="Medium (5)"
//               className="w-full"
//             />
//             <FormControlLabel
//               control={<Checkbox size="small" />}
//               label="Large (7)"
//               className="w-full"
//             />

//             <FormControlLabel
//               control={<Checkbox size="small" />}
//               label="XL  (3)"
//               className="w-full"
//             />

//             <FormControlLabel
//               control={<Checkbox size="small" />}
//               label="XXL (2)"
//               className="w-full"
//             />
//           </div>
//         </Collapse>
//       </div>

//       <div className="box mb-4">
//         <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center ">
//           Filter By Price
//         </h3>
//         <RangeSlider
//           value={price}
//           onInput={setPrice}
//           min={100}
//           max={600000}
//           step={5}
//         />
//         <div className="flex pt-4 pb-2 priceRanging">
//           <span className="text-[13px]">
//             From: <strong className="text-dark"> birr : {price[0]}</strong>
//           </span>
//           <span className="mt-auto text-[13px]">
//             From: <strong className="text-dark">birr : {price[1]}</strong>
//           </span>
//         </div>
//       </div>

//       <div className="box mb-4">
//         <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center ">
//           Filter By Rating
//         </h3>
//         <div className="w-full">
//           <Rating name="size-small" defaultValue={5} size="small" readOnly />
//         </div>
//         <div className="w-full  cursor-pointer">
//           <Rating name="size-small" defaultValue={4} size="small" readOnly />
//         </div>
//         <div className="w-full  cursor-pointer">
//           <Rating name="size-small" defaultValue={3} size="small" readOnly />
//         </div>
//         <div className="w-full  cursor-pointer">
//           <Rating name="size-small" defaultValue={2} size="small" readOnly />
//         </div>
//         <div className="w-full  cursor-pointer">
//           <Rating name="size-small" defaultValue={1} size="small" readOnly />
//         </div>
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect, useContext } from "react";
import { Collapse } from "react-collapse";
import "../Sidebar/Sidebar.css";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";

function Sidebar(props) {
  const context = useContext(MyContext);
  const location = useLocation();

  // ---------- STATE ----------
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
  const [price, setPrice] = useState([0, 600000]);
  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdsubCatId: [],
    minPrice: price[0],
    maxPrice: price[1],
    rating: "",
    page: 1,
    limit: 5,
  });

  // ---------- HANDLE CHECKBOX CHANGES ----------
  const handleCheckboxChange = (filterName, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[filterName];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return { ...prevFilters, [filterName]: updatedValues, page: 1 };
    });
  };

  // ---------- HANDLE RATING CLICK ----------
  const handleRatingFilter = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: value,
      page: 1,
    }));
  };

  // ---------- UPDATE PRICE RANGE ----------
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
      page: 1,
    }));
  }, [price]);

  // ---------- SYNC URL PARAMS ----------
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newFilters = {
      catId: [],
      subCatId: [],
      thirdsubCatId: [],
      rating: "",
      page: 1,
      limit: 5,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    };

    if (queryParams.get("catId")) {
      newFilters.catId = [queryParams.get("catId")];
    }
    if (queryParams.get("subCatId")) {
      newFilters.subCatId = [queryParams.get("subCatId")];
    }
    if (queryParams.get("thirdLavelCatId")) {
      newFilters.thirdsubCatId = [queryParams.get("thirdLavelCatId")];
    }

    setFilters(newFilters);
  }, [location]);

  // ---------- FETCH FILTERED DATA ----------
  const filtersData = async () => {
    props.setIsLoading(true);
    try {
      const response = await postData(`/api/product/filter`, {
        ...filters,
        page: props.page,
      });
      props.setProducts(response);
      props.setTotalPages(response?.totalPages || 1);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      props.setIsLoading(false);
    }
  };

  // ---------- TRIGGER FILTER FETCH ----------
  useEffect(() => {
    filtersData();
  }, [
    filters.catId,
    filters.subCatId,
    filters.thirdsubCatId,
    filters.minPrice,
    filters.maxPrice,
    filters.rating,
    props.page,
  ]);

  // ---------- UI ----------
  return (
    <aside className="sidebar py-5">
      {/* -------- CATEGORY FILTER -------- */}
      <div className="box mb-3">
        <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center">
          Shop by Category
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            {context?.catData?.length > 0 &&
              context.catData.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item?._id}
                  control={<Checkbox size="small" />}
                  checked={filters.catId.includes(item?._id)}
                  label={item.name}
                  onChange={() => handleCheckboxChange("catId", item?._id)}
                  className="w-full"
                />
              ))}
          </div>
        </Collapse>
      </div>

      {/* -------- AVAILABILITY FILTER -------- */}
      <div className="box mb-3">
        <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center">
          Availability
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenAvailFilter(!isOpenAvailFilter)}
          >
            {isOpenAvailFilter ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Available (17)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="In Stock (17)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Not Available (1)"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      {/* -------- SIZE FILTER -------- */}
      <div className="box mb-3">
        <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center">
          Size
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
          >
            {isOpenSizeFilter ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            {["Small", "Medium", "Large", "XL", "XXL"].map((size, i) => (
              <FormControlLabel
                key={i}
                control={<Checkbox size="small" />}
                label={size}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* -------- PRICE FILTER -------- */}
      <div className="box mb-4">
        <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center">
          Filter By Price
        </h3>
        <RangeSlider
          value={price}
          onInput={setPrice}
          min={100}
          max={600000}
          step={5}
        />
        <div className="flex pt-4 pb-2 priceRanging justify-between">
          <span className="text-[13px]">
            From: <strong className="text-dark">Birr {price[0]}</strong>
          </span>
          <span className="text-[13px]">
            To: <strong className="text-dark">Birr {price[1]}</strong>
          </span>
        </div>
      </div>

      {/* -------- RATING FILTER -------- */}
      <div className="box mb-4">
        <h3 className="w-full pr-5 mb-3 text-[16px] font-[600] flex items-center">
          Filter By Rating
        </h3>
        <div className="flex items-center">
          <FormControlLabel
            value={5}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(5)}
            onChange={() => handleCheckboxChange("rating", 5)}
          />
          <Rating name="size-small" value={5} size="small" readOnly />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={4}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(4)}
            onChange={() => handleCheckboxChange("rating", 4)}
          />
          <Rating name="size-small" value={4} size="small" readOnly />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={3}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(3)}
            onChange={() => handleCheckboxChange("rating", 3)}
          />
          <Rating name="size-small" value={3} size="small" readOnly />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={2}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(2)}
            onChange={() => handleCheckboxChange("rating", 2)}
          />
          <Rating name="size-small" value={2} size="small" readOnly />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            value={1}
            control={<Checkbox size="small" />}
            checked={filters?.rating?.includes(1)}
            onChange={() => handleCheckboxChange("rating", 1)}
          />
          <Rating name="size-small" value={1} size="small" readOnly />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
