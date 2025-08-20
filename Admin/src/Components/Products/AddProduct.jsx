import  { useState } from "react";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
const AddProduct = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeature, setProductSubFeature] = useState("");
  const [productRAM, setProductRAM] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productSize, setProductSize] = useState("");
  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };
  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };
  const handleChangeProductRAM = (event) => {
    setProductRAM(event.target.value);
  };
  const handleChangeProductFeature = (event) => {
    setProductSubFeature(event.target.value);
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  return (
    <section className="p-5 px-20 bg-gray-50  overflow-hidden">
      <form action="" className="form p-8 py-3 ">
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Name
              </h3>

              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Description
              </h3>

              <textarea
                type="text"
                className="w-full h-[140px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
              />
            </div>
          </div>
          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Category
              </h3>

              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-white"
                size="small"
                value={productCat}
                label="Age"
                onChange={handleChangeProductCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Fashion</MenuItem>
                <MenuItem value={20}>Beauty</MenuItem>
                <MenuItem value={30}>Wellness</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Sub Category
              </h3>

              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-white"
                size="small"
                value={productSubCat}
                label="Age"
                onChange={handleChangeProductSubCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Men</MenuItem>
                <MenuItem value={20}>Women</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Price
              </h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Old Price
              </h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Is Featured ?
              </h3>

              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productFeature}
                label="Age"
                onChange={handleChangeProductFeature}
              >
                <MenuItem value={10}>True</MenuItem>
                <MenuItem value={20}>False</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Stock
              </h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Brand
              </h3>

              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Discount
              </h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product RAMS
              </h3>

              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-white "
                size="small"
                value={productRAM}
                label="Age"
                onChange={handleChangeProductRAM}
              >
                <MenuItem value={"4GB"}>4GB</MenuItem>
                <MenuItem value={"6GB"}>6GB</MenuItem>
                <MenuItem value={"8GB"}>8GB</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Weight
              </h3>

              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-white "
                size="small"
                value={productWeight}
                label="Age"
                onChange={handleChangeProductWeight}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>2KG</MenuItem>
                <MenuItem value={20}>4KG</MenuItem>
                <MenuItem value={30}>6KG</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Size
              </h3>

              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productSize}
                label="Age"
                onChange={handleChangeProductSize}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Rating
              </h3>

              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
          </div>

          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>

            <div className="grid grid-cols-6 gap-4">
              <div className="uploadBoxWrapper relative">
                <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>

                <div className="uploadBox p-0  rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[170px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image.alt"}
                    effect="blur"
                    wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: { transitionDelay: "1s" },
                    }}
                    src={
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                    }
                  />
                </div>
              </div>
              <UploadBox multiple={true} />
            </div>
          </div>

          <br />
        </div>
        <hr />
        <br />
        <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
          <FaCloudUploadAlt className="text-[25px] text-white" />
          Publish and View
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
