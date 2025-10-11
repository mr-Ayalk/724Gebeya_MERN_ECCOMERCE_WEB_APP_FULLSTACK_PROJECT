import React from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CatSlider from "../../components/CatSlider/CatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import AdsBannerSlider from "../../components/AdsBannerSlider/AdsBannerSlider";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import BlogItem from "../../components/BlogItem/BlogItem";
import HomeSliderV2 from "../../components/HomeSliderV2/HomeSliderV2";

import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2/AdsBannerSliderV2";

import BannerBoxV2 from "../../components/BannerBoxV2/BannerBoxV2";
import { useState } from "react";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useContext } from "react";
import { MyContext } from "../../App";

function Home() {
  const context = useContext(MyContext);
  const [value, setValue] = useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProduct, setPopularProducts] = useState([]);
  useEffect(() => {
    fetchDataFromApi("/api/homeSlider").then((res) => {
      if (res?.error === false) {
        setHomeSlidesData(res?.data);
      }
      // console.log("home slides", res);
    });
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      if (res?.error === false) {
        setPopularProducts(res?.data);
      }
      // console.log("products", res);
    });
  }, []);

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`
    ).then((res) => {
      // console.log(res);
      setPopularProducts(res?.products);
    });
  }, [context?.catData]);
  const handleChange = (event, newValue) => {
    //console.log(event.target.value);
    setValue(newValue);
  };
  const filterByCatId = (id) => {
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      // console.log(res);
      setPopularProducts(res?.products);
    });
  };

  return (
    <>
      {homeSlidesData.length !== 0 && <HomeSlider data={homeSlidesData} />}

      {context?.catData?.length !== 0 && <CatSlider data={context?.catData} />}

      <section className="py-6">
        <div className="container flex items-center gap-5">
          <div className="part1 w-[70%]">
            <HomeSliderV2 />
          </div>
          <div className="part2 w-[30%] flex items-center justify-between flex-col gap-5">
            <BannerBoxV2
              info="right"
              image={
                "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
              }
            />
            <BannerBoxV2
              info="left"
              image={
                "https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
              }
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[20px] font-[600] mt-0 mb-0">
                Popular Products
              </h2>
              <p className="text-[14px] font-[400]">
                Do not miss the current offers until the end of March
              </p>
            </div>

            <div className="reghtSec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((cat, index) => {
                    return (
                      <Tab
                        label={cat?.name}
                        key={index}
                        onClick={() => filterByCatId(cat?._id)}
                      />
                    );
                  })}
              </Tabs>
            </div>
          </div>
          {popularProduct.length !== 0 && (
            <ProductsSlider items={6} data={popularProduct} />
          )}
        </div>
      </section>

      <section className="py-4 pt-2  bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] mx-auto py-4 p-4 border-2  border-[#ff5252] flex items-center justify-between rounded-md mb-7">
            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-[20px] font-[600]">FREE SHIPPING</span>
            </div>

            <div className="col2 ">
              <p className="mb-0 font-[500] ">
                Free Delivery Now On Your First Order and Over $200
              </p>
            </div>
            <p className="font-bold text-[25px]">-Only $200*</p>
          </div>
          <AdsBannerSliderV2 items={4} />
          {/* <AdsBannerSlider items={4} /> */}
        </div>
      </section>

      <section className="py-5 bg-white pt-0">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Latest Products</h2>
          <ProductsSlider items={6} />
          <AdsBannerSlider items={3} />
        </div>
      </section>
      <section className="py-5 bg-white pt-0">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Featured Products</h2>
          <ProductsSlider items={6} />
          <AdsBannerSlider items={4} />
        </div>
      </section>
      <section className="py-5 pb-8 bg-white pt-0 blogSection">
        <div className="container">
          <h2 className="text-[20px] mb-4 font-[600]">From Blogs</h2>
          <Swiper
            navigation={true}
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            className="blogSlider"
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default Home;
