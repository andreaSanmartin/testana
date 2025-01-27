import apiClient from "../ApiClient";
const API_CLASS = 'api/Client/';


// Function to fetch client by name/code/id
export const getByDataClient = async (data) => {
    try {
        const response = await apiClient.get(`${API_CLASS}by/data/${data}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching client', error);
        throw error;
    }
};

// Function to fetch first clients 
export const getFirstClient = async () => {
    try {
        const response = await apiClient.get(`${API_CLASS}first`);
        return response.data;
    } catch (error) {
        console.error('Error fetching client', error);
        throw error;
    }
};
