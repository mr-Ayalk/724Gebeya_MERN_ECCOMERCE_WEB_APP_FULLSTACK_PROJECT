import { useContext, useState, useEffect } from "react";
import "../ProductItem/ProductItem.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { MyContext } from "../../App";
import { deleteData, editData } from "../../utils/api";

function ProductItem({ item }) {
  const context = useContext(MyContext);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  // ✅ Add product to cart
  const addToCart = (product, userId, qty) => {
    if (!userId) {
      context.openAlertBox("error", "Please log in to add items to cart");
      return;
    }
    context.addToCart(product, userId, qty);
    setIsAdded(true);
  };

  // ✅ Sync cart data from context
  useEffect(() => {
    if (!context?.cartData || !item?._id) return;
    const existingItem = context.cartData.find((c) => c.productId === item._id);
    if (existingItem) {
      setCartItem(existingItem);
      setQuantity(existingItem.qty || 1);
      setIsAdded(true);
    } else {
      setCartItem(null);
      setIsAdded(false);
    }
  }, [context?.cartData, item?._id]);

  // ✅ Handle quantity decrease
  const handleDecrease = async () => {
    if (!cartItem) return;

    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      const obj = {
        _id: cartItem._id,
        qty: newQty,
        subTotal: item.price * newQty,
      };
      await editData(`/api/cart/update-qty`, obj);
    } else {
      // Remove item from cart
      const res = await deleteData(`/api/cart/deleteCartItem/${cartItem._id}`);
      context.openAlertBox("success", res?.message || "Item removed from cart");
      setIsAdded(false);
      setCartItem(null);
      setQuantity(1);
    }
  };

  // ✅ Handle quantity increase
  const handleIncrease = async () => {
    if (!cartItem) return;
    const newQty = quantity + 1;
    setQuantity(newQty);
    const obj = {
      _id: cartItem._id,
      qty: newQty,
      subTotal: item.price * newQty,
    };
    await editData(`/api/cart/update-qty`, obj);
  };

  return (
    <div className="productItem rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md bg-white transition-all duration-300 hover:-translate-y-1 ">
      {/* Product Images */}
      <div className="group imgWrapper relative rounded-lg overflow-hidden">
        <Link to={`/ProductDetails/${item?._id}`}>
          <div className="img h-[210px] sm:h-[240px] overflow-hidden relative">
            <img
              src={item?.images?.[0]?.url}
              alt={item?.name || "Product"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {item?.images?.[1]?.url && (
              <img
                src={item.images[1].url}
                alt="Product hover"
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-125"
              />
            )}
          </div>
        </Link>

        {/* Discount Badge */}
        {item?.discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-md shadow-md font-semibold">
            {item.discount}% OFF
          </span>
        )}

        {/* Action Buttons */}
        <div className="actions absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Tooltip title="Quick View" placement="left-start">
            <Button
              onClick={() => context.handleOpenProductDetailsModel(true, item)}
              className="!w-10 !h-10 bg-white shadow hover:!bg-primary hover:text-white transition-all !rounded-full"
            >
              <MdZoomOutMap size={18} />
            </Button>
          </Tooltip>

          <Tooltip title="Compare" placement="left-start">
            <Button className="!w-10 !h-10 bg-white shadow hover:!bg-primary hover:text-white transition-all !rounded-full">
              <IoGitCompareOutline size={18} />
            </Button>
          </Tooltip>

          <Tooltip title="Wishlist" placement="left-start">
            <Button className="!w-10 !h-10 bg-white shadow hover:!bg-primary hover:text-white transition-all !rounded-full">
              <FaRegHeart size={18} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Product Info */}
      <div className="info p-3 sm:p-4 relative pb-[55px]">
        <p className="text-xs text-gray-500 capitalize tracking-wide">
          {item?.brand?.substring(0, 10)}...
        </p>

        <h3 className="text-sm sm:text-base font-semibold mt-1 text-black leading-tight">
          {item?.name?.substring(0, 13)}...
        </h3>

        <Rating name="rating" value={item?.rating || 0} size="small" readOnly />

        <div className="flex items-center gap-3 mt-1">
          {item?.oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${item.oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-primary font-bold text-base">
            ${item?.price?.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart */}
        <div className="absolute left-0 bottom-2 w-full px-3">
          {!isAdded ? (
            <Button
              onClick={() => addToCart(item, context?.userData?._id, quantity)}
              className="w-full !bg-primary !text-white !rounded-full !py-2 hover:opacity-90 flex items-center justify-center gap-2 text-sm font-medium"
            >
              <MdOutlineShoppingCart size={18} />
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between px-2 py-1 rounded-full border border-gray-300 bg-gray-50">
              <Button
                onClick={handleDecrease}
                className="!min-w-8 !w-8 !h-8 !bg-gray-200 !rounded-full flex items-center justify-center hover:bg-gray-300"
              >
                <FaMinus size={12} />
              </Button>

              <span className="font-medium text-sm">{quantity}</span>

              <Button
                onClick={handleIncrease}
                className="!min-w-8 !w-8 !h-8 !bg-primary !rounded-full flex items-center justify-center hover:bg-primary/90"
              >
                <FaPlus size={12} className="text-white" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
