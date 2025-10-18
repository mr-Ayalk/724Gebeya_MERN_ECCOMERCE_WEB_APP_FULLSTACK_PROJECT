import { useContext } from "react";
import "../ProductItem/ProductItem.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import {
  MdOutlineShop,
  MdOutlineShoppingCart,
  MdZoomOutMap,
} from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { MyContext } from "../../App";
function ProductItem(props) {
  const context = useContext(MyContext);

  return (
    <div
      className="productItem rounded-md overflow-hidden  border-[rgba(0,0,0,0.2)] shadow-sm "
      style={{
        borderWidth: 1,
      }}
    >
      <div className="group imgWrapper w-[100%]   rounded-md relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img h-[220px] overflow-hidden">
            <img
              src={props?.item?.images[0]?.url}
              alt="  "
              className="w-full"
            />
            <img
              src={props?.item?.images[1]?.url}
              alt="  "
              className="w-full h-[85%] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"
            />
          </div>
        </Link>
        <span className="discount flex items-center absolute top-[18px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
          {props?.item?.discount}% OFF
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-800 group-hover:top-[15px]">
          <Tooltip title="Zoom" placement="left-start">
            <Button
              className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white  group"
              onClick={() =>
                context.handleOpenProductDetailsModel(true, props?.item)
              }
            >
              <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            </Button>
          </Tooltip>
          <Tooltip title="Compare" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white  group">
              <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            </Button>
          </Tooltip>
          <Tooltip title="Like" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white  group">
              <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="info p-1 py-3 relative pb-[50px] h-[220px]">
        <h6 className="text-[13px] !font-[400]">
          <Link
            to={`/product/${props?.item?._id}`}
            className="link transition-all"
          >
            {props?.item?.brand}
          </Link>
        </h6>
        <h3 className="text-[13px] title mt-1 font-[600] text-[#000]">
          <Link
            to={`/product/${props?.item?._id}`}
            className="link transition-all"
          >
            {props?.item?.name.substring(0, 30)}...
          </Link>
        </h3>
        <Rating
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
        />

        <div className="flex z-[50] items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px]">
            ${props?.item?.oldPrice.toFixed(2)}
          </span>
          <span className="price text-primary font-bold">
            {" "}
            ${props?.item?.price.toFixed(2)}
          </span>
        </div>
        <div className="!absolute bottom-[15px] left-0 pl-3 pr-3 w-full">
          <Button
            className="btn-org btn-border flex w-full btn-sm gap-2 "
            size="small"
          >
            <MdOutlineShoppingCart className="text-[18px]" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
