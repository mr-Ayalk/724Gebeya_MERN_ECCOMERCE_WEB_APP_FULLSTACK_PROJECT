import { useContext, useEffect, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
//
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
const EditProduct = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeature, setProductFeature] = useState("");
  const [productRAM, setProductRAM] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const context = useContext(MyContext);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
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
  });
  const handleChangeProductSize = (event) => {
    // setProductSize(event.target.value);

    const {
      target: { value },
    } = event;
    setProductSize(typeof value === "string" ? value.split(",") : value);
    formFields.productSize = value;
  };
  const { id } = useParams();
  useEffect(() => {
    fetchDataFromApi(
      `/api/product/${context?.setIsOpenFullScreenPanel?._id}`
    ).then((res) => {
      // console.log(res);
      setFormFields({
        name: res?.product?.name,
        description: res?.product?.description,
        images: res?.product?.images,
        brand: res?.product?.brand,
        price: res?.product?.price,
        oldPrice: res?.product?.oldPrice,
        category: res?.product?.category,
        catName: res?.product?.catName,
        catId: res?.product?.catId,
        subCatId: res?.product?.subCatId,
        thirdsubCat: res?.product?.thirdsubCat,
        thirdsubCatId: res?.product?.thirdsubCatId,
        countInStock: res?.product?.countInStock,
        rating: res?.product?.rating,
        isFeatured: res?.product?.isFeatured,
        discount: res?.product?.discount,
        productRam: res?.product?.productRam,
        size: res?.product?.size,
        productWeight: res?.product?.productWeight,
      });
      setProductCat(res?.product?.catId);
      setProductSubCat(res?.product?.subCatId);
      setProductThirdLevelCat(res?.product?.thirdsubCatId);
      setProductFeature(res?.product?.isFeatured);
      setProductRAM(res?.product?.productRam);
      setProductSize(res?.product?.size);
      setProductWeight(res?.product?.productWeight);
      setPreviews(res?.product?.images);
    });
  }, []);
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
    setProductFeature(event.target.value);
    formFields.isFeatured = event.target.value;
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
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
  // const setPreviewsFunction = (images) => {
  //   setPreviews(images);
  //   setFormFields((prev) => ({
  //     ...prev,
  //     images,
  //   }));
  // };
  const setPreviewsFunction = (images) => {
    const imgArr = previews;
    for (let i = 0; i < images.length; i++) {
      imgArr.push(images[i]);
    }
    setPreviews([
      setTimeout(() => {
        setPreviews(imgArr);
        formFields.images = imgArr;
      }, 10),
    ]);
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
  const handleSubmit = (e) => {
    e.preventDefault(0);
    // console.log(formFields);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter product name");
      return false;
    }
    if (formFields.description === "") {
      context.openAlertBox("error", "Please enter product description");
      return false;
    }
    if (previews?.length === 0) {
      context.openAlertBox("error", "Please enter product image");
      return false;
    }
    setIsLoading(true);
    editData(
      `/api/product/updateProduct/${context?.setIsOpenFullScreenPanel?._id}`,
      formFields
    ).then((res) => {
      // console.log(res);
      if (res?.data?.error === false) {
        context.openAlertBox(
          "error",
          res?.data?.message || "Please select category image"
        );

        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
          history("/products");
        }, 1000);
      }
    });
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
                        key={index}
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
                  {context?.catData?.map((cat, index) => {
                    return;
                    cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat, index_) => {
                        return (
                          <MenuItem
                            value={subCat?._id}
                            onClick={() => selectSubCatByName(subCat?.name)}
                          >
                            {subCat?.name}
                          </MenuItem>
                        );
                      });
                  })}
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
                  {context?.catData?.map((cat) => {
                    return;
                    cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length !== 0 &&
                          subCat?.children?.map((thirdLevelCat, index) => {
                            return (
                              <>
                                <MenuItem
                                  value={thirdLevelCat?._id}
                                  key={index}
                                  onClick={() =>
                                    selectCatByThirdLevel(thirdLevelCat?.name)
                                  }
                                >
                                  {thirdLevelCat?.name}
                                </MenuItem>
                              </>
                            );
                          })
                        );
                      });
                  })}
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
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
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
                multiple
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-white "
                size="small"
                value={productWeight}
                label="Age"
                onChange={handleChangeProductWeight}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
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
                multiple
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productSize}
                label="Age"
                onChange={handleChangeProductSize}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
              </Select>
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

            {/* <div className="grid grid-cols-6 gap-4">
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
            </div> */}

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

              {/* <UploadBox
                          multiple={true}
                          name="images"
                          url="/api/category/uploadImages"
                          setPreviewsFunction={setPreviewsFunction}
                        /> */}
              <UploadBox
                multiple={true}
                name="images"
                url="/api/product/uploadImages"
                setPreviewsFunction={setPreviewsFunction}
              />
            </div>
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

export default EditProduct;
