import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import QtyBox from "../QtyBox/QtyBox";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

function ProductDetailsComponent({ item }) {
  const context = useContext(MyContext);

  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!item) return null;

  // ✅ Add to Cart
  const handleAddToCart = async () => {
    if (!item?._id) return;
    setLoading(true);
    try {
      const body = {
        productId: item._id,
        quantity,
        price: item.price,
      };
      const res = await postData("/api/cart/addToCart", body);
      if (res?.success || res?.error === false) {
        context.openAlertBox("Product added to cart successfully!", "success");
      } else {
        context.openAlertBox("Failed to add product to cart", "error");
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox("Error adding to cart", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add to Wishlist
  const handleAddToWishlist = async () => {
    try {
      const body = { productId: item._id };
      const res = await postData("/api/myList/addToWishlist", body);
      if (res?.success || res?.error === false) {
        context.openAlertBox("Added to wishlist!", "success");
      } else {
        context.openAlertBox("Failed to add to wishlist", "error");
      }
    } catch (err) {
      context.openAlertBox("Error adding to wishlist", "error");
    }
  };

  return (
    <div className="text-[#111]">
      {/* 🏷️ Product Title */}
      <h1 className="text-[24px] font-[600] mb-2">
        {item?.name || "Product Name"}
      </h1>

      {/* ⭐ Brand + Rating */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-gray-500 text-[13px]">
          Brand:
          <span className="font-[500] text-black opacity-75 ml-1">
            {item?.brand || "N/A"}
          </span>
        </span>
        <Rating
          name="size-small"
          defaultValue={Number(item?.rating) || 0}
          precision={0.5}
          size="small"
          readOnly
        />
        <span className="text-[13px] cursor-pointer text-primary">
          {`Review (${item?.numReviews || 0})`}
        </span>
      </div>

      {/* 💰 Price Section */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        {item?.oldPrice && (
          <span className="line-through text-gray-500 text-[18px] font-[500]">
            ${item?.oldPrice?.toFixed(2)}
          </span>
        )}
        <span className="text-primary text-[22px] font-[700]">
          ${item?.price?.toFixed(2) || "0.00"}
        </span>
        <span className="text-[14px]">
          In Stock:{" "}
          <span
            className={`${
              item?.countInStock > 0 ? "text-green-600" : "text-red-600"
            } font-bold`}
          >
            {item?.countInStock || 0} Items
          </span>
        </span>
      </div>

      {/* 🧾 Product Description */}
      <p className="mt-3 pr-6 mb-5 text-gray-700 leading-relaxed">
        {item?.description || "No description available for this product."}
      </p>

      {/* 📏 Product Options (RAM, Weight, Size) */}
      {Array.isArray(item?.productRam) && item.productRam.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-[16px] font-medium">RAM:</span>
          {item.productRam.map((ram, index) => (
            <Button
              key={index}
              className={`!text-[14px] ${
                selectedOption === `ram-${index}`
                  ? "!bg-primary !text-white"
                  : "!bg-gray-100"
              }`}
              onClick={() => setSelectedOption(`ram-${index}`)}
            >
              {ram}
            </Button>
          ))}
        </div>
      )}

      {Array.isArray(item?.productWeight) && item.productWeight.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-[16px] font-medium">Weight:</span>
          {item.productWeight.map((w, index) => (
            <Button
              key={index}
              className={`!text-[14px] ${
                selectedOption === `weight-${index}`
                  ? "!bg-primary !text-white"
                  : "!bg-gray-100"
              }`}
              onClick={() => setSelectedOption(`weight-${index}`)}
            >
              {w}
            </Button>
          ))}
        </div>
      )}

      {Array.isArray(item?.size) && item.size.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-[16px] font-medium">Size:</span>
          {item.size.map((s, index) => (
            <Button
              key={index}
              className={`!text-[14px] ${
                selectedOption === `size-${index}`
                  ? "!bg-primary !text-white"
                  : "!bg-gray-100"
              }`}
              onClick={() => setSelectedOption(`size-${index}`)}
            >
              {s}
            </Button>
          ))}
        </div>
      )}

      {/* 🚚 Shipping Info */}
      <p className="text-[14px] mt-4 mb-2 text-gray-600">
        Free Shipping (Estimated Delivery: {item?.createdAt.split("T")[0]} Days )
      </p>

      {/* 🛒 Quantity & Add to Cart */}
      <div className="flex items-center gap-4 py-4">
        <div className="w-[80px]">
          <QtyBox value={quantity} setValue={setQuantity} />
        </div>

        <Button
          disabled={loading || item?.countInStock === 0}
          onClick={handleAddToCart}
          className="btn-org flex items-center gap-2"
        >
          <MdOutlineShoppingCart className="text-[22px]" />
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>

      {/* ❤️ Wishlist & Compare */}
      <div className="flex items-center gap-4 mt-4">
        <span
          onClick={handleAddToWishlist}
          className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]"
        >
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
