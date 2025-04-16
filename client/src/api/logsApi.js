import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true // Include if using cookies
  });
  
  // Request interceptor for adding auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export const getStoryActivityLogs = async (storyId) => {
  try {
    const response = await api.get(`${API_URL}/stories/${storyId}/userlogs`);
    return {
      logs: response.data.logs || [],
      storyTitle: response.data.story?.title || 'Story'
    };
  } catch (error) {
    console.error('Error fetching story logs:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch activity logs');
  }
};