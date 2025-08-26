import { Link } from "react-router-dom";

function BannerBox(props) {
  return (
    <div>
      <div className="box bannerBox overflow-hidden rounded-lg group">
        <Link to="/">
          <img
            src={props.img}
            alt="Banner"
            className="w-full transition-all group-hover:scale-105 group-hover:rotate-1"
          />
        </Link>
      </div>
    </div>
  );
}

export default BannerBox;
