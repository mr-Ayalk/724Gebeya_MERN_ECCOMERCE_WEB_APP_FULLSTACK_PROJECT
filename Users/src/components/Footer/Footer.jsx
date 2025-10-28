import { useContext } from "react";
import { LiaShippingFastSolid, LiaGiftSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoChatboxOutline, IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Drawer, Button, Checkbox, FormControlLabel } from "@mui/material";
import { MyContext } from "../../App";
import CartPanel from "../CartPanel/CartPanel";

function Footer() {
  const context = useContext(MyContext);

  return (
    <>
      {/* 🌈 Top Accent Bar */}
      <div className="h-[4px] w-full bg-gradient-to-r from-primary via-pink-500 to-orange-400" />

      <footer className="bg-[#f9fafb] text-[#222] pt-10 pb-6 mt-0 border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* 🚚 Features Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
            {[
              {
                icon: <LiaShippingFastSolid className="text-[40px]" />,
                title: "Free Shipping",
                desc: "Orders over $100",
              },
              {
                icon: <PiKeyReturnLight className="text-[40px]" />,
                title: "30 Days Return",
                desc: "Exchange available",
              },
              {
                icon: <BsWallet2 className="text-[40px]" />,
                title: "Secure Payment",
                desc: "All cards accepted",
              },
              {
                icon: <LiaGiftSolid className="text-[40px]" />,
                title: "Special Gifts",
                desc: "For first order",
              },
              {
                icon: <BiSupport className="text-[40px]" />,
                title: "Support 24/7",
                desc: "Anytime assistance",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/70 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 backdrop-blur-md border border-gray-100"
              >
                <div className="text-primary mb-2 transition-transform duration-300 hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-[15px]">{f.title}</h3>
                <p className="text-[13px] text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>

          <hr className="border-gray-200 mb-10" />

          {/* 🧭 Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
            {/* 📞 Contact Section */}
            <div>
              <h2 className="text-[20px] font-[600] mb-4 text-primary">
                Contact Us
              </h2>
              <p className="text-[13px] text-gray-700 mb-4">
                Classyshop - Mega Super Store <br />
                507 Union Trade Center, Ethiopia
              </p>
              <Link
                className="block text-[13px] text-blue-500 hover:underline"
                to="mailto:sales@yourcompany"
              >
                sales@yourcompany
              </Link>
              <span className="block text-[22px] font-[700] mt-3 mb-5 text-primary">
                (+251) 944-559-678
              </span>
              <div className="flex items-center gap-2">
                <IoChatboxOutline className="text-[35px] text-primary" />
                <span className="text-[15px] font-[600]">Online Chat</span>
              </div>
            </div>

            {/* 🛍️ Product Links */}
            <div>
              <h2 className="text-[18px] font-[600] mb-4 text-primary">
                Products
              </h2>
              <ul className="space-y-2 text-[14px] text-gray-600">
                {[
                  "Prices Drop",
                  "New Products",
                  "Best Sales",
                  "Contact Us",
                  "Sitemap",
                  "Stores",
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      className="hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 🏢 Company Links */}
            <div>
              <h2 className="text-[18px] font-[600] mb-4 text-primary">
                Our Company
              </h2>
              <ul className="space-y-2 text-[14px] text-gray-600">
                {[
                  "Delivery",
                  "Terms & Conditions",
                  "About Us",
                  "Secure Payment",
                  "Login",
                  "Legal Notice",
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      className="hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 💌 Newsletter */}
            <div>
              <h2 className="text-[18px] font-[600] mb-3 text-primary">
                Subscribe to Newsletter
              </h2>
              <p className="text-[13px] text-gray-600 mb-4">
                Get our latest updates and special discounts straight to your
                inbox.
              </p>
              <form className="mt-3">
                <input
                  type="email"
                  className="w-full h-[45px] border border-gray-300 rounded-md pl-4 pr-4 outline-none focus:border-primary mb-3"
                  placeholder="Your Email Address"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="!w-full !bg-gradient-to-r !from-primary !to-pink-500 !text-white !font-semibold !rounded-md hover:opacity-90 transition"
                >
                  SUBSCRIBE
                </Button>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <span className="text-[12px] text-gray-500">
                      I agree to the terms and privacy policy
                    </span>
                  }
                />
              </form>
            </div>
          </div>
        </div>

        {/* 🔻 Bottom Bar */}
        <div className="bg-white border-t border-gray-200 py-3">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* 🌐 Socials */}
            <ul className="flex items-center gap-3">
              {[
                { icon: <FaFacebookF />, color: "#1877F2" },
                { icon: <AiOutlineYoutube />, color: "#FF0000" },
                { icon: <FaPinterestP />, color: "#E60023" },
                { icon: <FaInstagram />, color: "#E4405F" },
              ].map((s, i) => (
                <li key={i}>
                  <Link
                    to="/"
                    target="_blank"
                    className="w-[35px] h-[35px] flex items-center justify-center rounded-full border border-gray-300 transition-all hover:scale-110"
                    style={{ color: s.color }}
                  >
                    {s.icon}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 🏷️ Copyright */}
            <p className="text-[13px] text-gray-600 text-center">
              © 2025{" "}
              <span className="font-semibold text-primary">Ecommerce</span>{" "}
              Software by <span className="font-semibold">Ayalkbet T.</span>
            </p>

            {/* 💳 Payment Methods */}
            <div className="flex items-center gap-2">
              {[
                "carte_bleue.png",
                "visa.png",
                "master_card.png",
                "paypal.png",
              ].map((img, i) => (
                <img
                  key={i}
                  src={`https://ecommerce-frontend-view.netlify.app/${img}`}
                  alt="payment"
                  className="h-[25px] object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* 🛒 Cart Drawer */}
      <Drawer
        open={context.openCartPanel}
        onClose={() => context.toggleCartPanel(false)}
        anchor="right"
        className="w-[500px] cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200">
          <h4 className="text-[18px] font-[600]">
            Shopping Cart ({context?.cartData?.length || 0})
          </h4>
          <IoCloseSharp
            className="text-[22px] cursor-pointer hover:text-primary"
            onClick={() => context.toggleCartPanel(false)}
          />
        </div>
        <CartPanel />
      </Drawer>
    </>
  );
}

export default Footer;
