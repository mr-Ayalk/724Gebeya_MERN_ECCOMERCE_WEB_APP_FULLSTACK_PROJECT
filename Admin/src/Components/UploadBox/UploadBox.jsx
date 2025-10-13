
import { useContext, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { uploadImage } from "../../utils/api";
import { MyContext } from "../../App";
import { CircularProgress } from "@mui/material";

const UploadBox = (props) => {
  const context = useContext(MyContext);
  const [uploading, setUploading] = useState(false);

  const onChangeFile = async (e, apiEndPoint) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          )
        ) {
          context.openAlertBox(
            "error",
            "Please select a valid image file (JPG, PNG, WEBP)."
          );
          continue;
        }

        const formData = new FormData();
        formData.append(props?.name, file);

        const res = await uploadImage(apiEndPoint, formData);
        console.log("UPLOAD RESPONSE:", res);

      const images = res?.data?.data?.images || res?.data?.images || res?.images;
        if (images) {
          props.setPreviewsFunction((prev) => [
            ...prev,
            ...(Array.isArray(images) ? images : [images]),
          ]);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      context.openAlertBox("error", "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = null; // reset file input
    }
  };

  return (
    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
      {uploading ? (
        <>
          <CircularProgress size={30} />
          <h4 className="text-center mt-2 text-sm">Uploading...</h4>
        </>
      ) : (
        <>
          <FaRegImages className="text-[40px] opacity-35 pointer-events-none" />
          <h4 className="text-[14px] pointer-events-none">Image Upload</h4>
          <input
            type="file"
            accept="image/*"
            multiple={props.multiple || false}
            className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
            onChange={(e) => onChangeFile(e, props?.url)}
            name={props?.name}
          />
        </>
      )}
    </div>
  );
};

export default UploadBox;
