import axios from "axios";

const searchPets = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/searchpets${query}`
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { searchPets };
