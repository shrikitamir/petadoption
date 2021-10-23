import axios from "axios";

const addPet = async (pet) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/addpet`,
      pet
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { addPet };
