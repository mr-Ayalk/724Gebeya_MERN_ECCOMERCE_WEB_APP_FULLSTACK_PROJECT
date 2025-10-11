import React, { useRef, useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
//
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
function ProductZoom(props) {
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
          {props?.images?.map((img, idx) => (
            <>
              {" "}
              <SwiperSlide>
                <div
                  className={`item rounded-md  overflow-hidden cursor-pointer group ${
                    slideIndex === idx ? "opacity-1" : "opacity-30"
                  }`}
                  onClick={() => goto(idx)}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full transition-all group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            </>
          ))}

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
          {props?.images?.map((img, idx) => (
            <SwiperSlide>
              <InnerImageZoom
                src={img.url}
                zoomScale={1}
                zoomType="hover"
                alt="Product"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductZoom;
