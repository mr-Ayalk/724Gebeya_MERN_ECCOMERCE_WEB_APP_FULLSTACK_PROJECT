import "./BannerBoxV2.css";
import { Link } from "react-router-dom";
function BannerBoxV2(props) {
  return (
    <div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative !h-[210px]">
      <img
        src={props.img}
        alt=""
        className="w-full transition-all duration-150 group-hover:scale-105   h-full object-cover"
      />
      <div
        className={`info absolute p-5 top-0 ${
          props.info === "left" ? "left-0" : "right-0"
        } w-[70%] h-[100%] z-50 flex items-center justify-center flex-col gap-2
        ${props.info === "left" ? "" : "pl-24"}
        `}
      >
        <h2 className="text-[18px] font-[600]">{props.data?.bannerTitle}</h2>
        <span className="text-[20px] text-primary font-[600] w-full">
          {/* ${props.data?.price} */}1$ only
        </span>
        <span className="text-[20px]  font-[600] w-full">
          {/* ${props.data?.price} */}
          78% Discount Welcome Deal
        </span>
        <div className="w-full">
          <Link to="/" className="text-[16px] font-[600] link text-primary">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BannerBoxV2;
