// import { Button, Checkbox, CircularProgress } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { AiOutlineEdit } from "react-icons/ai";
// import { FaCloudUploadAlt, FaRegEye, FaTrash } from "react-icons/fa";
// import Tooltip1 from "@mui/material/Tooltip";
// import { Link } from "react-router-dom";
// import { MyContext } from "../../App";
// import {
//   deleteData,
//   editData,
//   fetchDataFromApi,
//   postData,
// } from "../../utils/api";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };
// const AddRAMS = () => {
//   const context = useContext(MyContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [name, setName] = useState();
//   const [data, setData] = useState([]);
//   const [editId, seteditId] = useState("");
//   useEffect(() => {
//     fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
//       //   console.log(res);
//       if (res?.error === false) {
//         setData(res?.data);
//       }
//     });
//   }, []);
//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
//       console.log(res);
//       if (res?.error === false) {
//         setData(res?.data);
//       }
//     });
//   };
//   const deleteRamData = (id) => {
//     deleteData(`/api/product/productRAMS/${id}`).then((res) => {
//       // console.log(res)
//       getData();
//       context.openAlertBox("success", "Item deleted successfully");
//     });
//   };
//   const handleSubmit = (e) => {
//     setIsLoading(true);
//     e.preventDefault();
//     if (name === "") {
//       context.openAlertBox("error", "Please enter product RAM");

//       return false;
//     }
//     if (editId === "") {
//       postData(`/api/product/productRAMS/create`, {
//         name: name,
//       }).then((res) => {
//         if (res?.error === false) {
//           context.openAlertBox(
//             "success",
//             res?.message || "Product RAM added successfully"
//           );
//           setTimeout(() => {
//             setIsLoading(false);
//             getData();
//             setName("");
//           }, [300]);
//         } else {
//           context.openAlertBox("error", res?.message || "Something went wrong");
//         }

//         setTimeout(() => {
//           setIsLoading(false);
//           getData();
//           setName("");
//         }, [300]);
//         console.log(res);
//       });
//     }
//     if (editId !== "") {
//       editData(`/api/product/productRAMS/${editId}`, {
//         name: name,
//       }).then((res) => {
//         if (res?.data?.error === false) {
//           context.openAlertBox(
//             "success",
//             res?.data?.message || "Product RAM added successfully"
//           );
//           setTimeout(() => {
//             setIsLoading(false);
//             getData();
//             setName("");
//           }, [300]);
//         } else {
//           context.openAlertBox(
//             "error",
//             res?.data?.message || "Something went wrong"
//           );
//         }
//       });
//     }
//   };
//   const editItem = (id) => {
//     fetchDataFromApi(`/api/product/productRAMS/${id}`).then((res) => {
//       console.log(res);
//       setName(res?.data?.name);
//       seteditId(res?.data?._id);
//     });
//   };
//   return (
//     <>
//       <div className="flex items-center justify-between px-2 py-0 mt-3">
//         <h2 className="text-[18px] font-[600]">Add Product RAMS</h2>
//       </div>
//       <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white w-[65%]">
//         <form onSubmit={handleSubmit} className="form py-3 p-6">
//           <div className="col">
//             <h3 className="text-[14px] font-[500] !text-black mb-1">
//               Product RAM
//             </h3>
//             <input
//               type="text"
//               className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm mb-2"
//               name="name"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//             />
//           </div>
//           <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
//             <FaCloudUploadAlt className="text-[25px] text-white" />
//             {isLoading === true ? (
//               <CircularProgress color="inherit" />
//             ) : (
//               " Publish and View"
//             )}
//           </Button>
//         </form>
//       </div>
//       {data?.length !== 0 && (
//         <>
//           <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white w-[65%]">
//             <div className="relative overflow-x-auto mt-5 pb-5">
//               <table className="w-full text-sm text-left text-gray-500  rtl:text-right  dark:text-gray-400">
//                 <thead className="text-xs text-black font-semibold uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400">
//                   <tr>
//                     <td scope="col" className="px-6 py-3 pr-0" width="10%">
//                       <div className="w-[60px]">
//                         <Checkbox {...label} size="small" />
//                       </div>
//                     </td>
//                     <td
//                       scope="col"
//                       className="px-0 py-2 white-space-nowrap"
//                       width={"60%"}
//                     >
//                       <div>Product RAM</div>
//                     </td>
//                     <td
//                       scope="col"
//                       className="px-0 py-2 white-space-nowrap"
//                       width={"30%"}
//                     >
//                       <div>Action</div>
//                     </td>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data?.map((item, index) => {
//                     return (
//                       <tr
//                         key={index}
//                         className="odd:bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50  dark:hover:bg-gray-600"
//                       >
//                         <td className="px-6 py-3 pr-0">
//                           <div className="w-[60px]">
//                             <Checkbox {...label} size="small" />
//                           </div>
//                         </td>
//                         <td className="px-0 py-2 ">{item?.name}</td>
//                         <td className="px-0 py-2 ">
//                           {" "}
//                           <div className="flex items-center gap-4">
//                             <Tooltip1
//                               title="Edit Product"
//                               placement="top-start"
//                             >
//                               <Button
//                                 className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]"
//                                 onClick={() => editItem(item?._id)}
//                                 // onClick={() =>
//                                 //   context.setIsOpenFullScreenPanel({
//                                 //     open: true,
//                                 //     model: "Edit Product",
//                                 //     id: product?._id,
//                                 //   })
//                                 // }
//                               >
//                                 <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
//                               </Button>
//                             </Tooltip1>

