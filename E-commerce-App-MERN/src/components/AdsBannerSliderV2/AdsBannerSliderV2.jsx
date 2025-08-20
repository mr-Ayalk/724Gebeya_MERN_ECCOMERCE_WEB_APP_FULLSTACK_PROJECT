import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import BannerBoxV2 from "../BannerBoxV2/BannerBoxV2";

function AdsBannerSliderV2(props) {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        navigation={true}
        spaceBetween={10}
        modules={[Navigation, Autoplay]}
        className="smlBtn"
      >
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            info="right"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default AdsBannerSliderV2;
