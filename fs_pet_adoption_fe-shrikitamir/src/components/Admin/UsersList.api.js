import axios from "axios";

const usersList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/user/getusers`
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { usersList };
