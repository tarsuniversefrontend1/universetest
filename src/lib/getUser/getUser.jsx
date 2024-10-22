import axios from "axios";

const getUser = async (userId) => {
  try {
    const response = await axios.get(
      `https://tarsuniverse.net:8443/users/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message); 
  }
};

export default getUser;
