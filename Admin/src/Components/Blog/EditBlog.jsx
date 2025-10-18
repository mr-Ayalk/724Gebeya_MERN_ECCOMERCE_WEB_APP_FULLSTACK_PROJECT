import UploadBox from "../UploadBox/UploadBox";
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

// ✅ Import EditorProvider and Editor
import { EditorProvider, Editor } from "react-simple-wysiwyg";

const EditBlog = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [html, setHtml] = useState("");
  const [formFields, setFormFields] = useState({
    title: "",
    images: [],
    description: "",
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
    fetchDataFromApi(`/api/blog/${id}`).then((res) => {
      setFormFields((prev) => ({
        ...prev,
        title: res?.blog?.title || "",
      }));
      setPreviews(res?.blog?.images || []);
      setHtml(res?.blog?.description || "");
    });
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeImg = (imageObj, index) => {
    deleteImages(
      `/api/category/deleteImage?public_id=${imageObj.public_id}`
    ).then((res) => {
      if (res.success) {
        setPreviews((prev) => prev.filter((_, i) => i !== index));
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.title.trim() === "") {
      context.openAlertBox("error", "Blog title is required");
      setIsLoading(false);
      return;
    }
    if (previews.length === 0) {
      context.openAlertBox("error", "Blog image is required");
      setIsLoading(false);
      return;
    }

    editData(`/api/blog/${context?.isOpenFullScreenPanel?.id}`, {
      title: formFields.title,
      images: previews,
      description: html,
    }).then((res) => {
      if (res?.error) {
        context.openAlertBox("error", res?.message || "Failed to add blogs");
        setIsLoading(false);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          context.openAlertBox("success", res?.message || "Blogs updated");
          context.setIsOpenFullScreenPanel({
            open: false,
          });
        }, 2500);
      }
    });
  };

  const onChangeDescription = (e) => {
    setHtml(e.target.value);
  };

  return (
    <section className="p-5 px-20 bg-gray-50 overflow-hidden">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4 pt-3">
          <div className="col w-full mb-4">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Banner Title
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
              name="title"
              value={formFields.title}
              onChange={onChangeInput}
            />
          </div>

          <div className="col w-full mb-4">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Blog Description
            </h3>

            {/* ✅ Wrap Editor with EditorProvider */}
            <EditorProvider>
              <Editor
                value={html}
                onChange={onChangeDescription}
                containerProps={{ style: { resize: "vertical" } }}
              />
            </EditorProvider>
          </div>

          <h3 className="text-[18px] font-[500] mb-1 text-black">Blog Image</h3>
          <div className="grid grid-cols-6 gap-4">
            {previews?.map((img, index) => (
              <div key={index} className="uploadBoxWrapper relative">
                <span
                  className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                  onClick={() => removeImg(img, index)}
                >
                  <IoMdClose className="text-white text-[17px]" />
                </span>
                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-gray-400 h-[150px] w-[170px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt="blog image"
                    effect="blur"
                    src={img.url}
                  />
                </div>
              </div>
            ))}

            <UploadBox
              multiple={true}
              name="images"
              url="/api/category/uploadImages"
              setPreviewsFunction={setPreviewsFunction}
            />
          </div>
        </div>

        <div className="w-[250px] mt-6">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Publish and View"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditBlog;
