import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    const response = await axios.post(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    // const { data } = await axios.get(apiUrl + url, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //include your API key in the Autorization header
    //     'Content-Type':'application/json',//Adjuc=st the content type as needed
    const { data } = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //include your API key in the Autorization header
        "Content-Type": "application/json", //Adjuc=st the content type as needed
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const uploadImage = async (url, updateData) => {
//   const params = {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //include your API key in the Autorization header
//     },
//   };
//   var response;
//   await axios.put(apiUrl + url, updateData, params).then((res) => {
//     // console.log(res);
//     response = res;
//   });
//   return response;
// };
export const uploadImage = async (url, formData) => {
  try {
    const response = await axios.post(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
    throw error;
  }
};

export const editData = async (url, updatedData) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(apiUrl + url, updatedData, params);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Update failed",
    };
  }
};

// export const deleteImages = async (url, image) => {
//   try {
//     const params = {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await axios.delete(apiUrl + url, image, params);
//     return response.data;
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Delete failed",
//     };
//   }
// };
export const deleteImages = async (url) => {
  try {
    const response = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Delete failed",
    };
  }
};

export const deleteData = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    };

    const { res } = await axios.delete(apiUrl + url, params);
    return res;
  } catch (error) {
    return {
      success: false,
      message: error.res?.message || "Update failed",
    };
  }
};
