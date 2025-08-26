import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import BannerBox from "../BannerBox/BannerBox";
function AdsBannerSlider(props) {
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
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={`https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D`}
            link={"/"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default AdsBannerSlider;
