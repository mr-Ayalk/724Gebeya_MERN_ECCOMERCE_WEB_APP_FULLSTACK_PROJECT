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
    const existingItem = context.cartData.find(
      (c) => c.productId === item._id
    );
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
    <div
      className="productItem rounded-md overflow-hidden border-[rgba(0,0,0,0.2)] shadow-sm border"
    >
      {/* Product Images */}
      <div className="group imgWrapper w-full rounded-md relative">
        <Link to={`/ProductDetails/${item?._id}`}>
          <div className="img h-[220px] overflow-hidden">
            <img
              src={item?.images?.[0]?.url}
              alt={item?.name || "Product"}
              className="w-full"
            />
            {item?.images?.[1]?.url && (
              <img
                src={item.images[1].url}
                alt="Product hover"
                className="w-full h-[85%] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"
              />
            )}
          </div>
        </Link>

        {/* Discount Badge */}
        {item?.discount > 0 && (
          <span className="discount flex items-center absolute top-[18px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
            {item.discount}% OFF
          </span>
        )}

        {/* Action Buttons */}
        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-800 group-hover:top-[15px]">
          <Tooltip title="Zoom" placement="left-start">
            <Button
              className="!w-[35px] !h-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white"
              onClick={() =>
                context.handleOpenProductDetailsModel(true, item)
              }
            >
              <MdZoomOutMap className="text-[18px]" />
            </Button>
          </Tooltip>

          <Tooltip title="Compare" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white">
              <IoGitCompareOutline className="text-[18px]" />
            </Button>
          </Tooltip>

          <Tooltip title="Like" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white">
              <FaRegHeart className="text-[18px]" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Product Info */}
      <div className="info p-1 py-3 relative pb-[50px] h-[220px]">
        <h6 className="text-[13px] font-[400]">
          <Link to={`/product/${item?._id}`} className="link transition-all">
            {item?.brand}
          </Link>
        </h6>

        <h3 className="text-[13px] title mt-1 font-[600] text-[#000]">
          <Link to={`/product/${item?._id}`} className="link transition-all">
            {item?.name?.substring(0, 30)}...
          </Link>
        </h3>

        <Rating
          name="size-small"
          value={item?.rating || 0}
          size="small"
          readOnly
        />

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px]">
            ${item?.oldPrice?.toFixed(2)}
          </span>
          <span className="price text-primary font-bold">
            ${item?.price?.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Section */}
        <div className="absolute bottom-[15px] left-0 pl-3 pr-3 w-full">
          {!isAdded ? (
            <Button
              className="btn-org btn-border flex w-full btn-sm gap-2"
              size="small"
              onClick={() =>
                addToCart(item, context?.userData?._id, quantity)
              }
            >
              <MdOutlineShoppingCart className="text-[18px]" />
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgb(0,0,0,0.1)]">
              <Button
                className="!min-w-[35px] !w-[35px] !h-[35px] bg-[#f1f1f1]"
                onClick={handleDecrease}
              >
                <FaMinus className="text-[rgba(0,0,0,0.7)]" />
              </Button>

              <span>{quantity}</span>

              <Button
                className="!min-w-[35px] !w-[35px] !h-[35px] !bg-primary !rounded-none"
                onClick={handleIncrease}
              >
                <FaPlus className="!text-white" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
