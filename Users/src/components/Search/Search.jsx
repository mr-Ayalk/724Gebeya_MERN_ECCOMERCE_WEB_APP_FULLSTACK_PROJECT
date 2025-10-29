import { FaSearch } from "react-icons/fa";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";
import { Button } from "@mui/material";
import { IoSearch } from "react-icons/io5";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   const trimmedQuery = query.trim();
  //   if (!trimmedQuery) return;

  //   try {
  //     const res = await fetchDataFromApi(
  //       `/api/product/search?query=${trimmedQuery}`
  //     );
  //     const products = res?.products || [];
  //     navigate(`/search?query=${trimmedQuery}`, { state: { products } });
  //   } catch (err) {
  //     console.error(err);
  //     navigate(`/search?query=${trimmedQuery}`, { state: { products: [] } });
  //   }
  // };

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
    const obj = {
      page: 1,
      limit: 30,
      query: e.target.value,
    };
    if (e.target.value !== "") {
      postData(`/api/product/search/get`, obj).then((res) => {
        // console.log(res);
        context.setSearchData(res);
      });
    }
  };
  const search = () => {
    navigate("/search");
  };
  return (
    <form
      // onSubmit={handleSearch}
      className="relative flex items-center w-full bg-gray-100 rounded-lg px-3 py-2"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={onChangeInput}
        className="w-full bg-transparent outline-none text-sm"
      />
      <Button
        type="submit"
        className="absolute right-2 text-gray-500 hover:text-black"
        onClick={search}
      >
        <IoSearch className="text-[#2a2a2ad2] text-[22px] font-thin" />
      </Button>
    </form>
  );
}

export default Search;
