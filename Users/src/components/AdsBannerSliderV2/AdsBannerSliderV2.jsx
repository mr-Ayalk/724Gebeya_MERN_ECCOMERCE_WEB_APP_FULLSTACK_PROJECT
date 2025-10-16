import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import BannerBoxV2 from "../BannerBoxV2/BannerBoxV2";
import BannerBox from "../BannerBox/BannerBox";

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
      
          {props.data &&
                 props.data.length > 0 &&
                 props.data.map((banner, index) => (
                   <SwiperSlide key={index}>
                     <BannerBox img={banner?.images[0]?.url}  item={banner} link={"/"} />
                   </SwiperSlide>
                 ))}
      </Swiper>
    </div>
  );
}

export default AdsBannerSliderV2;
