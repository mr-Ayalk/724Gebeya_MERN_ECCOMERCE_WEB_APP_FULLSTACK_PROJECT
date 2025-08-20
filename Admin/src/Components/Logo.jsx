
const Logo = (props) => {
  return (
    <h2
      className={`w-[60%] mx-auto justify-center text-2xl text-[#063c28] font-black tracking-wider uppercase hover:text-[#309c3c] hoverEffect group font-sans ${props.className}`}
    >
      <span
        className={` text-[#309c3c] group-hover:text-[#063c28] hoverEffect ${props.spanDesign}`}
      >
        G
      </span>
      ebeya
    </h2>
  );
};

export default Logo;
