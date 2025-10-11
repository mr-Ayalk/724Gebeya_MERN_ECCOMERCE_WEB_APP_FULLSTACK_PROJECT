import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import QtyBox from "../QtyBox/QtyBox";

function ProductDetailsComponent(props) {
  const [productActionIndex, setProductActionIndex] = useState(null);
  return (
    <div>
      <h1 className="text-[24px] font-[600] mb-2">{props?.data?.name}</h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-[13px]">
          Brands:
          <span className="font-[500] text-black opacity-75">
            {props?.data?.brand}
          </span>
        </span>
        <Rating
          name="size-small"
          defaultValue={props?.data?.rating}
          size="small"
          readOnly
        />
        <span className="text-[13px] cursor-pointer ">Review(5)</span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">
          ${props?.data?.oldPrice.toFixed(2)}
        </span>
        <span className="price  text-primary text-[20px] font-[600]">
          ${props?.data?.price.toFixed(2)}
        </span>
        <span className="text-[14px] ">
          Available In Stoke :{" "}
          <span className="text-green-600 text-[14px] font-bold">
            {props?.data?.countInStock} Items
          </span>
        </span>
      </div>

      <p className="mt-3 pr-10 mb-5">{props?.data?.description}</p>
      {props?.data?.productRam?.length !== 0 && (
        <div className="flex items-center gap-3 ">
          <span className="text-[16px]">RAMS:</span>
          <div className="flex items-center gap-1 actions">
            {props?.data?.productRam?.map((ram, index) => {
              return (
                <Button
                  className={`${
                    productActionIndex === index
                      ? "!bg-primary !text-white"
                      : ""
                  } `}
                  onClick={() => setProductActionIndex(index)}
                >
                  {ram}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      {props?.data?.productWeight?.length !== 0 && (
        <div className="flex items-center gap-3 ">
          <span className="text-[16px]">Product Weight:</span>
          <div className="flex items-center gap-1 actions">
            {props?.data?.productWeight?.map((weight, index) => {
              return (
                <Button
                  className={`${
                    productActionIndex === index
                      ? "!bg-primary !text-white"
                      : ""
                  } `}
                  onClick={() => setProductActionIndex(index)}
                >
                  {weight}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      {props?.data?.size?.length !== 0 && (
        <div className="flex items-center gap-3 ">
          <span className="text-[16px]">Size:</span>
          <div className="flex items-center gap-1 actions">
            {props?.data?.size?.map((size, index) => {
              return (
                <Button
                  className={`${
                    productActionIndex === index
                      ? "!bg-primary !text-white"
                      : ""
                  } `}
                  onClick={() => setProductActionIndex(index)}
                >
                  {size}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-[14px] mt-5 mb-2 text-[#000]">
        Free Shipping (Est.Delivery Time 203 Days)
      </p>

      <div className="flex items-center gap-4 py-4">
        <div className="qtyBoxWrapper w-[70px] ">
          <QtyBox />
        </div>

        <Button className="btn-org flex gap-2">
          <MdOutlineShoppingCart className="text-[22px]" /> Add to Cart
        </Button>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
          <FaRegHeart className="text-[18px]" />
          Add to Wishlist
        </span>
        <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
          <IoGitCompareOutline className="text-[18px]" />
          Add to Compare
        </span>
      </div>
    </div>
  );
}

export default ProductDetailsComponent;
