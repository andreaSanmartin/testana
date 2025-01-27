import apiClient from "../ApiClient";

const API_CLASS = 'api/State/';

// Function to fetch all
export const getAllStatus = async () => {
    try {
        const response = await apiClient.get(`${API_CLASS}all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item', error);
        throw error;
    }
};

