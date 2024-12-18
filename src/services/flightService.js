import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_FLIGHTS_API}/flights`;

export const createFlightOrder = async (order) => {
  try {
    const response = await axios.post(BASE_URL, order);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserFlightOrders = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateFlightOrder = async (orderId, updatedOrder) => {
  try {
    const response = await axios.put(`${BASE_URL}/${orderId}`, updatedOrder);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteFlightOrder = async (orderId) => {
  try {
    await axios.delete(`${BASE_URL}/${orderId}`);
  } catch (error) {
    throw error.response.data;
  }
};
