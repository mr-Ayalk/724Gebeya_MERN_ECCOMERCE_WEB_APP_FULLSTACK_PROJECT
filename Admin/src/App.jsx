import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import { createContext, forwardRef, useState } from "react";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignIn";
import Products from "./Components/Products/Products";
import AddProduct from "./Components/Products/AddProduct";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import toast, { Toaster } from "react-hot-toast";
import Slide from "@mui/material/Slide";
import { IoMdClose } from "react-icons/io";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddHomeSlide from "./Pages/HomeSliderBanners/AddHomeSlide";
import Category from "./Pages/Category";
import AddCategory from "./Pages/Category/AddCategory";
import SubCategoryList from "./Pages/Category/SubCategoryList";
import AddSubCategory from "./Pages/Category/AddSubCategory";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import VerifyAccount from "./Components/VerifyAccount/VerifyAccount";
import ChangePassword from "./Components/ChangePassword";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import Profile from "./Pages/Profile/Profile";
import AddAddress from "./Pages/Address/AddAddress";
import EditCategory from "./Pages/Category/editCategory";
import ProductDetails from "./Components/Products/productDetails";
import AddRAMS from "./Components/Products/addRAMS";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MyContext = createContext();
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIslogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token !== undefined && token !== null && token !== "") {
      setIslogin(true);
      fetchDataFromApi("/api/user/user-details").then((res) => {
        setUserData(res.data);

        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "You have not login") {
            localStorage.removeItem("accesstoken"); // ✅ fixed token key
            localStorage.removeItem("refreshToken");

            openAlertBox("error", "Your session is closed please login again");
            setIslogin(false);
            window.location.href = "/login";
          }
        }
      });
    }
  }, [isLogin]);
  useEffect(() => {
    getCat();
  }, []);
  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data);
    });
  };
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <Dashboard />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: <Login />,
    },
    {
      path: "/signup",
      exact: true,
      element: <SignUp />,
    },
    {
      path: "/forgot-password",
      exact: true,
      element: <ForgotPassword />,
    },
    {
      path: "/verify-account",
      exact: true,
      element: <VerifyAccount />,
    },
    {
      path: "/change-password",
      exact: true,
      element: <ChangePassword />,
    },
    {
      path: "/products",
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <Products />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/homeSlider/list",
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <HomeSliderBanners />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <Category />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/subcategory/list",
      exact: true,
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <SubCategoryList />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <Users />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <Orders />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <Profile />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <ProductDetails />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
    {
      path: "/product/addRams",
      exact: true,
      element: (
        // <MyContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <section className="main">
          <Header />
          <div className="contentMain flex">
            <div
              className={`overflow-hidden sidebarWrapper transition-all duration-500 ease-in-out 
    ${isSidebarOpen ? "w-[18%] " : "w-[0%] px-0 opacity-0"}`}
            >
              <Sidebar />
            </div>

            <div
              className={`contentRight !bg-gray-50 py-4 px-5 transition-all duration-500 ease-in-out ${
                isSidebarOpen ? "w-[82%] " : "w-[100%] "
              }`}
            >
              <AddRAMS />
            </div>
          </div>
        </section>
        // </MyContext.Provider>
      ),
    },
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIslogin,
    openAlertBox,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    userData,
    setUserData,
    address,
    setAddress,
    catData,
    setCatData,
    getCat,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
        <Toaster />

        {/* <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() =>
            setIsOpenFullScreenPanel({
              open: false,
            })
          }
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() =>
                  setIsOpenFullScreenPanel({
                    open: false,
                  })
                }
                aria-label="close"
              >
                <IoMdClose className="text-gray-800" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-gray-800">
                  {isOpenFullScreenPanel?.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
          {isOpenFullScreenPanel?.model === "Add Home Slide" && (
            <AddHomeSlide />
          )}
          {isOpenFullScreenPanel?.model === "Add New Category" && (
            <AddCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Sub Category" && (
            <AddSubCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}{" "}
          {isOpenFullScreenPanel?.model === "Edit Category" && <EditCategory />}
        </Dialog> */}
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext };
