import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post(import.meta.env.VITE_AUTH_API, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};