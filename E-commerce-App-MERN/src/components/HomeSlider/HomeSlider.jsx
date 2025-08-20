import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
function HomeSlider() {
  return (
    <div className="homeSlider py-4">
      <div className="container">
        <Swiper
          loop={true}
          navigation={true}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disabledOnInteration: false,
          }}
          modules={[Navigation, Autoplay]}
          className="sliderHomer"
        >
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://graphicsfamily.com/wp-content/uploads/edd/2024/01/Fashion-sale-web-banner-design-scaled.jpg"
                alt=""
                className="!w-full h-[400px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/174/590/non_2x/fashion-advertising-web-banner-illustration-vector.jpg"
                className="!w-full h-[400px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://i.ytimg.com/vi/tSUNZwi7Fr0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAmU4lDxpdL0j5iMTMPF7OIWUjkMg"
                alt=""
                className="!w-full h-[400px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://www.shutterstock.com/image-photo/assorted-fresh-ripe-fruits-vegetables-260nw-770613370.jpg"
                alt=""
                className="!w-full h-[400px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                className="!w-full h-[400px]"
                src="https://img.freepik.com/free-vector/flat-supermarket-twitter-header_23-2149375304.jpg?semt=ais_hybrid&w=740"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;
