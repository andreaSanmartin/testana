import apiClient from "../ApiClient";

const API_CLASS = 'api/Order/';


// Function to code order
export const getCodeOrder = async () => {
  try {
    const response = await apiClient.get(`${API_CLASS}code`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item', error);
    throw error;
  }
};


// Function to save general information of order
export const saveOrder = async (form) => {
  try {
    const response = await apiClient.post(`${API_CLASS}save`, JSON.stringify(form));
    return response.data;
  } catch (error) {
    console.error('Error saving information', error);
    throw error;
  }
};

//get all orders
export const getAllOrders = async () => {
  try {
    const response = await apiClient.get(`${API_CLASS}all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item', error);
    throw error;
  }
};

// Function to update general information of order
export const updateOrder = async (form) => {
  try {
    const response = await apiClient.post(`${API_CLASS}update`, JSON.stringify(form));
    return response.data;
  } catch (error) {
    console.error('Error saving information', error);
    throw error;
  }
};