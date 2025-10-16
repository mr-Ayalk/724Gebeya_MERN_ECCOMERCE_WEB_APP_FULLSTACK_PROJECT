import React, { useContext, useEffect, useState } from "react";
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
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import ProductLoading from "../../components/ProductLoading/ProductLoading";

function Home() {
  const context = useContext(MyContext);

  const [value, setValue] = useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProduct, setPopularProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  // Fetch home slider + all products
  useEffect(() => {
    fetchDataFromApi("/api/homeSlider").then((res) => {
      if (res?.error === false && Array.isArray(res?.data)) {
        setHomeSlidesData(res.data);
      }
    });

    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setProductData(res.products);
      console.log(res);
    });
    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setFeaturedProduct(res.products);
      console.log("featured products", res);
    });
    fetchDataFromApi(`/api/bannerV1`).then((res) => {
      setBannerData(res.data);
      // console.log(res);
    });
  }, []);

  // Fetch popular products based on first category
  useEffect(() => {
    if (Array.isArray(context?.catData) && context.catData.length > 0) {
      fetchDataFromApi(
        `/api/product/getAllProductsByCatId/${context.catData[0]?._id}`
      ).then((res) => {
        if (Array.isArray(res?.products)) {
          setPopularProducts(res.products);
        }
      });
    }
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    if (!id) return;
    setPopularProducts([]);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (Array.isArray(res?.products)) {
        setPopularProducts(res.products);
      }
    });
  };

  return (
    <>
      {/* 🖼️ Home Slider */}
      {Array.isArray(homeSlidesData) && homeSlidesData.length > 0 && (
        <HomeSlider data={homeSlidesData} />
      )}

      {/* 🧭 Category Slider */}
      {Array.isArray(context?.catData) && context.catData.length > 0 && (
        <CatSlider data={context.catData} />
      )}

      {/* 🏠 Banner Section */}
      <section className="py-6">
        <div className="container flex items-center gap-5">
          <div className="part1 w-[70%]">
            {Array.isArray(featuredProduct) && featuredProduct?.length > 0 && (
              <HomeSliderV2 data={featuredProduct} />
            )}
            {/* {productData?.length !== 0 && <HomeSliderV2 data={productData} />} */}
          </div>
          <div className="part2 w-[30%] flex flex-col items-center justify-between gap-5">
            <BannerBoxV2
              info="right"
              image="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            />
            <BannerBoxV2
              info="left"
              image="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
            />
          </div>
        </div>
      </section>

      {/* 💥 Popular Products */}
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
                {Array.isArray(context?.catData) &&
                  context.catData.map((cat, index) => (
                    <Tab
                      label={cat?.name}
                      key={cat?._id || index}
                      onClick={() => filterByCatId(cat?._id)}
                    />
                  ))}
              </Tabs>
            </div>
          </div>
          {popularProduct.length === 0 && <ProductLoading />}

          {Array.isArray(popularProduct) && popularProduct.length > 0 && (
            <ProductsSlider items={6} data={popularProduct} />
          )}
        </div>
      </section>

      {/* 🚚 Free Shipping */}
      <section className="py-4 pt-2 bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] mx-auto py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7">
            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-[20px] font-[600]">FREE SHIPPING</span>
            </div>

            <div className="col2">
              <p className="mb-0 font-[500]">
                Free Delivery Now On Your First Order and Over $200
              </p>
            </div>
            <p className="font-bold text-[25px]">-Only $200*</p>
          </div>
          {bannerData?.length > 0 && (
            <AdsBannerSliderV2 items={4} data={bannerData} />
          )}
        </div>
      </section>

      {/* 🆕 Latest Products */}
      <section className="py-5 bg-white pt-0">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Latest Products</h2>
          {productData.length === 0 && <ProductLoading />}
          {productData.length > 0 && (
            <ProductsSlider items={6} data={productData} />
          )}
          {bannerData?.length > 0 && (
            <AdsBannerSlider items={3} data={bannerData} />
          )}
        </div>
      </section>

      {/* 🌟 Featured Products */}
      <section className="py-5 bg-white pt-0">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Featured Products</h2>
          {featuredProduct.length === 0 && <ProductLoading />}
          {Array.isArray(featuredProduct) && featuredProduct.length > 0 && (
            <ProductsSlider items={6} data={featuredProduct} />
          )}

          <AdsBannerSlider items={4} />
        </div>
      </section>

      {/* 📰 Blog Section */}
      <section className="py-5 pb-8 bg-white pt-0 blogSection">
        <div className="container">
          <h2 className="text-[20px] mb-4 font-[600]">From Blogs</h2>
          <Swiper
            navigation={true}
            slidesPerView={4}
            spaceBetween={30}
            modules={[Navigation]}
            className="blogSlider"
          >
            {[...Array(8)].map((_, i) => (
              <SwiperSlide key={i}>
                <BlogItem />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default Home;
