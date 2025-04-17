import React, { useState } from 'react';
import axios from 'axios';

const SnapshotManager = ({ storyId, snapshots = [], onSnapshotsChange }) => {
  const [newSnapshot, setNewSnapshot] = useState({
    title: '',
    content: '',
    links: [],
    image: null,
    preview: null, // for frontend preview only
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Create axios instance with default config
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Include if using cookies
  });

  // Handle form field changes
  const updateSnapshotField = (field, value) => {
    setNewSnapshot({ ...newSnapshot, [field]: value });
  };

  // Add link field dynamically
  const handleAddLink = () => {
    setNewSnapshot({
      ...newSnapshot,
      links: [...(newSnapshot.links || []), { url: '', description: '' }],
    });
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...newSnapshot.links];
    updatedLinks[index][field] = value;
    setNewSnapshot({ ...newSnapshot, links: updatedLinks });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewSnapshot({
      ...newSnapshot,
      image: file,
      preview: URL.createObjectURL(file), // for preview
    });
  };

  const handleAddSnapshot = async (e) => {
    e.preventDefault();
    if (!newSnapshot.title.trim()) return;

    if (!storyId) {
      // If story is not yet created, just update local state
      onSnapshotsChange([...snapshots, { ...newSnapshot }]);
      setNewSnapshot({ title: '', content: '', links: [], image: null, preview: null });
      return;
    }

    // Else, post to API as usual
    try {
      const formData = new FormData();
      formData.append('title', newSnapshot.title);
      formData.append('content', newSnapshot.content);
      formData.append('order', snapshots.length);
      formData.append('links', JSON.stringify(newSnapshot.links || []));
      if (newSnapshot.image) {
        formData.append('image', newSnapshot.image);
      }

      const response = await api.post(`${API_URL}/stories/${storyId}/snapshots`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const createdSnapshot = response.data;
      onSnapshotsChange([...snapshots, createdSnapshot]);
      setNewSnapshot({ title: '', content: '', links: [], image: null, preview: null });
    } catch (err) {
      console.error('Failed to add snapshot:', err);
      alert(err.response?.data?.error || 'Snapshot creation failed');
    }
  };

  // Delete Snapshot Handler
  const handleDeleteSnapshot = async (idToDelete) => {
    try {
      // Send delete request to API (if applicable)
      if (storyId) {
        await api.delete(`${API_URL}/stories/${storyId}/snapshots/${idToDelete}`);
      }

      // Update local snapshots state after successful deletion
      const updatedSnapshots = snapshots.filter(
        (snap) => snap.id !== idToDelete && snap._id !== idToDelete
      );
      onSnapshotsChange(updatedSnapshots);
    } catch (err) {
      console.error('Failed to delete snapshot:', err);
      alert('Snapshot deletion failed');
    }
  };

  return (
    <div className="snapshot-manager">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Snapshot title"
          value={newSnapshot.title}
          onChange={(e) => updateSnapshotField('title', e.target.value)}
          className="form-control mb-2"
        />

        <textarea
          placeholder="Snapshot content"
          value={newSnapshot.content}
          onChange={(e) => updateSnapshotField('content', e.target.value)}
          className="form-control mb-2"
          rows={3}
        />

        {/* Add Link Button */}
        <button type="button" onClick={handleAddLink} className="custom-link-btn">
          + Add Link
        </button>

        {/* Render the dynamic link inputs */}
        {newSnapshot.links &&
          newSnapshot.links.map((link, index) => (
            <div key={index} className="mb-2 d-flex flex-column">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Link URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Description"
                value={link.description}
                onChange={(e) => handleLinkChange(index, 'description', e.target.value)}
              />
            </div>
          ))}

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control mb-2"
        />

        {/* Image Preview */}
        {newSnapshot.preview && (
          <div className="mb-2">
            <img
              src={newSnapshot.preview}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: 200 }}
            />
          </div>
        )}

        {/* Add Snapshot Button */}
        <button onClick={handleAddSnapshot} className="custom-snap-btn">
          Add Snapshot
        </button>
      </div>

      <div className="snapshots-list">
        {snapshots.map((snapshot) => (
          <div key={snapshot._id || snapshot.id} className="card mb-2">
            <div className="card-body">
              <h5>{snapshot.title}</h5>
              <p>{snapshot.content}</p>
              {(snapshot.image || snapshot.preview) && (
                <img
                  src={
                    snapshot.preview
                      ? snapshot.preview
                      : `http://localhost:5000${snapshot.image}`
                  }
                  alt="Snapshot"
                  style={{ maxWidth: '100%', maxHeight: 200 }}
                />
              )}

              {snapshot.links?.map((link, idx) => (
                <div key={idx}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.description || link.url}
                  </a>
                </div>
              ))}

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteSnapshot(snapshot.id || snapshot._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnapshotManager;
