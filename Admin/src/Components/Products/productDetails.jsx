import React, { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { Button, Rating } from "@mui/material";

import { FaPlus, FaRegEye, FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
//
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import {
  MdBrandingWatermark,
  MdFilterVintage,
  MdRateReview,
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsPatchCheck } from "react-icons/bs";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const context = useContext(MyContext);
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();
  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };
 const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //   useEffect(() => {
  //     fetchDataFromApi(`/api/product/${id}`).then((res) => {
  //       setProduct(res?.data);
  //     });
  //   });
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetchDataFromApi(`/api/product/${id}`);
        console.log("API Response:", res); // <-- check structure
        if (res?.success) {
          setProduct(res.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not available</p>;
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Product Details</h2>
      </div>
      <br />

      <div className="productDetails flex gap-5">
        <div className="w-[40%]">
          {product?.images?.length !== 0 && (
            <div className="flex gap-3">
              <div className="slider w-[15%]">
                <Swiper
                  ref={zoomSliderSml}
                  direction={"vertical"}
                  navigation={true}
                  slidesPerView={5}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className={`zoomProductSliderThumbs h-[490px] overflow-hidden ${
                    product?.images?.length > 5 &&
                    // "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll"
                    "space"
                  }`}
                >
                  {product?.images?.map((img, index) => {
                    return (
                      <SwiperSlide>
                        <div
                          className={`item rounded-md  overflow-hidden cursor-pointer group ${
                            slideIndex === index ? "opacity-1" : "opacity-30"
                          }`}
                          onClick={() => goto(index)}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full transition-all group-hover:scale-105"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              <div className="zoomContainer w-[85%] h-[500px] overflow-hidden">
                <Swiper
                  ref={zoomSliderBig}
                  navigation={false}
                  slidesPerView={1}
                  spaceBetween={0}
                  pagination={{
                    clickable: true,
                  }}
                >
                  {product?.images?.map((img, index) => {
                    return (
                      <SwiperSlide>
                        <InnerImageZoom
                          src={img}
                          zoomScale={1}
                          zoomType="hover"
                          alt="Product"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>
        <div className="w-[60%]">
          <h1 className="text-[25px] font-[500] mb-4 ">{product?.name}</h1>
          <div className="flex items-center py-2">
            <span className="w-[20px] font-[500] flex items-center gap-2">
              <MdBrandingWatermark /> Brand :{" "}
            </span>
            <span>{product?.brand}</span>
          </div>
          <div className="flex items-center py-2">
            <span className="w-[20px] font-[500] flex items-center gap-2">
              <BiSolidCategoryAlt /> Category :{" "}
            </span>
            <span>{product?.catName}</span>
          </div>
          {product?.productRam?.length !== 0 && (
            <div className="flex items-center py-2">
              <span className="w-[20px] font-[500] flex items-center gap-2">
                <MdFilterVintage /> RAM :
              </span>
              <div className="flex items-center gap-2">
                {product?.productRam?.map((ram, index) => {
                  return (
                    <span
                      className="text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500]"
                      key={index}
                    >
                      {ram}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {product?.size?.length !== 0 && (
            <div className="flex items-center py-2">
              <span className="w-[20px] font-[500] flex items-center gap-2">
                <MdFilterVintage /> SIZE :
              </span>
              <div className="flex items-center gap-2">
                {product?.size?.map((size, index) => {
                  return (
                    <span
                      className="text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500]"
                      key={index}
                    >
                      {size}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {product?.productWeight?.length !== 0 && (
            <div className="flex items-center py-2">
              <span className="w-[20px] font-[500] flex items-center gap-2">
                <MdFilterVintage /> WEIGHT :
              </span>
              <div className="flex items-center gap-2">
                {product?.productWeight?.map((weight, index) => {
                  return (
                    <span
                      className="text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500]"
                      key={index}
                    >
                      {weight}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex items-center py-1">
            <span className="w-[20px] font-[500] flex items-center gap-2">
              <MdRateReview /> Review :
            </span>
            <span className="text-[14px]">
              ({product?.reviews?.length > 0 ? product?.reviews?.length : 0})
              Review
            </span>
          </div>
          <div className="flex items-center py-1">
            <span className="w-[20px] font-[500] flex items-center gap-2">
              <BsPatchCheck /> Published :
            </span>
            <span className="text-[14px]">
              {product?.createdAt.split("T")[0]}
            </span>
          </div>
          <br />
          <h2 className="text-[20px] font-[500] mb-3 ">Product Description</h2>
          {product?.description && (
            <p className="text-[14px] ">{product?.description}</p>
          )}
        </div>
      </div>
      <br />
      <div className="reviewsWrap mt-3">
        <div className="reviews w-full h-auto p-3 mb-3 bg-white shadow-md rounded-sm flex items-center justify-between">
          <div className="flex items-centergap-4">
            <div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
              <img src="" alt="  " className="w-full h-full object-cover" />
            </div>
            <div className="info w-[80%]">
              <div className="flex items-center justify-between">
                <h4 className="text-[16px] font-[500]">Ayaaaaaaaaaaalk</h4>
                <Rating name="read-only" value={5} readOnly size="small" />
              </div>

              <span className="text-[13px]  ">2025-09-05</span>
              <p className="text-[13px] mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
                eius culpa debitis aut repellendus beatae voluptates temporibus
                perferendis soluta explicabo eos voluptatum, officiis sit
                nostrum quasi ut quos, iste iusto?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
