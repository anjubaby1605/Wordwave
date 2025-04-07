import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getStoryActivityLogs = async (storyId) => {
  try {
    const response = await axios.get(`${API_URL}/stories/${storyId}/userlogs`);
    return {
      logs: response.data.logs || [],
      storyTitle: response.data.story?.title || 'Story'
    };
  } catch (error) {
    console.error('Error fetching story logs:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch activity logs');
  }
};