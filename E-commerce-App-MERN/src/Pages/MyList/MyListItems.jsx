import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button"
import { Rating } from "@mui/material";

function MyListItems() {
  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
        <div className="img w-[15%] rounded-md overflow-hidden">
          <Link to="/product/5554" className="group">
            <img
              src="https://avatars.githubusercontent.com/u/180521240?v=4"
              alt=""
              className="w-full group-hover:scale-105 transition-all"
            />
          </Link>
        </div>

        <div className="info w-[85%] relative">
          <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all" />
          <span className="text-[13px]">Sangrila</span>
          <h3 className="text-[15px]">
            <Link className="link">A line sllhdl lsidl slighsolvml</Link>
          </h3>
          <Rating name="size-small" defaultValue={4} size="small" readOnly />

          <div className="flex items-center gap-4 mt-2 mb-2">
            <span className="price text-[14px] font-[600]">$55.77</span>
            <span className="oldPrice line-through text-gray-500  text-[14px] font-[600]">
              $55.77
            </span>
            <span className="price text-primary  text-[14px] font-[600]">
              55% OFF
            </span>
          </div>

          <Button className="btn-org btn-sm ">Add to Cart</Button>
        </div>
      </div>
    </>
  );
}

export default MyListItems;
