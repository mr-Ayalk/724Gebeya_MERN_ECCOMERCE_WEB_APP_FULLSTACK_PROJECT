import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";
function CatSlider(props) {
  const context = useContext(MyContext);
  return (
    <div className="homeCatSlider pt-4 py-8">
      <div className="container">
        <Swiper
          navigation={true}
          slidesPerView={8}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {props?.data?.map((cat, index) => {
            return (
              <SwiperSlide>
                <Link to="/">
                  <div
                    className="item py-7 px-3 bg-white rounded-sm  text-center flex items-center justify-center flex-col  h-[160px] w-[160px] !gap-2 "
                    key={index}
                  >
                    <img
                      src={cat?.images?.[0]?.url} // ✅ Fixed here
                      alt=""
                      className="w-[100px] transition-all"
                    />
                    <h3 className="text-[15px] font-[500] mt-3">{cat?.name}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default CatSlider;
