import axios from "axios";

const petsList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/petslist`
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { petsList };
