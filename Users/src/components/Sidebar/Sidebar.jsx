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
      rating: [],
      page: 1,
      limit: 25,
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
    context?.setSearchData([]);
  }, [location]);

  // ---------- FETCH FILTERED DATA ----------
  // const filtersData = async () => {
  //   props.setIsLoading(true);
  //   try {
  //     const response = await postData(`/api/product/filter`, {
  //       ...filters,
  //       page: props.page,
  //     });
  //     props.setProducts(response);
  //     props.setTotalPages(response?.totalPages || 1);
  //     window.scrollTo(0, 0);
  //   } catch (error) {
  //     console.error("Error fetching filtered products:", error);
  //   } finally {
  //     props.setIsLoading(false);
  //   }
  // };
  const filtersData = () => {
    props.setIsLoading(true);

    if (context?.searchData?.products?.length > 0) {
      props.setProductsData(context?.searchData);
      props.setIsLoading(false);
      props.setTotalPages(context?.searchData?.totalPages);
      window.scrollTo(0, 0);
    } else {
      postData("/api/product/filter", filters).then((res) => {
        props.setProducts(res);
        props.setIsLoading(false);
        props.setTotalPages(res?.totalPages || 1);
        window.scrollTo(0, 0);
      });
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
    <aside className="sidebar py-5 ">
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
