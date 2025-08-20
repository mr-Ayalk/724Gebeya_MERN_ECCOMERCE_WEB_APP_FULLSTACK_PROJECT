import "react-lazy-load-image-component/src/effects/blur.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
const AddSubCategory = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  return (
    <section className="p-5 px-20 bg-gray-50  overflow-hidden">
      <form action="" className="form p-8 py-3 ">
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4">
          <div className=" grid grid-cols-4 mb-3 gap-5">
            {" "}
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
            <div className="col ">
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
          </div>

          <br />
        </div>

        <br />
        <div className="w-[250px]">
          <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSubCategory;
