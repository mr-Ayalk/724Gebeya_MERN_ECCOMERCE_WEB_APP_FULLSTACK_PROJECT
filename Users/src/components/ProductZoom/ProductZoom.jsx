import React, { useRef, useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
function ProductZoom() {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();
  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <div className="flex gap-3">
      <div className="slider w-[15%]">
        <Swiper
          ref={zoomSliderSml}
          direction={"vertical"}
          navigation={true}
          slidesPerView={5}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="zoomProductSliderThumbs h-[490px] overflow-hidden"
        >
          {/* <SwiperSlide>
            <div className="item rounded-md overflow-hidden cursor-pointer group">
              <img
                src="https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmxzfGVufDB8fDB8fHww"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide> */}

          <SwiperSlide>
            <div
              className={`item rounded-md  overflow-hidden cursor-pointer group ${
                slideIndex === 0 ? "opacity-1" : "opacity-30"
              }`}
              onClick={() => goto(0)}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1668896123992-43b8b27cf758?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${
                slideIndex === 1 ? "opacity-1" : "opacity-30"
              }`}
              onClick={() => goto(1)}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmxzfGVufDB8fDB8fHww"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${
                slideIndex === 2 ? "opacity-1" : "opacity-30"
              }`}
              onClick={() => goto(2)}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1668896123844-be3aec7a4776?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${
                slideIndex === 3 ? "opacity-1" : "opacity-30"
              }`}
              onClick={() => goto(3)}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1669138512572-73dd57cc7cb6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${
                slideIndex === 4 ? "opacity-1" : "opacity-30"
              }`}
              onClick={() => goto(4)}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1669138512572-73dd57cc7cb6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${
                slideIndex === 5 ? "opacity-1" : "opacity-30"
              }`}
              onClick={() => goto(5)}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1668896123992-43b8b27cf758?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide></SwiperSlide>
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
          <SwiperSlide>
            <InnerImageZoom
              src="https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmxzfGVufDB8fDB8fHww"
              zoomScale={1}
              zoomType="hover"
              alt="Product"
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://plus.unsplash.com/premium_photo-1668896123808-cd4f065911fe?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
              zoomScale={1}
              zoomType="hover"
              alt="Product"
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://plus.unsplash.com/premium_photo-1668896123992-43b8b27cf758?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
              zoomScale={1}
              zoomType="hover"
              alt="Product"
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://plus.unsplash.com/premium_photo-1668790366434-1b9211dae934?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8"
              zoomScale={1}
              zoomType="hover"
              alt="Product"
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmxzfGVufDB8fDB8fHww"
              zoomScale={1}
              zoomType="hover"
              alt="Product"
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmxzfGVufDB8fDB8fHww"
              zoomScale={1}
              zoomType="hover"
              alt="Product"
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              src="https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmxzfGVufDB8fDB8fHww"
              zoomScale={1}
              zoomType="hover"
              alt="Product"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default ProductZoom;
