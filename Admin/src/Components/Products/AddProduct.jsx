import { useContext, useEffect, useState } from "react";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button, CircularProgress, Switch } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Switch demo" } };
const AddProduct = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeature, setProductSubFeature] = useState("");
  const [productRAM, setProductRAM] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const context = useContext(MyContext);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [checkedSwitch, setCheckedSwitch] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
    bannerTitlename: "",
    bannerimages: [],
    isDisplayOnHomeBanner: false,
  });
  const handleChangeProductSize = (event) => {
    // setProductSize(event.target.value);

    const {
      target: { value },
    } = event;
    setProductSize(typeof value === "string" ? value.split(",") : value);
    formFields.size = value;
  };
  const handleChangeProductWeight = (event) => {
    // setProductWeight(event.target.value);
    const {
      target: { value },
    } = event;
    setProductWeight(typeof value === "string" ? value.split(",") : value);
    formFields.productWeight = value;
  };
  const handleChangeProductRAM = (event) => {
    // setProductRAM(event.target.value);
    const {
      target: { value },
    } = event;
    setProductRAM(typeof value === "string" ? value.split(",") : value);
    formFields.productRam = value;
  };
  const handleChangeProductFeature = (event) => {
    setProductSubFeature(event.target.value);
    formFields.isFeatured = event.target.value;
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };
  // const handleChangeProductCat = (event) => {
  //   setProductCat(event.target.value);
  //   formFields.catId = event.target.value;
  // };

  const handleChangeProductCat = (event) => {
    const value = event.target.value;
    setProductCat(value);
    setFormFields((prev) => ({
      ...prev,
      category: value, // ✅ this is what backend expects
      catId: value,
    }));
  };

  const handleChangeProductThirdLevelCat = (event) => {
    setProductThirdLevelCat(event.target.value);
    formFields.thirdLevelCat = event.target.value;
  };
  const selectCatByName = (name) => {
    formFields.catName = name;
  };
  // const selectCatByName = (name) => {
  //   formFields.catName = name;
  // };
  const selectSubCatByName = (name) => {
    formFields.subCat = name;
  };
  const selectCatByThirdLevel = (name) => {
    formFields.catName = name;
  };
  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: e.target.value,
      };
    });
  };
  const onChangeRating = (e) => {
    setFormFields((formFields) => ({
      ...formFields,
      rating: e.target.value,
    }));
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const setPreviewsFunction = (images) => {
    setPreviews(images);
    setFormFields((prev) => ({
      ...prev,
      images,
    }));
  };

  const setbannerPreviewsFunction = (updateFn) => {
    setBannerPreviews((prev) => {
      const newArr = typeof updateFn === "function" ? updateFn(prev) : updateFn;
      setFormFields((prevFields) => ({
        ...prevFields,
        bannerimages: newArr,
      }));
      return newArr;
    });
  };

  const removeImg = (imageObj, index) => {
    deleteImages(
      `/api/category/deleteImage?public_id=${imageObj.public_id}`
    ).then((res) => {
      console.log(res);

      // Remove from UI state after successful delete
      if (res.success) {
        setPreviews((prev) => prev.filter((_, i) => i !== index));
      }
    });
  };
  const removebannerImg = (imageObj, index) => {
    deleteImages(
      `/api/category/deleteImage?public_id=${imageObj.public_id}`
    ).then((res) => {
      console.log(res);

      // Remove from UI state after successful delete
      if (res.success) {
        setBannerPreviews((prev) => prev.filter((_, i) => i !== index));
      }
    });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault(0);
  //   // console.log(formFields);

  //   if (formFields.name === "") {
  //     context.openAlertBox("error", "Please enter product name");
  //     return false;
  //   }
  //   if (formFields.description === "") {
  //     context.openAlertBox("error", "Please enter product description");
  //     return false;
  //   }
  //   if (previews?.length === 0) {
  //     context.openAlertBox("error", "Please enter product image");
  //     return false;
  //   }
  //   if (formFields.price === "") {
  //     context.openAlertBox("error", "Please enter product price");
  //     return false;
  //   }
  //   if (formFields.oldPrice === "") {
  //     context.openAlertBox("error", "Please enter product old price");
  //     return false;
  //   }
  //   if (formFields.rating === "") {
  //     context.openAlertBox("error", "Please enter product rating");
  //     return false;
  //   }
  //   if (formFields.discount === "") {
  //     context.openAlertBox("error", "Please enter product discount");
  //     return false;
  //   }
  //   if (formFields.countInStock === "") {
  //     context.openAlertBox("error", "Please enter product countInStock");
  //     return false;
  //   }
  //   setIsLoading(true);
  //   //  {   {
  //   //     name: formFields.name,
  //   //     images: previews, // send full previews array
  //   //     description: formFields.description,
  //   //     brand: formFields.brand,

  //   //   price: formFields.price,
  //   //     oldPrice: formFields.oldPrice,
  //   //      category: formFields.category,
  //   //     catName: formFields.catName,

  //   //  //
  //   //  catId: formFields.catId,
  //   //     subCatId: formFields.subCatId,

  //   //   subCat: formFields.subCat,
  //   //     thirdsubCat: formFields.thirdsubCat,
  //   //      countInStock: formFields.countInStock,
  //   //     rating: formFields.rating,
  //   // //
  //   //  isFeatured: formFields.isFeatured,
  //   //     discount: formFields.discount,
  //   //      productRam: formFields.productRam,
  //   //     size: formFields.size,
  //   //      productWeight: formFields.productWeight,

  //   //   })}
  //   postData("/api/product/create", formFields)
  //     .then((res) => {
  //       if (res?.error === false) {
  //         context.openAlertBox(
  //           "success",
  //           res?.message || "Product created successfully!"
  //         );
  //         setTimeout(() => {
  //           setIsLoading(false);
  //           context.setIsOpenFullScreenPanel({ open: false });
  //           history("/products");
  //         }, 1000);
  //       } else {
  //         context.openAlertBox("error", res?.message || "Something went wrong");
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       context.openAlertBox("error", "Network or server error");
  //       setIsLoading(false);
  //     });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (previews.length === 0) {
      context.openAlertBox("error", "Please upload product images");
      return;
    }

    const productData = {
      ...formFields,
      images: previews, // ✅ ensures images are included
      bannerimages: bannerPreviews,
    };

    setIsLoading(true);
    try {
      const res = await postData("/api/product/create", productData);
      if (res?.error === false) {
        context.openAlertBox(
          "success",
          res?.message || "Product created successfully!"
        );
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({ open: false });
          history("/products");
        }, 1000);
      } else {
        context.openAlertBox("error", res?.message || "Something went wrong");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox("error", "Network or server error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
      if (res?.error === false) {
        setProductRAM(res?.data);
      }
    });
  }, []);
  useEffect(() => {
    fetchDataFromApi("/api/product/productWeight/get").then((res) => {
      if (res?.error === false) {
        setProductWeight(res?.data);
      }
    });
  }, []);
  useEffect(() => {
    fetchDataFromApi("/api/product/productSize/get").then((res) => {
      if (res?.error === false) {
        setProductSize(res?.data);
      }
    });
  }, []);
  const handleChangeSwitch = (event) => {
    setCheckedSwitch(event.target.checked);
    formFields.isDisplayOnHomeBanner = event.target.checked;
  };

  return (
    <section className="p-5 px-20 bg-gray-50  overflow-hidden">
      <form action="" className="form p-8 py-3 " onSubmit={handleSubmit}>
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Name
              </h3>

              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
                name="name"
                value={formFields.name}
                onChange={onchangeInput}
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
                name="description"
                value={formFields.description}
                onChange={onchangeInput}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Category
              </h3>

              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full bg-white"
                  size="small"
                  value={productCat}
                  label="Age"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem
                        value={cat?._id}
                        onClick={() => selectCatByName(cat?.name)}
                      >
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Sub Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full bg-white"
                  size="small"
                  value={productSubCat}
                  label="Age"
                  onChange={handleChangeProductSubCat}
                >
                  {context?.catData?.map(
                    (cat) =>
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat) => (
                        <MenuItem
                          key={subCat?._id}
                          value={subCat?._id}
                          onClick={() => selectSubCatByName(subCat?.name)}
                        >
                          {subCat?.name}
                        </MenuItem>
                      ))
                  )}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Third Level Category
              </h3>

              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full bg-white"
                  size="small"
                  value={productThirdLevelCat}
                  label="Age"
                  onChange={handleChangeProductThirdLevelCat}
                >
                  {context?.catData?.map(
                    (cat) =>
                      cat?.children?.length !== 0 &&
                      cat?.children?.map(
                        (subCat) =>
                          subCat?.children?.length !== 0 &&
                          subCat?.children?.map((thirdLevelCat) => (
                            <MenuItem
                              value={thirdLevelCat?._id}
                              key={thirdLevelCat?._id}
                              onClick={() =>
                                selectCatByThirdLevel(thirdLevelCat?.name)
                              }
                            >
                              {thirdLevelCat?.name}
                            </MenuItem>
                          ))
                      )
                  )}
                </Select>
              )}
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Price
              </h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
                name="price"
                value={formFields.price}
                onChange={onchangeInput}
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Old Price
              </h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onchangeInput}
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
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Stock
              </h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
                name="countInStock"
                value={formFields.countInStock}
                onChange={onchangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Brand
              </h3>

              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
                name="brand"
                value={formFields.brand}
                onChange={onchangeInput}
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Discount
              </h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
                name="discount"
                value={formFields.discount}
                onChange={onchangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product RAMS
              </h3>
              {productRAM?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full bg-white "
                  size="small"
                  value={productRAM}
                  label="Age"
                  MenuProps={MenuProps}
                  onChange={handleChangeProductRAM}
                >
                  {productRAM?.map((ram) => (
                    <MenuItem value={ram?.name} key={ram?._id}>
                      {ram?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Weight
              </h3>
              {productWeight?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full bg-white "
                  size="small"
                  value={productWeight}
                  label="Age"
                  onChange={handleChangeProductWeight}
                >
                  {productWeight?.map((weight) => (
                    <MenuItem value={weight?.name} key={weight?._id}>
                      {weight?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Size
              </h3>
              {productSize?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full bg-[#fafafa]"
                  size="small"
                  value={productSize}
                  label="Age"
                  onChange={handleChangeProductSize}
                >
                  {productSize?.map((size) => (
                    <MenuItem value={size?.name} key={size?._id}>
                      {size?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Product Rating
              </h3>

              <Rating
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>

          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>

            <div className="grid grid-cols-6 gap-4">
              {previews?.length !== 0 &&
                previews?.map((img, index) => {
                  return (
                    <div key={index} className="uploadBoxWrapper relative">
                      <span
                        className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                        onClick={() => removeImg(img, index)}
                      >
                        <IoMdClose className="text-white text-[17px]" />
                      </span>
                      <div className="uploadBox p-0  rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[170px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                        <LazyLoadImage
                          className="w-full h-full object-cover"
                          alt={"category image"}
                          effect="blur"
                          src={img.url} // ✅ use url field from object
                        />
                      </div>
                    </div>
                  );
                })}

              <UploadBox
                multiple={true}
                name="images"
                url="/api/product/uploadImages"
                setPreviewsFunction={setPreviewsFunction}
              />
            </div>
          </div>
          <div className="col w-full p-5 px-0 bg-white">
            <div className="flex justify-between">
              {" "}
              <h3 className="font-[700] text-[18px] mb-3">Banner Images</h3>
              <Switch
                {...label}
                onChange={handleChangeSwitch}
                checked={checkedSwitch}
              />
            </div>

            <div className="grid grid-cols-6 gap-4">
              {bannerPreviews?.length > 0 &&
                bannerPreviews
                  .filter((bannerimg) => bannerimg && bannerimg.url)
                  .map((bannerimg, index) => {
                    return (
                      <div key={index} className="uploadBoxWrapper relative">
                        <span
                          className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                          onClick={() => removebannerImg(bannerimg, index)}
                        >
                          <IoMdClose className="text-white text-[17px]" />
                        </span>
                        <div className="uploadBox p-0  rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[170px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                          <LazyLoadImage
                            className="w-full h-full object-cover"
                            alt={"category image"}
                            effect="blur"
                            src={bannerimg.url} // ✅ use url field from object
                          />
                        </div>
                      </div>
                    );
                  })}

              <UploadBox
                multiple={true}
                name="bannerImages"
                url="/api/product/uploadBannerImages"
                setPreviewsFunction={setbannerPreviewsFunction}
              />
            </div>
            <h3 className="font-[700] text-[18px] mb-3">Banner Title</h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
              name="bannerTitlename"
              value={formFields.bannerTitlename}
              onChange={onchangeInput}
            />
          </div>
          <br />
        </div>
        <hr />
        <br />
        <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
          <FaCloudUploadAlt className="text-[25px] text-white" />
          {isLoading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            " Publish and View"
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
