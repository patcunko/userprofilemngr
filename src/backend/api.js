// backend/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:2000/api', // Ensure this matches the server's base URL
});

export const updatePayment = async (userId, paymentData) => {
  try {
    const response = await apiClient.put(`/users/${userId}/payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error updating payment information:', error);
    throw error;
  }
};

export const updateContactInfo = async (userId, contactData) => {
  try {
    const response = await apiClient.put(`/users/${userId}/contact`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error updating contact information:', error);
    throw error;
  }
};