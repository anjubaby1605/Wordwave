import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
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
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Something went wrong';
    return Promise.reject(new Error(errorMessage));
  }
);

const snapshotsApi = {
  /**
   * Add a new snapshot to a story
   * @param {string} storyId - Parent story ID
   * @param {object} snapshotData - { title, content, links[] }
   * @returns {Promise<Snapshot>} Created snapshot
   */
  addSnapshot: async (storyId, snapshotData) => {
    return api.post(`/stories/${storyId}/snapshots`, snapshotData);
  },

  /**
   * Update an existing snapshot
   * @param {string} storyId - Parent story ID
   * @param {string} snapshotId - Snapshot ID to update
   * @param {object} updateData - Fields to update
   * @returns {Promise<Snapshot>} Updated snapshot
   */
  updateSnapshot: async (storyId, snapshotId, updateData) => {
    return api.put(`/stories/${storyId}/snapshots/${snapshotId}`, updateData);
  },

  /**
   * Delete a snapshot
   * @param {string} storyId - Parent story ID
   * @param {string} snapshotId - Snapshot ID to delete
   * @returns {Promise<{message: string}>} Confirmation message
   */
  deleteSnapshot: async (storyId, snapshotId) => {
    return api.delete(`/stories/${storyId}/snapshots/${snapshotId}`);
  },

  /**
   * Reorder snapshots
   * @param {string} storyId - Parent story ID
   * @param {string[]} snapshotIds - Ordered array of snapshot IDs
   * @returns {Promise<Story>} Updated story with snapshots
   */
  reorderSnapshots: async (storyId, snapshotIds) => {
    return api.patch(`/stories/${storyId}/snapshots/order`, { snapshotIds });
  },

  /**
   * Add a link to a snapshot
   * @param {string} storyId - Parent story ID
   * @param {string} snapshotId - Target snapshot ID
   * @param {object} linkData - { url, description }
   * @returns {Promise<Snapshot>} Updated snapshot
   */
  addLink: async (storyId, snapshotId, linkData) => {
    return api.post(
      `/stories/${storyId}/snapshots/${snapshotId}/links`,
      linkData
    );
  },

  /**
   * Remove a link from a snapshot
   * @param {string} storyId - Parent story ID
   * @param {string} snapshotId - Target snapshot ID
   * @param {string} linkId - Link ID to remove
   * @returns {Promise<Snapshot>} Updated snapshot
   */
  removeLink: async (storyId, snapshotId, linkId) => {
    return api.delete(
      `/stories/${storyId}/snapshots/${snapshotId}/links/${linkId}`
    );
  }
};

export default snapshotsApi;