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
import { deleteImages, editData, fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Switch demo" } };
const EditProduct = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const [productFeature, setProductFeature] = useState(false);
  const [productRAM, setProductRAM] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
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

  // ✅ Fetch product details on load
  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id; // ✅ same as EditCategory
    if (!id) return;

    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      console.log("Fetched product:", res);
      if (res?.error === false && res?.product) {
        const p = res.product;

        // ✅ Fill all form fields
        setFormFields({
          name: p.name || "",
          description: p.description || "",
          images: p.images || [],
          brand: p.brand || "",
          price: p.price || "",
          oldPrice: p.oldPrice || "",
          catName: p.catName || "",
          catId: p.catId || "",
          subCatId: p.subCatId || "",
          subCat: p.subCat || "",
          thirdsubCat: p.thirdsubCat || "",
          thirdsubCatId: p.thirdsubCatId || "",
          countInStock: p.countInStock || "",
          rating: p.rating || 0,
          isFeatured: p.isFeatured || false,
          isDisplayOnHomeBanner: p.isDisplayOnHomeBanner || false,
          discount: p.discount || "",
          productRam: p.productRam || [],
          size: p.size || [],
          productWeight: p.productWeight || [],
          bannerTitlename: p.bannerTitlename || "",
          bannerimages: p.bannerimages || [],
        });

        // ✅ Set related states
        setProductCat(p.catId);
        setProductSubCat(p.subCatId);
        setProductThirdLevelCat(p.thirdsubCatId);
        setProductFeature(p.isFeatured);
        setProductRAM(p.productRam);
        setProductWeight(p.productWeight);
        setProductSize(p.size);
        setCheckedSwitch(p.isDisplayOnHomeBanner || false);

        // ✅ Show previously uploaded images
        setPreviews(p.images || []);
        setBannerPreviews(p.bannerimages || []);
      }
    });
  }, [context?.isOpenFullScreenPanel?.id]);

  // ✅ Handle text inputs
  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle rating
  const onChangeRating = (e) => {
    setFormFields((prev) => ({ ...prev, rating: e.target.value }));
  };

  // ✅ Category selections
  const handleChangeProductCat = (event) => {
    const value = event.target.value;
    setProductCat(value);
    setFormFields((prev) => ({ ...prev, catId: value }));
  };

  const handleChangeProductSubCat = (event) => {
    const value = event.target.value;
    setProductSubCat(value);
    setFormFields((prev) => ({ ...prev, subCatId: value }));
  };

  const handleChangeProductThirdLevelCat = (event) => {
    const value = event.target.value;
    setProductThirdLevelCat(value);
    setFormFields((prev) => ({ ...prev, thirdsubCatId: value }));
  };

  const handleChangeProductFeature = (event) => {
    const value = event.target.value === "true";
    setProductFeature(value);
    setFormFields((prev) => ({ ...prev, isFeatured: value }));
  };

  // ✅ Multi-select
  const handleChangeMulti = (field, setter) => (event) => {
    const {
      target: { value },
    } = event;
    const arr = typeof value === "string" ? value.split(",") : value;
    setter(arr);
    setFormFields((prev) => ({ ...prev, [field]: arr }));
  };

  // ✅ Image handling
  const setPreviewsFunction = (uploadedImages) => {
    // ✅ ensure always an array
    const newUploads = Array.isArray(uploadedImages)
      ? uploadedImages
      : [uploadedImages];

    setPreviews((prev) => {
      const newArr = [...prev, ...newUploads];
      setFormFields((f) => ({ ...f, images: newArr }));
      return newArr;
    });
  };

  const removeImg = (imageObj, index) => {
    deleteImages(
      `/api/product/deleteImage?public_id=${imageObj.public_id}`
    ).then((res) => {
      console.log(res);

      // Remove from UI state after successful delete
      if (res?.success) {
        setPreviews((prev) => {
          const filtered = prev.filter((_, i) => i !== index);
          setFormFields((f) => ({ ...f, images: filtered }));
          return filtered;
        });
      }
    });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.name)
      return context.openAlertBox("error", "Enter product name");
    if (!formFields.description)
      return context.openAlertBox("error", "Enter product description");
    if (!previews.length)
      return context.openAlertBox("error", "Please upload product images");

    const id = context?.isOpenFullScreenPanel?.id;
    setIsLoading(true);

    try {
      const res = await editData(`/api/product/updateProduct/${id}`, {
        ...formFields,
        images: previews,
      });

      if (res?.error === false) {
        context.openAlertBox("success", "Product updated successfully!");
        console.log("updated", res);
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({ open: false });
          navigate("/products");
        }, 800);
      } else {
        context.openAlertBox("success", res?.message || "Update failed");
        console.log("failed", res);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox("error", "Network or server error");
      setIsLoading(false);
    }
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
  const handleChangeSwitch = (event) => {
    setCheckedSwitch(event.target.checked);
    formFields.isDisplayOnHomeBanner = event.target.checked;
  };
  // ✅ UI
  return (
    <section className="p-5 px-20 bg-gray-50 overflow-hidden">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4">
          {/* Product Name */}
          <div className="mb-3">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Name
            </h3>
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={onchangeInput}
              className="w-full h-[40px] border rounded-sm p-3 text-sm bg-white"
            />
          </div>

          {/* Product Description */}
          <div className="mb-3">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Description
            </h3>
            <textarea
              name="description"
              value={formFields.description}
              onChange={onchangeInput}
              className="w-full h-[140px] border rounded-sm p-3 text-sm bg-white"
            />
          </div>

          {/* Category / Price */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Category
              </h3>
              <Select
                className="w-full bg-white"
                size="small"
                value={productCat}
                onChange={handleChangeProductCat}
              >
                {context?.catData?.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Sub Category
              </h3>
              <Select
                className="w-full bg-white"
                size="small"
                value={productSubCat}
                onChange={handleChangeProductSubCat}
              >
                {context?.catData?.flatMap((cat) =>
                  cat?.children?.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </div>

            <div>
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Third Level Category
              </h3>
              <Select
                className="w-full bg-white"
                size="small"
                value={productThirdLevelCat}
                onChange={handleChangeProductThirdLevelCat}
              >
                {context?.catData?.flatMap((cat) =>
                  cat?.children?.flatMap((sub) =>
                    sub?.children?.map((third) => (
                      <MenuItem key={third._id} value={third._id}>
                        {third.name}
                      </MenuItem>
                    ))
                  )
                )}
              </Select>
            </div>

            <div>
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Price
              </h3>
              <input
                type="number"
                name="price"
                value={formFields.price}
                onChange={onchangeInput}
                className="w-full h-[40px] border rounded-sm p-3 text-sm bg-white"
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>
            <div className="grid grid-cols-6 gap-4">
              {previews.map((img, index) => (
                <div key={index} className="relative">
                  <span
                    className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                    onClick={() => removeImg(img, index)}
                  >
                    <IoMdClose className="text-white text-[17px]" />
                  </span>
                  <div className="border h-[150px] w-[170px] rounded-md overflow-hidden">
                    <LazyLoadImage
                      src={img?.url}
                      alt="product image"
                      effect="blur"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}

              {/* Upload new images */}
              <UploadBox
                multiple={true}
                name="images"
                url="/api/product/uploadImages"
                setPreviewsFunction={setPreviewsFunction}
              />
            </div>
          </div>
          <div className="col w-full p-5 px-0">
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
        </div>

        <hr className="my-4" />
        <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
          <FaCloudUploadAlt className="text-[25px] text-white" />
          {isLoading ? <CircularProgress color="inherit" /> : "Update Product"}
        </Button>
      </form>
    </section>
  );
};

export default EditProduct;
