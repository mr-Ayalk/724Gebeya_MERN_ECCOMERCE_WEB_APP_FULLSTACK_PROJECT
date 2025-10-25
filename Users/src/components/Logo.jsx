const Logo = (props) => {
  return (
    <h2
      className={`w-[60%] mx-auto justify-center text-2xl  text-primary font-black tracking-wider uppercase hover:text-[#063c28] hoverEffect group font-sans ${props.className}`}
    >
      <span
        className={` text-[#063c28] group-hover:text-primary hoverEffect ${props.spanDesign}`}
      >
        G
      </span>
      ebeya
    </h2>
  );
};

export default Logo;
