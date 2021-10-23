import axios from "axios";

const myPets = async (userId) => {
  try {
    const firstPromise = axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/getmysavedpets/${userId}`
    );
    const secondPromise = axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/getmyownedpets/${userId}`
    );
    const response = await Promise.all([firstPromise, secondPromise]);
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { myPets };
