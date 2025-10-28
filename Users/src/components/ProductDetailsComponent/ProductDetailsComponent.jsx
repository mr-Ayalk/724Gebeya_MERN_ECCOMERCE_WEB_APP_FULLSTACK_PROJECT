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

  const handleAddToCart = async () => {
    if (!item?._id) return;
    setLoading(true);
    try {
      const body = { productId: item._id, quantity, price: item.price };
      const res = await postData("/api/cart/addToCart", body);
      context.openAlertBox(
        res?.success || res?.error === false
          ? "Product added to cart successfully!"
          : "Failed to add product to cart",
        res?.success ? "success" : "error"
      );
    } catch {
      context.openAlertBox("Error adding to cart", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const res = await postData("/api/myList/addToWishlist", {
        productId: item._id,
      });
      context.openAlertBox(
        res?.success || res?.error === false ? "Added to wishlist!" : "Failed to add to wishlist",
        res?.success ? "success" : "error"
      );
    } catch {
      context.openAlertBox("Error adding to wishlist", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* 🏷️ Product Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        {item?.name || "Product Name"}
      </h1>

      {/* ⭐ Brand + Rating */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span className="text-gray-500 text-sm">
          Brand: <span className="font-semibold text-gray-800">{item?.brand || "N/A"}</span>
        </span>
        <Rating
          name="size-small"
          defaultValue={Number(item?.rating) || 0}
          precision={0.5}
          size="small"
          readOnly
        />
        <span className="text-sm text-primary cursor-pointer">{`Review (${item?.numReviews || 0})`}</span>
      </div>

      {/* 💰 Price Section */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        {item?.oldPrice && (
          <span className="text-gray-400 text-xl line-through">${item?.oldPrice?.toFixed(2)}</span>
        )}
        <span className="text-3xl font-extrabold text-primary">${item?.price?.toFixed(2)}</span>
        <span
          className={`text-sm font-semibold ${
            item?.countInStock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {item?.countInStock > 0 ? `In Stock: ${item.countInStock}` : "Out of Stock"}
        </span>
      </div>

      {/* 🧾 Product Description */}
      <p className="text-gray-700 leading-relaxed mb-5">{item?.description || "No description available."}</p>

      {/* 📏 Product Options */}
      <div className="flex flex-wrap gap-4 mb-4">
        {item?.productRam?.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-medium">RAM:</span>
            {item.productRam.map((ram, index) => (
              <Button
                key={index}
                variant={selectedOption === `ram-${index}` ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => setSelectedOption(`ram-${index}`)}
              >
                {ram?.name || ram}
              </Button>
            ))}
          </div>
        )}
        {item?.productWeight?.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Weight:</span>
            {item.productWeight.map((w, index) => (
              <Button
                key={index}
                variant={selectedOption === `weight-${index}` ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => setSelectedOption(`weight-${index}`)}
              >
                {w}
              </Button>
            ))}
          </div>
        )}
        {item?.size?.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Size:</span>
            {item.size.map((s, index) => (
              <Button
                key={index}
                variant={selectedOption === `size-${index}` ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => setSelectedOption(`size-${index}`)}
              >
                {s?.label || s?.size || s}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* 🚚 Shipping Info */}
      <p className="text-gray-600 text-sm mb-4">
        Free Shipping (Estimated Delivery: {item?.createdAt?.split("T")[0]} Days)
      </p>

      {/* 🛒 Quantity & Add to Cart */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <div className="w-24">
          <QtyBox value={quantity} setValue={setQuantity} />
        </div>
        <Button
          disabled={loading || item?.countInStock === 0}
          onClick={handleAddToCart}
          className="flex items-center gap-2 px-6 py-3 text-white bg-primary hover:bg-primary-dark rounded-lg shadow-md transition"
        >
          <MdOutlineShoppingCart className="text-2xl" />
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>

      {/* ❤️ Wishlist & Compare */}
      <div className="flex items-center gap-6">
        <span
          onClick={handleAddToWishlist}
          className="flex items-center gap-2 text-primary cursor-pointer font-medium hover:text-primary-dark transition"
        >
          <FaRegHeart className="text-xl" /> Add to Wishlist
        </span>
        <span className="flex items-center gap-2 text-gray-600 cursor-pointer font-medium hover:text-gray-800 transition">
          <IoGitCompareOutline className="text-xl" /> Add to Compare
        </span>
      </div>
    </div>
  );
}

export default ProductDetailsComponent;
