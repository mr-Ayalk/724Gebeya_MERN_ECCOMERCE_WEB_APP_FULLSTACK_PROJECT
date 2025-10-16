import UploadBox from "../../Components/UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { MyContext } from "../../App";
const EditCategory = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    // parentCatName: "",
    // parentId: "",
  });
  const setPreviewsFunction = (images) => {
    setPreviews(images);
    setFormFields((prev) => ({
      ...prev,
      images,
    }));
  };
  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;
    fetchDataFromApi(`/api/category/${id}`).then((res) => {
      // console.log(res);
      formFields.name = res?.category?.name;
      setPreviews(res?.category?.images);
    });
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name.trim() === "") {
      context.openAlertBox("error", "Category name is required");
      setIsLoading(false);
      return;
    }
    if (previews.length === 0) {
      context.openAlertBox("error", "Category image is required");
      setIsLoading(false);
      return;
    }

    // ✅ Make sure formFields.images is an array of objects [{url, public_id}, ...]
    editData(`/api/category/${context?.isOpenFullScreenPanel?.id}`, {
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
        }, 2500);
      }
    });
  };

  return (
    <section className="p-5 px-20 bg-gray-50  overflow-hidden">
      <form action="" className="form p-8 py-3 " onSubmit={handleSubmit}>
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4 pt-3">
          <div className="col  w-1/4">
            <h3 className="text-[14px] font-[500] mb-1 !text-black">
              Category Name
            </h3>

            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white "
              name="name"
              value={formFields.name}
              onChange={onChangeInput}
            />
          </div>
          <br />
          <h3 className="text-[18px] font-[500] mb-1 !text-black">
            Category Image
          </h3>
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
              url="/api/category/uploadImages"
              setPreviewsFunction={setPreviewsFunction}
            />
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
    </section>
  );
};

export default EditCategory;
