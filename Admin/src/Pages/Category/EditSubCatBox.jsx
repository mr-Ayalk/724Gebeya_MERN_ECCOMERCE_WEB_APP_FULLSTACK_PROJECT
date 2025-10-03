// import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { MdOutlineModeEdit } from "react-icons/md";
// import { MyContext } from "../../App";
// import { deleteData, editData } from "../../utils/api";

// const EditSubCatBox = (props) => {
//   const [editMode, setEditMode] = useState(false);
//   const context = useContext(MyContext);
//   const [selectVal, setSelectVal] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [formFields, setFormFields] = useState({
//     name: "",
//     parentCatName: null,
//     parentId: null,
//   });
//   useEffect(() => {
//     formFields.name = props?.name;
//     formFields.parentCatName = props?.selectedCatName;
//     formFields.parentId = props?.selectedCat;
//     setSelectVal(props?.selectedCat);
//   }, []);
//   const handleChange = (event) => {
//     setSelectVal(event.target.value);
//     formFields.parentId = event.target.value;
//     //formFields.parentId = event.target.value;
//   };
//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     const catId = selectVal;
//     selectVal(catId);
//     setFormFields(() => {
//       return {
//         ...formFields,
//         [name]: value,
//       };
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (formFields.name === "") {
//       context.openAlertBox("error", "Please enter category name");
//       return false;
//     }
//     editData(`/api/category/${props?.id}`, formFields).then((res) => {
//       setTimeout(() => {
//         context.openAlertBox("success", res?.data?.message);
//         context?.getCat();
//         setIsLoading(false);
//       }, 1000);
//     });
//   };

//   const deleteCat = (id) => {
//     deleteData(`/api/category/${id}`).then((res) => {
//       context?.getCat();
//     });
//   };
//   return (
//     <>
//       <form
//         action=""
//         className="w-100 flex items-center gap-3 p-0 px-4"
//         onSubmit={handleSubmit}
//       >
//         {editMode === true && (
//           <>
//             <div className="flex items-center justify-between py-2 gap-4">
//               <div className="w-[150px]">
//                 <Select
//                   style={{ zoom: "75%" }}
//                   className="w-full"
//                   size="small"
//                   value={selectVal}
//                   onChange={handleChange}
//                   displayEmpty
//                   inputProps={{ "aria-label": "Without-label" }}
//                 >
//                   {props?.catData?.length !== 0 &&
//                     props?.catData?.map((item, index) => {
//                       return (
//                         <MenuItem
//                           value={item?._id}
//                           key={index}
//                           onClick={() => {
//                             formFields.parentCatName = item?.name;
//                           }}
//                         >
//                           {item?.name}
//                         </MenuItem>
//                       );
//                     })}
//                 </Select>
//               </div>
//               <input
//                 type="text"
//                 className="w-full h-[30px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
//                 name="name"
//                 value={formFields?.name}
//                 onChange={onChangeInput}
//               />

//               <div className="flex items-center gap-2">
//                 <Button
//                   size="small"
//                   className="btn-sml"
//                   type="submit"
//                   variant="contained"
//                 >
//                   {isLoading === true ? (
//                     <CircularProgress color="inherit" />
//                   ) : (
//                     <>Edit</>
//                   )}
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="outline"
//                   onClick={() => {
//                     setEditMode(false);
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </>
//         )}
//         <span className="font-[500] text-[14px] ">{props?.name}</span>
//         {editMode === false && (
//           <>
//             <span className="font-[500] text-[14px] ">{props.name}</span>
//             <div className="flex items-center ml-auto gap-2">
//               <Button
//                 className="!min-w-[35px] !w-[35px] !rounded-full !text-black"
//                 onClick={() => {
//                   setEditMode(true);
//                   // setSelectVal(props.selectedCat)
//                 }}
//               >
//                 <MdOutlineModeEdit />
//               </Button>
//               <Button className="!min-w-[35px] !w-[35px] !h-[35px]  !rounded-full !text-black">
//                 <FaRegTrashAlt />
//               </Button>
//             </div>
//           </>
//         )}
//       </form>
//     </>
//   );
// };

// export default EditSubCatBox;
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { MyContext } from "../../App";
import { deleteData, editData } from "../../utils/api";

const EditSubCatBox = ({ id, name, selectedCat, selectedCatName, catData }) => {
  const [editMode, setEditMode] = useState(false);
  const context = useContext(MyContext);
  const [selectVal, setSelectVal] = useState(selectedCat || "");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: name || "",
    parentCatName: selectedCatName || "",
    parentId: selectedCat || null,
  });

  useEffect(() => {
    // Update state if props change
    setFormFields({
      name: name || "",
      parentCatName: selectedCatName || "",
      parentId: selectedCat || null,
    });
    setSelectVal(selectedCat || "");
  }, [name, selectedCat, selectedCatName]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectVal(value);

    const selected = catData.find((cat) => cat._id === value);
    setFormFields((prev) => ({
      ...prev,
      parentId: value,
      parentCatName: selected?.name || "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.name.trim()) {
      context.openAlertBox("error", "Please enter category name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await editData(`/api/category/${id}`, formFields);
      context.openAlertBox("success", res?.data?.message);
      context.getCat();
      setEditMode(false);
    } catch (err) {
      context.openAlertBox("error", err?.message || "Failed to edit category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    // if (!window.confirm("Are you sure you want to delete this category?"))
    //   return;
    try {
      await deleteData(`/api/category/${id}`);
      context.openAlertBox("sucess", "successfully deleted");
      context.getCat();
    } catch (err) {
      context.openAlertBox(
        "error",
        err?.message || "Failed to delete category"
      );
    }
  };

  return (
    <form
      className="w-full flex items-center gap-3 p-0 px-4"
      onSubmit={handleSubmit}
    >
      {editMode ? (
        <div className="flex items-center justify-between py-2 gap-4 w-full">
          <div className="w-[150px]">
            <Select
              style={{ zoom: "75%" }}
              className="w-full"
              size="small"
              value={selectVal}
              onChange={handleSelectChange}
              displayEmpty
              inputProps={{ "aria-label": "Without-label" }}
            >
              {catData?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <input
            type="text"
            className="w-full h-[30px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
            name="name"
            value={formFields.name}
            onChange={handleInputChange}
          />

          <div className="flex items-center gap-2">
            <Button
              size="small"
              className="btn-sml"
              type="submit"
              variant="contained"
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Edit"
              )}
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full">
          <span className="font-[500] text-[14px]">{name}</span>
          <div className="flex items-center ml-auto gap-2">
            <Button
              className="!min-w-[35px] !w-[35px] !rounded-full !text-black"
              onClick={() => setEditMode(true)}
            >
              <MdOutlineModeEdit />
            </Button>
            <Button
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
              onClick={handleDelete}
            >
              <FaRegTrashAlt />
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default EditSubCatBox;