//                             <Tooltip1
//                               title="Remove Product"
//                               placement="top-start"
//                             >
//                               <Button
//                                 className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]"
//                                 onClick={() => deleteRamData(item?._id)}
//                               >
//                                 <FaTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
//                               </Button>
//                             </Tooltip1>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default AddRAMS;
import { Button, Checkbox, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import Tooltip1 from "@mui/material/Tooltip";
import { MyContext } from "../../App";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddRAMS = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");

  // ✅ Fetch Data Once
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = () => {
  //   fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
  //     if (res?.error === false) {
  //       setData(res?.data || []);
  //     } else {
  //       context.openAlertBox("error", res?.message || "Failed to fetch data");
  //     }
  //   });
  // };

  // const deleteRamData = (id) => {
  //   deleteData(`/api/product/productRAMS/${id}`).then((res) => {
  //     if (res?.error === false) {
  //       context.openAlertBox("success", "Item deleted successfully");
  //       getData();
  //     } else {
  //       context.openAlertBox("error", res?.message || "Failed to delete item");
  //     }
  //   });
  // };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
      console.log(res);
      if (res?.error === false) {
        setData(res?.data);
      }
    });
  };
  const deleteRamData = (id) => {
    deleteData(`/api/product/productRAMS/${id}`).then((res) => {
      // console.log(res)
      getData();
      context.openAlertBox("success", "Item deleted successfully");
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || name.trim() === "") {
      context.openAlertBox("error", "Please enter product RAM");
      return;
    }

    setIsLoading(true);

    // ✅ ADD New RAM
    if (!editId) {
      postData(`/api/product/productRAMS/create`, { name: name.trim() }).then(
        (res) => {
          if (res?.error === false) {
            context.openAlertBox(
              "success",
              res?.message || "Product RAM added successfully"
            );
            setName("");
            getData();
          } else {
            context.openAlertBox(
              "error",
              res?.message || "Something went wrong"
            );
          }
          setIsLoading(false);
        }
      );
    }

    // ✅ UPDATE Existing RAM
    else {
      editData(`/api/product/productRAMS/${editId}`, {
        name: name.trim(),
      }).then((res) => {
        if (res?.error === false) {
          context.openAlertBox(
            "success",
            res?.message || "Product RAM updated successfully"
          );
          setName("");
          setEditId("");
          getData();
        } else {
          context.openAlertBox("error", res?.message || "Something went wrong");
        }
        setIsLoading(false);
      });
    }
  };

  const editItem = (id) => {
    fetchDataFromApi(`/api/product/productRAMS/${id}`).then((res) => {
      if (res?.error === false && res?.data) {
        setName(res.data.name || "");
        setEditId(res.data._id || "");
      } else {
        context.openAlertBox("error", res?.message || "Failed to load item");
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">
          {editId ? "Edit Product RAM" : "Add Product RAM"}
        </h2>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <form onSubmit={handleSubmit} className="form py-3 p-6">
          <div className="col">
            <h3 className="text-[14px] font-[500] text-black mb-1">
              Product RAM
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm mb-2"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter RAM name"
            />
          </div>

          <Button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2 items-center justify-center"
            disabled={isLoading}
          >
            <FaCloudUploadAlt className="text-[20px] text-white" />
            {isLoading ? (
              <CircularProgress color="inherit" size={22} />
            ) : editId ? (
              "Update RAM"
            ) : (
              "Publish RAM"
            )}
          </Button>
        </form>
      </div>

      {data?.length > 0 && (
        <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white w-[65%]">
          <div className="relative overflow-x-auto mt-5 pb-5">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-black font-semibold uppercase bg-gray-50">
                <tr>
                  <td className="px-6 py-3 pr-0 w-[10%]">
                    <Checkbox {...label} size="small" />
                  </td>
                  <td className="px-0 py-2 w-[60%]">Product RAM</td>
                  <td className="px-0 py-2 w-[30%]">Action</td>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 pr-0">
                      <Checkbox {...label} size="small" />
                    </td>
                    <td className="px-0 py-2">{item?.name}</td>
                    <td className="px-0 py-2">
                      <div className="flex items-center gap-4">
                        <Tooltip1 title="Edit RAM" placement="top-start">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]"
                            onClick={() => editItem(item?._id)}
                          >
                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                          </Button>
                        </Tooltip1>

                        <Tooltip1 title="Delete RAM" placement="top-start">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-lg hover:bg-[#f1faff]"
                            onClick={() => deleteRamData(item?._id)}
                          >
                            <FaTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                          </Button>
                        </Tooltip1>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddRAMS;
