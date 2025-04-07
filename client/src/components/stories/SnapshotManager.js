import React, { useState } from 'react';

const SnapshotManager = ({ storyId, snapshots = [], onSnapshotsChange }) => {
  // Initialize with safe default
  const [newSnapshot, setNewSnapshot] = useState({ 
    title: '', 
    content: '',
    links: [] 
  });

  const handleAddSnapshot = (e) => {
    e.preventDefault();
    if (!newSnapshot.title.trim()) return;
    
    const updatedSnapshots = [
      ...(snapshots || []),  // Fallback to empty array
      {
        ...newSnapshot,
        id: Date.now()  // Temporary ID for new snapshots
      }
    ];
    
    onSnapshotsChange(updatedSnapshots);
    setNewSnapshot({ title: '', content: '', links: [] });
  };

  const handleDeleteSnapshot = (id) => {
    const updatedSnapshots = (snapshots || []).filter(snap => snap.id !== id);
    onSnapshotsChange(updatedSnapshots);
  };

  return (
    <div className="snapshot-manager">
      {/* Add Snapshot Form */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Snapshot title"
          value={newSnapshot.title}
          onChange={(e) => setNewSnapshot({...newSnapshot, title: e.target.value})}
          className="form-control mb-2"
        />
        <textarea
          placeholder="Snapshot content"
          value={newSnapshot.content}
          onChange={(e) => setNewSnapshot({...newSnapshot, content: e.target.value})}
          className="form-control mb-2"
          rows={3}
        />
        <button 
          onClick={handleAddSnapshot}
          className="btn btn-sm btn-primary"
        >
          Add Snapshot
        </button>
      </div>

      {/* Snapshots List */}
      <div className="snapshots-list">
        {(snapshots || []).map(snapshot => (
          <div key={snapshot.id} className="card mb-2">
            <div className="card-body">
              <h5>{snapshot.title}</h5>
              <p>{snapshot.content}</p>
              <button
                onClick={() => handleDeleteSnapshot(snapshot.id)}
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