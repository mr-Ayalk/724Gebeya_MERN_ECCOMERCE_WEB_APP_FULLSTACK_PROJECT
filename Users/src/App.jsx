import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import ProductListing from "./Pages/ProductListing/ProductListing";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import { createContext, useState } from "react";
import ProductZoom from "./components/ProductZoom/ProductZoom";
import { IoCloseSharp } from "react-icons/io5";
import ProductDetailsComponent from "./components/ProductDetailsComponent/ProductDetailsComponent";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import CartPage from "./Pages/CartPage/CartPage";
import Verify from "./Pages/Verify/Verify";
import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Checkout from "./Pages/Checkout/Checkout";
import MyAccount from "./Pages/MyAccount/MyAccount";
import MyList from "./Pages/MyList/MyList";
import Orders from "./Pages/Orders/Orders";
import { fetchDataFromApi, postData } from "./utils/api";
import Address from "./Pages/MyAccount/address";

const MyContext = createContext();
function App() {
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState({
    open: false,
    item: {},
  });
  const [maxWidth, setMaxWidth] = useState("md");
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
      // console.log("Ashenafi");
    });
  }, []);
  const apiUrl = import.meta.env.VITE_API_URL;
  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");

    if (!token) {
      setIsLogin(false);
      return;
    }

    fetchDataFromApi("/api/user/user-details")
      .then((res) => {
        if (res?.error === false) {
          setIsLogin(true);
          setUserData(res.data);
          getCartItems();
          return;
        }

        const message = res?.response?.data?.message;
        if (message === "You have not login" || res?.response?.status === 401) {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshToken");
          setIsLogin(false);
          openAlertBox(
            "error",
            "Your session has expired. Please login again."
          );
          window.location.replace("/login");
        }
      })
      .catch(() => {
        setIsLogin(false);
        window.location.replace("/login");
      });
  }, []); // ✅ remove isLogin dependency

  // useEffect(() => {
  //   const token = localStorage.getItem("accesstoken");
  //   if (token !== undefined && token !== null && token !== "") {
  //     setIsLogin(true);
  //     fetchDataFromApi("/api/user/user-details").then((res) => {
  //       setUserData(res.data);

  //       if (res?.response?.data?.error === true) {
  //         if (res?.response?.data?.message === "You have not login") {
  //           localStorage.removeItem("accesstoken"); // ✅ fixed token key
  //           localStorage.removeItem("refreshToken");

  //           openAlertBox("error", "Your session is closed please login again");
  //           setIsLogin(false);
  //           window.location.href = "/login";
  //         }
  //       }
  //     });
  //     getCartItems();
  //     console.log("cart data", cartData);
  //   }
  // }, [isLogin]);
  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel({
      open: false,
      item: {},
    });
  };
  const handleOpenProductDetailsModel = (status, item) => {
    setOpenProductDetailsModel({
      open: status,
      item: item,
    });
  };
  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };
  const addToCart = (product, userId, quantity) => {
    // console.log(product, userId);
    // console.log(catData);
    // console.log(userData);
    if (userId === undefined) {
      openAlertBox("error", "You are not login Please login first.");
      return false;
    }
    const data = {
      productTitle: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      userId: userId,
    };
    postData("/api/cart/add", data).then((res) => {
      if (res?.error === false) {
        openAlertBox("success", res?.message);
        getCartItems();
      } else {
        openAlertBox("error", res?.message);
      }
    });
  };
  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    });
  };
  const values = {
    setOpenProductDetailsModel,
    handleOpenProductDetailsModel,
    handleCloseProductDetailsModel,
    setOpenCartPanel,
    openCartPanel,
    toggleCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    catData,
    addToCart,
    setCatData,
    cartData,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/category/:id"} element={<ProductListing />} />
            <Route path={"/ProductDetails/:id"} element={<ProductDetails />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/cart"} element={<CartPage />} />
            <Route path={"/verify"} element={<Verify />} />
            <Route path={"/forgot-password"} element={<ForgotPassword />} />
            <Route path={"/checkout"} element={<Checkout />} />
            <Route path={"/my-account"} element={<MyAccount />} />
            <Route path={"/my-list"} element={<MyList />} />
            <Route path={"/my-orders"} element={<Orders />} />
            <Route path={"/my-address"} element={<Address />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
      <Toaster />
      <Dialog
        open={openProductDetailsModel.open}
        onClose={handleCloseProductDetailsModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]"
              onClick={handleCloseProductDetailsModel}
            >
              <IoCloseSharp className="text-[20px]" />
            </Button>
            {openProductDetailsModel?.item &&
              Object.keys(openProductDetailsModel.item).length > 0 && (
                <>
                  <div className="col1  px-3">
                    <ProductZoom
                      images={openProductDetailsModel?.item?.images}
                    />
                  </div>

                  <div className="col2  py-8 px-8 pr-16 productContent">
                    <ProductDetailsComponent
                      data={openProductDetailsModel?.item}
                    />
                  </div>
                </>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
export { MyContext };
