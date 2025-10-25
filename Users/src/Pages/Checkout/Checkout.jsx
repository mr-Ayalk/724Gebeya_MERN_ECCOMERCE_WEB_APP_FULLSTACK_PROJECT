// import TextField from "@mui/material/TextField";
// import { BsFillBagCheckFill } from "react-icons/bs";
// import Button from "@mui/material/Button";
// function Checkout() {
//   return (
//     <div className="py-10">
//       <div className="container flex gap-5">
//         <div className="leftCol w-[70%]">
//           <div className="card bg-white shadow-md p-5 rounded-md w-full">
//             <h1>Billing Details</h1>
//             <form action="" className="w-full mt-5">
//               <div className="flex  items-center gap-5 pb-5">
//                 <div className="col w-[50%]">
//                   <TextField
//                     className="w-full"
//                     label="Full Name"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>
//                 <div className="col w-[50%]">
//                   <TextField
//                     type="email"
//                     className="w-full"
//                     label="Email"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>
//               </div>

//               <h6 className="text-[14px] font-[500] mb-3">Street address</h6>

//               <div className="flex  items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="House No. and Street Name"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>
//               </div>
//               <div className="flex  items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="Apartment, suite,unit,etc.(optional)"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>
//               </div>

//               <div className="flex  items-center gap-5 pb-5">
//                 <div className="col w-[50%]">
//                   <TextField
//                     className="w-full"
//                     label="City"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>

//                 <div className="col w-[50%]">
//                   <TextField
//                     className="w-full"
//                     label="State"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>
//               </div>

//               <h6 className="text-[14px] font-[500] mb-3">Postcode/ZIP * </h6>

//               <div className="flex  items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="ZIP Code"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>
//               </div>
//               <div className="flex  items-center gap-5 pb-5">
//                 <div className="col w-[50%]">
//                   <TextField
//                     className="w-full"
//                     label="Phone Number"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>

//                 <div className="col w-[50%]">
//                   <TextField
//                     className="w-full"
//                     label="Email Address"
//                     variant="outlined"
//                     size="small"
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="rightCol w-[30%]">
//           <div className="card shadow-md bg-white p-5 rounded-md">
//             <h2 className="mb-4">Your Order</h2>
//             <div className="flex items-center justify-between py-3  border-t border-b border-[rgba(0,0,0,0.1)]">
//               <span className="text-[14px] font-[600]">Product</span>
//               <span className="text-[14px] font-[600]">Subtotal</span>
//             </div>

//             <div className="mb-5 scroll max-h-[250px] overflow-y-scroll overflow-x-hidden">
//               <div className="flex items-center justify-between py-2 pr-2">
//                 <div className="part1 flex items-center gap-3">
//                   <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
//                     <img
//                       src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
//                       alt=""
//                       className="w-full transition-all group-hover:scale-105 "
//                     />
//                   </div>

//                   <div className="info">
//                     <h4 className="text-[14px]">
//                       A-Line Kudsov with sh.......
//                     </h4>
//                     <span className="text-[13px]">Qty : 1</span>
//                   </div>
//                 </div>

//                 <span className="text-[14px] font-[500]">$345,555.00</span>
//               </div>
//             </div>

