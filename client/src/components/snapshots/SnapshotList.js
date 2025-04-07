import React, { useState } from 'react';
import snapshotApi from '../../api/snapshotApi';;

const SnapshotList = ({ storyId, initialSnapshots }) => {
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [newSnapshot, setNewSnapshot] = useState({ title: '', content: '' });

  const handleAddSnapshot = async (e) => {
    e.preventDefault();
    try {
      const response = await snapshotApi.createSnapshot(storyId, newSnapshot);
      setSnapshots([...snapshots, response.data]);
      setNewSnapshot({ title: '', content: '' });
    } catch (err) {
      console.error('Failed to create snapshot:', err);
    }
  };

  const handleDeleteSnapshot = async (snapshotId) => {
    try {
      await snapshotApi.deleteSnapshot(storyId, snapshotId);
      setSnapshots(snapshots.filter(s => s._id !== snapshotId));
    } catch (err) {
      console.error('Failed to delete snapshot:', err);
    }
  };

  return (
    <div className="snapshot-manager">
      <h3>Story Snapshots</h3>
      
      <form onSubmit={handleAddSnapshot} className="snapshot-form">
        <input
          type="text"
          placeholder="Snapshot title"
          value={newSnapshot.title}
          onChange={(e) => setNewSnapshot({...newSnapshot, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Snapshot content"
          value={newSnapshot.content}
          onChange={(e) => setNewSnapshot({...newSnapshot, content: e.target.value})}
          required
        />
        <button type="submit">Add Snapshot</button>
      </form>

      <div className="snapshots-list">
        {snapshots.map(snapshot => (
          <div key={snapshot._id} className="snapshot-card">
            <h4>{snapshot.title}</h4>
            <p>{snapshot.content}</p>
            <button onClick={() => handleDeleteSnapshot(snapshot._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnapshotList;