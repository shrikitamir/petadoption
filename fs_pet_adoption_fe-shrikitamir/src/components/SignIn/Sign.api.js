import axios from "axios";

const signUp = async (cred) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOSTNAME}/auth/register`,
      cred
    );
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

const login = async (cred) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOSTNAME}/auth/login`,
      cred
    );
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export { signUp, login };