//             <Button className="btn-org btn-lg w-full flex gap-2 items-center">
//               <BsFillBagCheckFill className="text-[20px]" /> Checkout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;
import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetchDataFromApi, postData } from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [billing, setBilling] = useState({
    fullName: "",
    email: "",
    phone: "",
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("paypal"); // 'paypal' | 'chapa'
  const ctx = useContext(MyContext);
  const nav = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const res = await fetchDataFromApi("/api/cart/get");
    if (res?.data) setCartItems(res.data);
  };

  // const totalAmount = cartItems.reduce(
  //   (s, it) => s + it.quantity * (it.productId?.price || 0),
  //   0
  // );
  const totalAmount = 100;
  const submitOrder = async () => {
    // For PayPal: create order on server, redirect user to approval or use client SDK.
    if (paymentMethod === "paypal") {
      const createResp = await postData("/api/payment/paypal/create", {
        totalAmount,
        currency: "USD",
        items: cartItems.map((it) => ({
          ...it.productId,
          quantity: it.quantity,
        })),
      });
      if (createResp?.data?.id) {
        // Option A: capture right away (if you use client + approval flow you'd implement a client SDK approval step).
        // Here we assume server returns order id and the client uses PayPal Buttons or a redirect flow.
        // For simplicity, call capture on server (capture will require user to approve if using approval flow).
        // In production you usually send the client the order id and let PayPal JS SDK handle approval & capture.
        const capture = await postData("/api/payment/paypal/capture", {
          orderID: createResp.data.id,
        });
        if (capture?.data && capture.data.status === "COMPLETED") {
          // create order record in DB
          await postData("/api/order/create", {
            items: cartItems.map((it) => ({
              productId: it.productId._id,
              productTitle: it.productId.name,
              image: it.productId.images?.[0],
              price: it.productId.price,
              quantity: it.quantity,
            })),
            billingDetails: billing,
            payment: {
              method: "paypal",
              id: capture.data.id || createResp.data.id,
              status: capture.data.status,
              raw: capture.data,
            },
          });
          ctx.openAlertBox("success", "Payment successful and order placed");
          nav("/my-orders");
        } else {
          ctx.openAlertBox("error", "Payment not completed");
        }
      } else {
        ctx.openAlertBox(
          "error",
          createResp.message || "Failed to create PayPal order"
        );
      }
    } else if (paymentMethod === "chapa") {
      // Chapa initialization
      const chapaResp = await postData("/api/payment/chapa/init", {
        amount: totalAmount,
        currency: "ETB",
        email: billing.email,
        firstName: billing.fullName,
        lastName: "",
      });

      console.log("Chapa Response: ", chapaResp); // <-- put it here

      if (chapaResp?.data?.data?.checkout_url) {
        // redirect to chapa checkout hosted page
        window.location.href = chapaResp.data.data.checkout_url;
      } else {
        ctx.openAlertBox("error", "Failed to start Chapa checkout");
      }
    }
  };

  return (
    <div className="py-10">
      <div className="container flex gap-5">
        <div className="leftCol w-[70%]">
          <div className="card bg-white shadow-md p-5 rounded-md w-full">
            <h1>Billing Details</h1>
            <form
              className="w-full mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                submitOrder();
              }}
            >
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[50%]">
                  <TextField
                    label="Full Name"
                    size="small"
                    value={billing.fullName}
                    onChange={(e) =>
                      setBilling({ ...billing, fullName: e.target.value })
                    }
                    fullWidth
                  />
                </div>
                <div className="col w-[50%]">
                  <TextField
                    label="Email"
                    size="small"
                    value={billing.email}
                    onChange={(e) =>
                      setBilling({ ...billing, email: e.target.value })
                    }
                    fullWidth
                  />
                </div>
              </div>

              <div className="pb-5">
                <TextField
                  label="House No. and Street Name"
                  size="small"
                  value={billing.address_line1}
                  onChange={(e) =>
                    setBilling({ ...billing, address_line1: e.target.value })
                  }
                  fullWidth
                />
              </div>

              <div className="flex items-center gap-5 pb-5">
                <TextField
                  label="City"
                  size="small"
                  value={billing.city}
                  onChange={(e) =>
                    setBilling({ ...billing, city: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Pincode"
                  size="small"
                  value={billing.pincode}
                  onChange={(e) =>
                    setBilling({ ...billing, pincode: e.target.value })
                  }
                  fullWidth
                />
              </div>

              <div className="pt-4">
                <h3>Payment Method</h3>
                <div className="mt-3 flex gap-3">
                  <label>
                    <input
                      type="radio"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                    />{" "}
                    PayPal
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={paymentMethod === "chapa"}
                      onChange={() => setPaymentMethod("chapa")}
                    />{" "}
                    Chapa
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <Button type="submit" variant="contained">
                  Pay ${totalAmount.toFixed(2)}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="rightCol w-[30%]">
          <div className="card bg-white shadow-md p-5 rounded-md">
            <h3>Order Summary</h3>
            <div className="mt-3">
              {cartItems.map((it) => (
                <div
                  key={it._id}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    {it.productId.name} x {it.quantity}
                  </div>
                  <div>${(it.productId.price * it.quantity).toFixed(2)}</div>
                </div>
              ))}
              <hr className="my-3" />
              <div className="flex justify-between font-bold">
                Total: ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
