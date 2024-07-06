import axios from 'axios';

const API_URL = 'https://randomuser.me/api/?results=10&seed=tesla';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch employees');
  }
};
