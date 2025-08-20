import { Button } from "@mui/material";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

function CartPanel() {
  return (
    <>
      <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4">
        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="/product/45875" className="block group">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <Link to="/product/5433" className="link transition-all">
              <h4 className="text-[16px] font-[500] ">
                A-Line Kurti with sharara &Dupatta
              </h4>
            </Link>

            <p className="flex items-center gap-5 mt-2 mb-2">
              <span>
                Qty: <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all" />
          </div>
        </div>
      </div>
      <br />

      <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5">
        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col ">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">2 item</span>
            <span className="text-primary font-bold">$66.00</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Shipping</span>
            <span className="text-primary font-bold">$69.00</span>
          </div>
        </div>
        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col ">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Total (tax excl.)</span>
            <span className="text-primary font-bold">$646.00</span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-5">
          <Link to="/cart" className="w-[50%] d-block">
            <Button className="btn-org btn-lg w-full">View Cart</Button>
          </Link>

          <Link to="/checkout" className="w-[50%] d-block">
            <Button className="btn-org btn-border btn-lg w-full">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartPanel;
