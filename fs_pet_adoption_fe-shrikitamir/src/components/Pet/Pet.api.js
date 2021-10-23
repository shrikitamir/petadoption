import axios from "axios";

const petPage = async (petId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/petpage/${petId}`
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

const setStatus = async (petId, status, userId) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/${petId}/setstatus`,
      {
        status: status,
        userId: userId,
      }
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

const like = async (petId, userId) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOSTNAME}/like/like/${petId}`,
      {
        userId: userId,
      }
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

const unLike = async (petId, userId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_HOSTNAME}/like/unlike/${petId}`,
      {
        userId: userId,
      }
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

const editPet = async (petId, pet) => {
  try {
    pet.height = pet.height.toString();
    pet.weight = pet.weight.toString();
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOSTNAME}/pet/editpet/${petId}`,
      pet
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { petPage, setStatus, like, unLike, editPet };
