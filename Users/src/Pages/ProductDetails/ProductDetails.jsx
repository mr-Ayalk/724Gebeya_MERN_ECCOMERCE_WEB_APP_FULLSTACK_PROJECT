import Breadcrumbs from "@mui/material/Breadcrumbs";
import Rating from "@mui/material/Rating";
import { Link, Navigate, useParams } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom/ProductZoom";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { editData, fetchDataFromApi, postData } from "../../utils/api";
import ProductLoading from "../../components/ProductLoading/ProductLoading";
import { MyContext } from "../../App";

function ProductDetails() {
  const { id } = useParams();
  const context = useContext(MyContext);

  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    review: "",
  });
  // ✅ Fetch Product Details
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetchDataFromApi(`/api/product/${id}`);
        if (res && res.product) {
          setProductData(res.product);
          // Fetch related products by category ID
          if (res.product.catId) {
            fetchRelatedProducts(res.product.catId);
          }
        } else {
          console.error("No product found:", res);
        }
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRelatedProducts = async (catId) => {
      try {
        const res = await fetchDataFromApi(
          `/api/product/getAllProductsByCatId/${catId}`
        );
        if (Array.isArray(res?.products)) {
          setRelatedProducts(res.products);
        }
      } catch (err) {
        console.error("Related products fetch error:", err);
      }
    };

    fetchProduct();
  }, [id]);
  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userData]);
  if (isLoading) return <ProductLoading />;
  if (!productData)
    return (
      <div className="container py-10 text-center text-gray-500">
        <h3>Product not found</h3>
      </div>
    );
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: e.target.value,
      };
    });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   if (formFields.review.trim() === "") {
  //     context.openAlertBox("error", "Review is required");
  //     setIsLoading(false);
  //     return;
  //   }

  //   // ✅ Make sure formFields.images is an array of objects [{url, public_id}, ...]
  //   postData("/api/product/create", {
  //     review: formFields.review,
  //   }).then((res) => {
  //     if (res?.error) {
  //       context.openAlertBox("error", res?.message || "Failed to add review");
  //       setIsLoading(false);
  //     }
  //     if (res?.error === false) {
  //       setTimeout(() => {
  //         setIsLoading(false);
  //         context.openAlertBox("success", res?.message || "Review added");

  //         context.setIsOpenFullScreenPanel({
  //           open: false,
  //         });
  //         context?.getCat();
  //         // history("/category/list");
  //       }, 2500);
  //     }
  //   });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.review)
      return context.openAlertBox("error", "Enter product review");

    setIsLoading(true);

    try {
      const res = await editData(`/api/product/updateProduct/${id}`, {
        ...formFields,
        // images: previews,
      });

      if (res?.error === false) {
        context.openAlertBox("success", "Review Added Successfully!");
        // console.log("updated", res);
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({ open: false });
          // Navigate("/products");
        }, 800);
      } else {
        context.openAlertBox("success", res?.message || "Update failed");
        console.log("failed", res);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox("error", "Network or server error");
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* 🧭 Breadcrumbs */}
      <div className="py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link !text-[14px]"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
              className="link !text-[14px]"
            >
              {productData.catName || "Category"}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
              className="link !text-[14px]"
            >
              {productData.name || "Product Details"}
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      {/* 🏷️ Product Section */}
      <section className="bg-white py-5">
        <div className="container flex flex-col lg:flex-row gap-8">
          {/* Product Image Zoom */}
          <div className="productZoomContainer w-full lg:w-[40%]">
            <ProductZoom images={productData?.images || []} />
          </div>

          {/* Product Info */}
          <div className="productContent w-full lg:w-[60%] px-6">
            <ProductDetailsComponent item={productData} />
          </div>
        </div>

        {/* 🔖 Product Tabs */}
        <div className="container pt-10">
          <div className="flex flex-wrap items-center gap-8 mb-5">
            {["Description", "Product Detail", "Reviews (5)"].map(
              (tab, index) => (
                <span
                  key={index}
                  className={`link text-[17px] cursor-pointer font-[500] ${
                    activeTab === index
                      ? "text-primary border-b-2 border-primary pb-1"
                      : ""
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </span>
              )
            )}
          </div>

          {/* Description Tab */}
          {activeTab === 0 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <p className="text-gray-600">
                {productData.description || "No description available."}
              </p>
            </div>
          )}

          {/* Product Details Tab */}
          {activeTab === 1 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-6 py-3">Brand</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-t">
                      <td className="px-6 py-4">
                        {productData.brand || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {productData.catName || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        ${productData.price || "0.00"}
                      </td>
                      <td className="px-6 py-4">
                        {productData.countInStock || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 2 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <div className="w-full lg:w-[80%] productReviewsContainer">
                {/* <h2 className="text-[18px] font-semibold">Customer Reviews</h2>
                <p className="text-gray-500 mb-4">{productData.review}</p> */}
                <div className="flex justify-between">
                  {" "}
                  <div className="info w-[60%] flex items-center gap-3">
                    <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                      <>
                        {previews.length > 0 ? (
                          previews.map((img, index) => (
                            <img
                              src={img}
                              key={index}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          ))
                        ) : (
                          <img
                            src="/user.png"
                            alt="user image avatar place holder"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </>
                    </div>

                    <div className="w-[80%] ">
                      <h4 className="text-[16px] ">
                        {context?.userData?.name}
                      </h4>
                      <h5 className="text-[13px] mb-0">
                        {productData.createdAt.split("T")[0]}
                      </h5>
                      <p className="mt-0 mb-0">{productData.review}</p>
                    </div>
                  </div>
                  <Rating
                    name="size-small"
                    defaultValue={productData.rating}
                    readOnly
                  />
                </div>

                <div className="reviewForm bg-[#fafafa] p-4 rounded-md">
                  <h2 className="text-[18px] mb-3">Add a Review</h2>
                  <form className="w-full" onSubmit={handleSubmit}>
                    <TextField
                      label="Write a review..."
                      multiline
                      rows={4}
                      className="w-full"
                      name="review"
                      value={formFields.review}
                      onChange={onChangeInput}
                    />
                    <div className="flex items-center gap-3 mt-5">
                      <Rating name="size-small" defaultValue={5} />
                      <Button variant="contained" color="error" type="submit">
                        Submit Review
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 🛒 Related Products */}
        {Array.isArray(relatedProducts) && relatedProducts.length > 0 && (
          <div className="container pt-8">
            <h2 className="text-[20px] font-[600] pb-2">Related Products</h2>
            <ProductsSlider items={6} data={relatedProducts} />
          </div>
        )}
      </section>
    </>
  );
}

export default ProductDetails;
