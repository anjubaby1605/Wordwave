import React, { useState } from 'react';

const SnapshotManager = ({ storyId, snapshots = [], onSnapshotsChange }) => {
  const [newSnapshot, setNewSnapshot] = useState({ 
    title: '', 
    content: '',
    links: [],
    image: null,
    preview: null // for frontend preview only
  });

  // Handle form field changes
  const updateSnapshotField = (field, value) => {
    setNewSnapshot({ ...newSnapshot, [field]: value });
  };

  // Add link field dynamically
  const handleAddLink = () => {
    setNewSnapshot({
      ...newSnapshot,
      links: [...(newSnapshot.links || []), { url: '', description: '' }]
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
      preview: URL.createObjectURL(file) // for preview
    });
  };

  const handleAddSnapshot = (e) => {
    e.preventDefault();
    if (!newSnapshot.title.trim()) return;

    const snapshotToAdd = {
      ...newSnapshot,
      id: Date.now()
    };

    const updatedSnapshots = [...snapshots, snapshotToAdd];
    onSnapshotsChange(updatedSnapshots);

    // Reset form
    setNewSnapshot({ title: '', content: '', links: [], image: null, preview: null });
  };

  const handleDeleteSnapshot = (id) => {
    const updatedSnapshots = snapshots.filter(snap => snap.id !== id);
    onSnapshotsChange(updatedSnapshots);
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

        {/* Link Inputs */}
        {newSnapshot.links.map((link, index) => (
          <div key={index} className="mb-2 d-flex gap-2">
            <input
              type="text"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              className="form-control"
            />
            <input
              type="text"
              placeholder="Description"
              value={link.description}
              onChange={(e) => handleLinkChange(index, 'description', e.target.value)}
              className="form-control"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddLink}
          className="btn btn-outline-secondary btn-sm mb-2"
        >
          + Add Link
        </button>

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

        <button 
          onClick={handleAddSnapshot}
          className="btn btn-sm btn-primary"
        >
          Add Snapshot
        </button>
      </div>

      {/* Snapshots List */}
      <div className="snapshots-list">
        {snapshots.map(snapshot => (
          <div key={snapshot._id} className="card mb-2">
            <div className="card-body">
              <h5>{snapshot.title}</h5>
              <p>{snapshot.content}</p>

              {/* Show image if exists */}
              {snapshot.preview && (
                <img
                  src={snapshot.preview}
                  alt="Snapshot"
                  style={{ maxWidth: '100%', maxHeight: 200 }}
                />
              )}

              {/* Links */}
              {snapshot.links?.map((link, idx) => (
                <div key={idx}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.description || link.url}
                  </a>
                </div>
              ))}

              <button
                onClick={() => handleDeleteSnapshot(snapshot.id)}
                className="btn btn-sm btn-danger mt-2"
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
