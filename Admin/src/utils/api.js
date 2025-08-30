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
        Authorization: `Bearer ${localStorage.getItem("token")}`, //include your API key in the Autorization header
        "Content-Type": "application/json", //Adjuc=st the content type as needed
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
