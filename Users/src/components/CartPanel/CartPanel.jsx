// import { Button } from "@mui/material";
// import { useContext } from "react";
// import { MdOutlineDeleteOutline } from "react-icons/md";
// import { Link } from "react-router-dom";
// import MyAccount from "../../Pages/MyAccount/MyAccount";

// function CartPanel() {
//   const context = useContext(MyAccount);
//   return (
//     <>
//       <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4">
//         {context?.cartData?.length !== 0 &&
//           context?.cartData?.map((item, index) => {
//             return (
//               <div
//                 className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4"
//                 key={index}
//               >
//                 <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
//                   <Link to="/product/45875" className="block group">
//                     <img
//                       src={context?.cartData?.image[0].url}
//                       alt=""
//                       className="w-full group-hover:scale-105"
//                     />
//                   </Link>
//                 </div>
//                 <div className="info w-[75%] pr-5 relative">
//                   <Link to="/product/5433" className="link transition-all">
//                     <h4 className="text-[16px] font-[500] ">
//                       A-Line Kurti with sharara &Dupatta
//                     </h4>
//                   </Link>

//                   <p className="flex items-center gap-5 mt-2 mb-2">
//                     <span>
//                       Qty: <span>2</span>
//                     </span>
//                     <span className="text-primary font-bold">Price : $25</span>
//                   </p>
//                   <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all" />
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//       <br />

//       <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5">
//         <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col ">
//           <div className="flex items-center justify-between w-full">
//             <span className="text-[14px] font-[600]">2 item</span>
//             <span className="text-primary font-bold">$66.00</span>
//           </div>
//           <div className="flex items-center justify-between w-full">
//             <span className="text-[14px] font-[600]">Shipping</span>
//             <span className="text-primary font-bold">$69.00</span>
//           </div>
//         </div>
//         <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col ">
//           <div className="flex items-center justify-between w-full">
//             <span className="text-[14px] font-[600]">Total (tax excl.)</span>
//             <span className="text-primary font-bold">$646.00</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between w-full gap-5">
//           <Link to="/cart" className="w-[50%] d-block">
//             <Button className="btn-org btn-lg w-full">View Cart</Button>
//           </Link>

//           <Link to="/checkout" className="w-[50%] d-block">
//             <Button className="btn-org btn-border btn-lg w-full">
//               Checkout
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CartPanel;
import React, { useContext, useMemo } from "react";
import { Button, Tooltip } from "@mui/material";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";

function CartPanel() {
  const context = useContext(MyContext);

  // Compute totals safely using useMemo (performance)
  const { totalItems, totalAmount } = useMemo(() => {
    const totalItems = context?.cartData?.reduce(
      (acc, item) => acc + (item?.quantity || 0),
      0
    );
    const totalAmount = context?.cartData?.reduce(
      (acc, item) => acc + (item?.subTotal || 0),
      0
    );
    return { totalItems, totalAmount };
  }, [context?.cartData]);

  // Delete a cart item
  const handleDelete = async (id) => {
    try {
      const res = await deleteData(`/api/cart/deleteCartItem/${id}`);
      if (res?.error === false) {
        context.openAlertBox("success", res?.message);
        context?.fetchDataFromApi && context?.fetchDataFromApi(); // optional refresh
        context?.setCartData(
          context.cartData.filter((item) => item._id !== id)
        );
      } else {
        context.openAlertBox("error", res?.message || "Failed to delete item");
      }
    } catch (err) {
      context.openAlertBox("error", "An error occurred while deleting item");
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* CART ITEMS */}
      <div className="scroll w-full max-h-[350px] overflow-y-auto py-3 px-4">
        {context?.cartData?.length > 0 ? (
          context.cartData.map((item, index) => (
            <div
              key={item._id || index}
              className="cartItem w-full flex items-center gap-3 border-b border-[rgba(0,0,0,0.1)] pb-3 mb-3"
            >
              <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                <Link
                  to={`/ProductDetails/${item?.productId}`}
                  className="block group"
                >
                  <img
                    src={item?.image?.[0]?.url}
                    alt={item?.productTitle}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>
              <div className="info w-[70%] relative pr-6">
                <Link
                  to={`/ProductDetails/${item?.productId}`}
                  className="link transition-all"
                >
                  <h4 className="text-[14px] font-[500] mb-1 truncate">
                    {item?.productTitle}
                  </h4>
                </Link>
                <p className="text-[13px] text-gray-600">
                  Qty: <span>{item?.quantity}</span>
                </p>
                <p className="text-[14px] font-semibold text-primary">
                  ${item?.subTotal?.toFixed(2)}
                </p>
                <Tooltip title="Remove" placement="left">
                  <MdOutlineDeleteOutline
                    onClick={() => handleDelete(item?._id)}
                    className="absolute top-[5px] right-[5px] cursor-pointer text-[20px] hover:text-red-500 transition-colors"
                  />
                </Tooltip>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            🛒 Your cart is empty
          </div>
        )}
      </div>

      {/* TOTALS + BUTTONS */}
      {context?.cartData?.length > 0 && (
        <div className="bottomSec border-t border-[rgba(0,0,0,0.1)] px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-[600]">Items:</span>
            <span className="text-primary font-bold">{totalItems}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-[600]">Subtotal:</span>
            <span className="text-primary font-bold">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between w-full gap-4 mt-3">
            <Link to="/cart" className="w-[50%]">
              <Button className="btn-org btn-lg w-full">View Cart</Button>
            </Link>
            <Link to="/checkout" className="w-[50%]">
              <Button className="btn-org btn-border btn-lg w-full">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPanel;
