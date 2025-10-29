import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function BlogItem({ item }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Image Section */}
      <div className="relative cursor-pointer overflow-hidden h-[180px]">
        <img
          src={item?.images?.[0]?.url}
          alt="blog"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Date Tag */}
        <span className="absolute bottom-3 right-3 bg-primary text-white text-xs font-medium rounded-md px-2 py-1 flex items-center gap-1 shadow-md">
          <IoMdTime className="text-base" />
          {item?.createdAt?.split("T")[0]}
        </span>

        {/* Image Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </div>

      {/* Blog Content */}
      <div className="p-4">
        <h3 className="text-[16px] font-[700] text-gray-900 leading-5 mb-2 line-clamp-2">
          <Link to={`/blog/${item?._id}`} className="hover:text-primary">
            {item?.title}
          </Link>
        </h3>

        <p className="text-[13px] text-gray-600 leading-5 mb-4 line-clamp-3">
          {item?.description}
        </p>

        <Link
          to={`/blog/${item?._id}`}
          className="inline-flex items-center gap-2 text-primary font-[600] group-hover:gap-3 transition-all"
        >
          Read More <IoIosArrowForward className="text-[16px]" />
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
