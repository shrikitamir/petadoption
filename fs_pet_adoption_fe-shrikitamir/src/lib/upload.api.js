import axios from "axios";

const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOSTNAME}/upload`,
      formData
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { uploadImage };
