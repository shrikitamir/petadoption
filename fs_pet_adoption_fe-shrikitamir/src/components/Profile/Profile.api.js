import axios from "axios";

const changePass = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOSTNAME}/auth/changepass`,
      data
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

const editUser = async (user, oldUser) => {
  try {
    user.firstName =
      user.firstName[0].toUpperCase() + user.firstName.slice(1).toLowerCase();
    user.lastName =
      user.lastName[0].toUpperCase() + user.lastName.slice(1).toLowerCase();
    user.email = user.email.toLowerCase();
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOSTNAME}/user/edituser/${user.userId}`,
      { ...user, ...oldUser }
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { changePass, editUser };
