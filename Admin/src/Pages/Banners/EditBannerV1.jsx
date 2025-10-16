import React, { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { IoMdClose } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../Components/UploadBox/UploadBox";
import { MenuItem, Select } from "@mui/material";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
const EditBannerV1 = () => {
  const context = useContext(MyContext);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const [formFields, setFormFields] = useState({
    catId: "",
    bannerTitle: "",
    images: [],
    subCatId: "",
    thirdsubCatId: "",
    price: "",
  });
  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;
    fetchDataFromApi(`/api/bannerV1/${id}`).then((res) => {
      const banner = res?.banner || {};
      setFormFields({
        bannerTitle: banner.bannerTitle || "",
        catId: banner.catId || "",
        subCatId: banner.subCatId || "",
        thirdsubCatId: banner.thirdsubCatId || "",
        price: banner.price || "",
        images: banner.images || [],
      });
      setProductCat(banner.catId || "");
      setProductSubCat(banner.subCatId || "");
      setProductThirdLevelCat(banner.thirdsubCatId || "");
      setPreviews(banner.images || []);
    });
  }, []);

  const setPreviewsFunction = (images) => {
    setPreviews(images);
    setFormFields((prev) => ({
      ...prev,
      images,
    }));
  };
  const handleChangeProductCat = (event) => {
    const value = event.target.value;
    setProductCat(value);
    setFormFields((prev) => ({
      ...prev,

      catId: value,
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: e.target.value,
      };
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

  const handleChangeProductSubCat = (event) => {
    const value = event.target.value;
    setProductSubCat(value);
    setFormFields((prev) => ({
      ...prev,
      subCatId: value,
    }));
  };

  const handleChangeProductThirdLevelCat = (event) => {
    const value = event.target.value;
    setProductThirdLevelCat(value);
    setFormFields((prev) => ({
      ...prev,
      thirdsubCatId: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ✅ Make sure formFields.images is an array of objects [{url, public_id}, ...]
    editData(`/api/bannerV1/${context?.isOpenFullScreenPanel?.id}`, {
      bannerTitle: formFields.bannerTitle,
      images: previews, // send full previews array
      catId: formFields.catId,
      subCatId: formFields.subCatId,
      thirdsubCatId: formFields.thirdsubCatId,
      price: formFields.price,
    }).then((res) => {
      if (res?.error) {
        context.openAlertBox("error", res?.message || "Failed to edit banner");
        setIsLoading(false);
      }
      if (res?.error === false) {
        setTimeout(() => {
          setIsLoading(false);
          context.openAlertBox("success", res?.message || "Banner Edited");

          context.setIsOpenFullScreenPanel({
            open: false,
          });
        }, 2500);
      }
    });
  };
  return (
    <div>
      <section className="p-5 px-20 bg-gray-50  overflow-hidden">
        <form action="" className="form p-8 py-3 " onSubmit={handleSubmit}>
          <div className="scroll max-h-[75vh] overflow-y-scroll pr-4 pt-3">
            <div className="grid grid-cols-4 mb-3 gap-5">
              <div className="col ">
                <h3 className="text-[14px] font-[500] mb-1 !text-black">
                  Banner Title
                </h3>

                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
                  name="bannerTitle"
                  value={formFields.bannerTitle}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col  ">
                <h3 className="text-[14px] font-[500] mb-1 !text-black">
                  Category
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
                        <MenuItem value={cat?._id} key={cat?._id || index}>
                          {cat?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col  ">
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
                          <MenuItem key={subCat?._id} value={subCat?._id}>
                            {subCat?.name}
                          </MenuItem>
                        ))
                    )}
                  </Select>
                )}
              </div>
              <div className="col  ">
                <h3 className="text-[14px] font-[500] mb-1 !text-black">
                  Product Third Sub Category
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
                              >
                                {thirdLevelCat?.name}
                              </MenuItem>
                            ))
                        )
                    )}
                  </Select>
                )}
              </div>
              <br />
            </div>
            <div className="col w-1/4 ">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">Price</h3>

              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>
            <br />
            <h3 className="text-[18px] font-[500] mb-1 !text-black">Image</h3>
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
                url="/api/category/uploadImages"
                setPreviewsFunction={setPreviewsFunction}
              />
            </div>
            <br />
          </div>
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
      </section>
    </div>
  );
};

export default EditBannerV1;
