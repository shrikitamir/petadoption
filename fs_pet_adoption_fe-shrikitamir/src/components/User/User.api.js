import axios from "axios";

const getUserDetails = async (userId) => {
  try {
    const firstPromise = axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/user/userpage/${userId}`
    );
    const secondPromise = axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/getuserpets/${userId}`
    );
    const response = await Promise.all([firstPromise, secondPromise]);
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { getUserDetails };
