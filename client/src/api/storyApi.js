import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-domain.com/api'
  : 'http://localhost:5000/api';


  const api = axios.create({
    baseURL: API_BASE_URL,
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

// Get all stories
export const getStories = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/stories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};

// Get single story
export const getStory = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const endpoint = token
    ? `/stories/${id}` 
    : `/stories/public/${id}`;
    const response = await api.get(endpoint);//`${API_BASE_URL}/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching story:', error);
    throw error;
  }
};

// Create new story
export const createStory = async (storyData) => {
  try {
    const response = await api.post('/stories', storyData);
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};

// Update existing story
export const updateStory = async (id, storyData) => {
  try {
    const response = await api.put(`${API_BASE_URL}/stories/${id}`, storyData);
    return response.data;
  } catch (error) {
    console.error('Error updating story:', error);
    throw error;
  }
};

export const lockStory = async (storyId) => {
  try{
    const response = await api.post(`/stories/${storyId}/lock`);
    return response.data;
  }catch(error){
    console.error('Error locking story:', error);
    throw error;
  }
};

// Unlock a story
export const unlockStory = async (storyId) => {
  try{
  const response = await api.post(`/stories/${storyId}/unlock`);
  return response.data;
  }catch(error){
    console.error('Error unlocking story:', error);
    throw error;
  }
};

