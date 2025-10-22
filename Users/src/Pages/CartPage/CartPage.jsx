// import Button from "@mui/material/Button";
// import { BsFillBagCheckFill } from "react-icons/bs";
// import CartItems from "./CartItems";

// function CartPage() {
//   return (
//     <section className="section py-10 pb-10">
//       <div className="container w-[80%] max-w-[80%] flex gap-5">
//         <div className="leftPart w-[70%]">
//           <div className="shadow-md rounded-md  bg-white">
//             <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
//               <h2>Your Cart</h2>
//               <p className="mt-0">
//                 There are <span className="font-bold text-primary">2 </span>{" "}
//                 products in your cart
//               </p>
//             </div>

//             <CartItems size="S" qty={1} />
//             <CartItems size="M" qty={3} />
//           </div>
//         </div>

//         <div className="rightPart w-[30%]">
//           <div className="shadow-md rounded-md bg-white p-5">
//             <h3 className="pb-3">Cart Totals</h3>
//             <hr />

//             <p className="flex items-center justify-between">
//               <span className="text-[14px] font-[500]">Subtotal</span>
//               <span className="text-primary font-bold">$1,344.666</span>
//             </p>
//             <p className="flex items-center justify-between">
//               <span className="text-[14px] font-[500]">Shipping</span>
//               <span className=" font-bold">Free</span>
//             </p>
//             <p className="flex items-center justify-between">
//               <span className="text-[14px] font-[500]">Estimated For</span>
//               <span className=" font-bold">Ethiopia</span>
//             </p>
//             <p className="flex items-center justify-between">
//               <span className="text-[14px] font-[500]">Total</span>
//               <span className="text-primary font-bold">$1,344.666</span>
//             </p>
//             <br />
//             <Button className="btn-org btn-lg w-full flex gap-2">
//               <BsFillBagCheckFill className="text-[20px]" />
//               Checkout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CartPage;
import React, { useEffect, useState, useContext, useMemo } from "react";
import Button from "@mui/material/Button";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(MyContext);
  const nav = useNavigate();

  const loadCart = async () => {
    setLoading(true);
    const res = await fetchDataFromApi("/api/cart/get");
    if (res?.data) setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQty = async (_id, qty) => {
    if (qty < 1) return;
    const res = await postData("/api/cart/update-qty", { _id, qty });
    if (res?.error === false) {
      await loadCart();
    } else {
      context.openAlertBox("error", res.message || "Could not update qty");
    }
  };

  const removeItem = async (productId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/cart/deleteCartItem`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accesstoken")
            ? `Bearer ${localStorage.getItem("accesstoken")}`
            : "",
        },
        body: JSON.stringify({ productId }),
      }
    ).then((r) => r.json());
    if (res?.error === false || res?.success) {
      context.openAlertBox("success", res.message || "Removed");
      await loadCart();
    } else {
      context.openAlertBox("error", res?.message || "Failed to remove");
    }
  };

  const subtotal = items.reduce(
    (s, it) => s + it.quantity * (it.productId?.price || 0),
    0
  );
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
  return (
    <section className="section py-10">
      <div className="container flex gap-5">
        <div className="leftPart w-[70%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b">
              <h2>Your Cart</h2>
              <p>
                There are{" "}
                <span className="font-bold text-primary">{items.length}</span>{" "}
                products in your cart
              </p>
            </div>

            {loading ? (
              <div className="p-4">Loading...</div>
            ) : items.length === 0 ? (
              <div className="p-4">Your cart is empty</div>
            ) : (
              items.map((it) => {
                const prod = it.productId || {};
                return (
                  <div
                    className="p-4 border-b flex items-center gap-4"
                    key={it._id}
                  >
                    <img
                      src={it?.image?.[0]?.url}
                      alt={it.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1">
                      <h4>{it.name}</h4>
                      <p className="text-sm">{it.brand}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="small"
                          onClick={() => updateQty(it._id, it.quantity - 1)}
                        >
                          -
                        </Button>
                        <span>{it.quantity}</span>
                        <Button
                          size="small"
                          onClick={() => updateQty(it._id, it.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        ${(it.price * it.quantity).toFixed(2)}
                      </div>
                      <Button size="small" onClick={() => removeItem(prod._id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="rightPart w-[30%]">
          <div className="shadow-md rounded-md bg-white p-5">
            <h3 className="pb-3">Cart Totals</h3>
            <hr />
            <p className="flex items-center justify-between mt-3">
              <span>Subtotal</span>
              <span className="text-primary font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </p>
            <p className="flex items-center justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </p>
            <p className="flex items-center justify-between mt-3 text-lg font-bold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </p>
            <Button
              fullWidth
              variant="contained"
              className="mt-4"
              onClick={() => nav("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
