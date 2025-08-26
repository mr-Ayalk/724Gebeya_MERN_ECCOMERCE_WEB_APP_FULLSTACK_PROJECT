import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// export const postData = async (url, formData) => {
//   try {
//     const response = await axios.post(apiUrl + url, formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     const message = error.response?.data?.message || "Something went wrong";
//     throw new Error(message);
//   }
// };

// export const fetchDataFromApi = async (url) => {
//   try {
//     const { data } = await axios.get(apiUrl + url, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };


export const postData = async (url, formData) => {
  try {
    const response = await axios.post(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
