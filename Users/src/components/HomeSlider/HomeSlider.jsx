import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
// function HomeSlider(props) {
//   return (
//     <div className="homeSlider py-4">
//       <div className="container">
//         <Swiper
//           loop={true}
//           navigation={true}
//           spaceBetween={10}
//           autoplay={{
//             delay: 2500,
//             disabledOnInteration: false,
//           }}
//           modules={[Navigation, Autoplay]}
//           className="sliderHomer"
//         >
//           {props.data.length !== 0 &&
//             props.data.map((slide, index) => {
//               return (
//                 <SwiperSlide key={index}>
//                   <div className="item rounded-[20px] overflow-hidden">
//                     <img
//                       src={slide?.image[0]?.url}
//                       alt=""
//                       className="!w-full h-[400px]"
//                     />
//                   </div>
//                 </SwiperSlide>
//               );
//             })}
//         </Swiper>
//       </div>
//     </div>
//   );
// }
function HomeSlider(props) {
  return (
    <div className="homeSlider py-4">
      <div className="container">
        <Swiper
          loop={true}
          navigation={true}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="sliderHomer"
        >
          {props.data.length > 0 &&
            props.data.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="item rounded-[20px] overflow-hidden">
                  <img
                    src={slide?.images?.[0]?.url} // ✅ Fixed here
                    alt={`Slide ${index}`}
                    className="!w-full h-[400px] object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;
