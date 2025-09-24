import { useContext, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { uploadImage } from "../../utils/api";
import { MyContext } from "../../App";
//
const UploadBox = (props) => {
  const context = useContext(MyContext);

  const [previews, setPreviews] = useState([]);

  const [uploading, setUploading] = useState(false);

  // ✅ File Upload
  // const onChangeFile = async (e, apiEndPoint) => {
  //   // alert(apiEndPoint);
  //   try {
  //     setPreviews([]);
  //     setUploading(true);
  //     const files = e.target.files;

  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];

  //       if (
  //         ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
  //           file.type
  //         )
  //       ) {
  //         const formdata = new FormData();
  //         formdata.append(props?.name, file);

  //         const res = await uploadImage(apiEndPoint, formdata);

  //         if (res?.data?.images) {
  //           props.setPreviewsFunction((prev) => [
  //             ...prev,
  //             ...(Array.isArray(res.data.images)
  //               ? res.data.images
  //               : [res.data.images]),
  //           ]);
  //         }
  //       } else {
  //         context.openAlertBox({
  //           open: true,
  //           error: true,
  //           msg: "Please select a valid JPG, PNG, or WEBP image file.",
  //         });
  //         setUploading(false);
  //         return;
  //       }
  //     }
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      setUploading(true);
      const files = e.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          )
        ) {
          const formdata = new FormData();
          formdata.append(props?.name, file);

          const res = await uploadImage(apiEndPoint, formdata);

          if (res?.data?.images) {
            props.setPreviewsFunction((prev) => [
              ...prev,
              ...(Array.isArray(res.data.images)
                ? res.data.images
                : [res.data.images]),
            ]);
          }
        } else {
          context.openAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG, PNG, or WEBP image file.",
          });
          setUploading(false);
          return;
        }
      }

      // ✅ Reset file input so user can re-upload without refreshing
      e.target.value = null;

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
      <FaRegImages className="text-[40px] opacity-35 pointer-events-none" />
      <h4 className="text-[14px] pointer-events-none">Image Upload</h4>
      <input
        type="file"
        accept="image/*"
        multiple={props.multiple !== undefined ? props.multiple : false}
        className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
        onChange={(e) => onChangeFile(e, props?.url)}
        name={props?.name}
      />
    </div>
  );
};

export default UploadBox;
