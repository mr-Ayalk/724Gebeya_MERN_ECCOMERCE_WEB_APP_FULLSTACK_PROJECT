import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AiTwotoneGift, AiTwotonePieChart } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import {  BsBank2 } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";

const DashboardBoxes = () => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={4}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    
      navigation={true}
      modules={[Navigation]} 
      className="dashboardBoxesSlider"
    >
      <SwiperSlide>
        <div className="box p-5 bg-white cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
          <AiTwotoneGift className="text-[40px] text-green-700" />
          <div className="info w-[70%] flex items-center gap-3">
            <h3 className="">New Orders</h3>
            <b>1,390</b>
          </div>
          <IoStatsChartSharp className="text-[50px] text-green-700" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="box p-5 bg-white  cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
          <AiTwotonePieChart className="text-[40px] text-blue-600" />
          <div className="info w-[70%] flex items-center gap-3">
            <h3 className="">Sales</h3>
            <b>19,444</b>
          </div>
          <IoStatsChartSharp className="text-[50px] text-blue-600" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="box p-5 bg-white  cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
          <BsBank2 className="text-[40px] text-yellow-600" />
          <div className="info w-[70%] flex items-center gap-3">
            <h3 className="">Revenue</h3>
            <b>81,390</b>
          </div>
          <IoStatsChartSharp className="text-[50px] text-yellow-700" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="box p-5 bg-white  cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
          <RiProductHuntLine className="text-[40px] text-lime-300" />
          <div className="info w-[70%] flex items-center gap-3">
            <h3 className="">Total Products</h3>
            <b>1,390</b>
          </div>
          <IoStatsChartSharp className="text-[50px] text-lime-300" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default DashboardBoxes;
