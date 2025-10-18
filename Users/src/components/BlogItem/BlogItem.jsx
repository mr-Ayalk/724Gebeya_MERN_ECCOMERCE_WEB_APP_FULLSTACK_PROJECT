import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
function BlogItem(props) {
  return (
    <div className="blogItem group">
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src={props?.item?.images[0]?.url}
          alt="blog image"
          className="w-full transition-all group-hover:scale-105  group-hover:rotate-1"
        />

        <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 text-[12px] font-[500] gap-1">
          <IoMdTime className="text-[16px]" />{props?.item?.createdAt?.split("T")[0]}
        </span>
      </div>

      <div className="info py-4">
        <h2 className="text-[15px] font-[600] text-black">
          <Link to="/" className="link">
            {" "}
            {props?.item?.title}
          </Link>
        </h2>

        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
          {props?.item?.description?.slice(0, 100)}...
        </p>
        <Link className="link font-[500] text-[14px] flex items-center gap-1">
          Read More <IoIosArrowForward />
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
