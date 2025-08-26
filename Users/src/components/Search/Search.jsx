import "../Search/Search.css";
import { FaSearch } from "react-icons/fa";
import Button from "@mui/material/Button";
function Search() {
  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
      />
      <Button
        variant=""
        className="!absolute top-[8px] right-[5px] z-50 !w-[45px] !min-w-[37px] !min-w-[37px] h-[37px] !rounded-full text-black "
      >
        <FaSearch className="text-[#2a2a2a] text-[22px]" />
      </Button>
    </div>
  );
}

export default Search;
