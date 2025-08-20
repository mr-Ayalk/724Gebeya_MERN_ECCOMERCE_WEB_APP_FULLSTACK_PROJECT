import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
function BlogItem() {
  return (
    <div className="blogItem group">
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="blog image"
          className="w-full transition-all group-hover:scale-105  group-hover:rotate-1"
        />

        <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 text-[12px] font-[500] gap-1">
          <IoMdTime className="text-[16px]" />5 APRIL,2025
        </span>
      </div>

      <div className="info py-4">
        <h2 className="text-[15px] font-[600] text-black">
          <Link to="/" className="link">
            {" "}
            Nullan ullalsgbn sooisrhgs pdiorfgl
          </Link>
        </h2>

        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sint
          minus placeat quia eum, perspiciatis quae.......
        </p>
        <Link className="link font-[500] text-[14px] flex items-center gap-1">
          Read More <IoIosArrowForward />
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
