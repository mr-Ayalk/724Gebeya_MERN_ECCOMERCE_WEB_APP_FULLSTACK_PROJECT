import "react-lazy-load-image-component/src/effects/blur.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const AddSubCategory = () => {
  const context = useContext(MyContext);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [productCat2, setProductCat2] = useState("");
  const [productSubCat, setProductSubCat] = useState("");

  const [formFields, setFormFields] = useState({
    name: "",
    // images: [],
    parentId: null,
    parentCatName: null,
  });
  const [formFields2, setFormFields2] = useState({
    name: "",
    // images: [],
    parentId: null,
    parentCatName: null,
  });
  const selectCatFun = (catName) => {
    formFields.parentCatName = catName;
  };
  const selectCatFun2 = (catName) => {
    formFields2.parentCatName = catName;
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    const catId = productCat;
    setProductCat(catId);
    setFormFields(() => {
      return {
        ...formFields,
        [name]: e.target.value,
      };
    });
  };
  const onChangeInput2 = (e) => {
    const { name, value } = e.target;
    const catId = productCat;
    setProductCat2(catId);
    setFormFields2(() => {
      return {
        ...formFields,
        [name]: e.target.value,
      };
    });
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.parentId = event.target.value;
  };
  const handleChangeProductCat2 = (event) => {
    setProductCat2(event.target.value);
    formFields2.parentId = event.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name.trim() === "") {
      context.openAlertBox("error", "Category name is required");
      setIsLoading(false);
      return;
    }
    if (productCat === "") {
      context.openAlertBox("error", "Please select parent category");
      setIsLoading(false);
      return;
    }

    // ✅ Make sure formFields.images is an array of objects [{url, public_id}, ...]
    postData("/api/category/create", {
      name: formFields.name,
      images: previews, // send full previews array
      parentId: formFields.parentId,
      parentCatName: formFields.parentCatName,
    }).then((res) => {
      if (res?.error) {
        context.openAlertBox("error", res?.message || "Failed to add category");
        setIsLoading(false);
      }
      if (res?.error === false) {
        setTimeout(() => {
          setIsLoading(false);
          context.openAlertBox("success", res?.message || "Category added");

          context.setIsOpenFullScreenPanel({
            open: false,
          });
          context?.getCat();
          history("/subCategory/list");
        }, 2500);
      }
    });
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (formFields2.name.trim() === "") {
      context.openAlertBox("error", "Category name is required");
      setIsLoading2(false);
      return;
    }
    if (productCat2 === "") {
      context.openAlertBox("error", "Please select parent category");
      setIsLoading2(false);
      return;
    }

    // ✅ Make sure formFields.images is an array of objects [{url, public_id}, ...]
    postData("/api/category/create", {
      name: formFields2.name,
      images: previews, // send full previews array
      parentId: formFields2.parentId,
      parentCatName: formFields2.parentCatName,
    }).then((res) => {
      if (res?.error) {
        context.openAlertBox("error", res?.message || "Failed to add category");
        setIsLoading2(false);
      }
      if (res?.error === false) {
        setTimeout(() => {
          setIsLoading2(false);
          context.openAlertBox("success", res?.message || "Category added");

          context.setIsOpenFullScreenPanel({
            open: false,
          });
          context?.getCat();
          history("/subCategory/list");
        }, 2500);
      }
    });
  };
  return (
    <section className="p-5 px-20 bg-gray-50  overflow-hidden grid grid-cols-2 gap-10">
      <form action="" className="form p-8 py-3 " onSubmit={handleSubmit}>
        <h4 className="font-[600]">Add Sub Category</h4>
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4">
          <div className=" grid grid-cols-2 mb-3 gap-5">
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
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((item, index) => {
                    return (
                      // <MenuItem
                      //   key={index}
                      //   value={item?._id}
                      //   onClick={selectCatFun(item?.name)}
                      // >
                      //   {item?.name}
                      // </MenuItem>
                      <MenuItem
                        key={index}
                        value={item?._id}
                        onClick={() => selectCatFun(item?.name)} // ✅ fixed
                      >
                        {item?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className="col ">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Sub Category Name
              </h3>

              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <br />
        </div>

        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              " Publish and View"
            )}
          </Button>
        </div>
      </form>
      <form action="" className="form p-8 py-3 " onSubmit={handleSubmit2}>
        <h4 className="font-[600]">Add Third Level Category</h4>
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4">
          <div className=" grid grid-cols-2 mb-3 gap-5">
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
                value={productCat2}
                label="Age"
                onChange={handleChangeProductCat2}
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((item, index) => {
                    return (
                      item?.children?.length !== 0 &&
                      item?.children?.map((item2, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item2?._id}
                            onClick={selectCatFun2(item2?.name)}
                          >
                            {item2?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
              </Select>
            </div>
            <div className="col ">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Sub Category Name
              </h3>

              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                name="name"
                value={formFields2.name}
                onChange={onChangeInput2}
              />
            </div>
          </div>

          <br />
        </div>

        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            {isLoading2 === true ? (
              <CircularProgress color="inherit" />
            ) : (
              " Publish and View"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSubCategory;
