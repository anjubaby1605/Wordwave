import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-domain.com/api'
  : 'http://localhost:5000/api';

// Get all stories
export const getStories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};

// Get single story
export const getStory = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching story:', error);
    throw error;
  }
};

// Create new story
export const createStory = async (storyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/stories`, storyData);
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};

// Update existing story
export const updateStory = async (id, storyData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/stories/${id}`, storyData);
    return response.data;
  } catch (error) {
    console.error('Error updating story:', error);
    throw error;
  }
};