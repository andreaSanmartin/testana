import apiClient from "../ApiClient";

const API_CLASS = 'api/Item/';


// Function to fetch item by name/code/id
export const getByDataItem = async (data) => {
    try {
        const response = await apiClient.get(`${API_CLASS}by/data/${data}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item', error);
        throw error;
    }
};

// Function to fetch first items 
export const getFirstItem = async () => {
    try {
        const response = await apiClient.get(`${API_CLASS}first`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item', error);
        throw error;
    }
};
