import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createStory, getStory, lockStory, updateStory, unlockStory} from '../../api/storyApi';
import SnapshotManager from './SnapshotManager';

const StoryEditor = () => {
  const { id: storyId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(!!storyId);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [story, setStory] = useState({
    title: '',
    content: '',
    tags: [],
    snapshots: []
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        if (storyId) {
          const response = await getStory(storyId);
          const currentUserId = localStorage.getItem('userId');
    
          setStory({
            title: response.title || '',
            content: response.content || '',
            tags: response.tags || [],
            snapshots: response.snapshots || []
          });
  
          if (response.isLocked && response.lockedBy !== currentUserId) {
            setIsReadOnly(true);
          } else {
            try {
              await lockStory(storyId);
              setIsReadOnly(false);
            } catch (err) {
              console.warn('Could not lock the story:', err);
              setIsReadOnly(true);
            }
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch story:', err);
        navigate('/');
      }
    };
  
    fetchStory();
  
    const handleUnlockStory = async () => {
      try {
        await unlockStory(storyId);
      } catch (err) {
        console.warn('Failed to unlock the story:', err);
      }
    };
  
    window.addEventListener('beforeunload', handleUnlockStory);
  
    return () => {
      handleUnlockStory();
      window.removeEventListener('beforeunload', handleUnlockStory);
    };
  
  }, [storyId, navigate]);
  

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Prepare the data to match backend expectations
    const storyData = {
      title: story.title,
      content: story.content,
      tags: story.tags,
      snapshots: story.snapshots.map(s => ({
        title: s.title,
        content: s.content,
        links: s.links || []
      }))
    };
  
    try {
      const token = localStorage.getItem('token');
      if (storyId) {
        await updateStory(storyId, storyData);
        navigate(`/stories/${storyId}`);
      } else {
        await createStory(storyData,token);
        navigate('/stories');
      }
    } catch (err) {
      console.error('Save failed:', err);
      alert(err.message || 'Failed to save story');
    }
  };
  const handleCancel = async () => {
    if (storyId) {
      await fetch(`/api/stories/${storyId}/unlock`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      navigate(`/stories/${storyId}`);
    } else {
      navigate('/stories');
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory(prev => ({ ...prev, [name]: value }));
  };

  const addTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !story.tags.includes(newTag.trim())) {
      setStory(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setStory(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle snapshot updates
  const handleSnapshotsUpdate = (updatedSnapshots) => {
    setStory(prev => ({ ...prev, snapshots: updatedSnapshots }));
  };

  if (isLoading) {
    return <div className="text-center my-5">Loading story...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2>{storyId ? 'Edit Story' : 'Create Story'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={story.title}
                onChange={handleInputChange}
                required
                disabled={isReadOnly}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                name="content"
                rows="8"
                value={story.content}
                onChange={handleInputChange}
                required
                disabled={isReadOnly}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tags</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={addTag}
                >
                  Add Tag
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {story.tags.map(tag => (
                  <span key={tag} className="badge bg-primary">
                    {tag}
                    <button 
                      type="button" 
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: '0.5rem' }}
                      onClick={() => removeTag(tag)}
                      aria-label="Remove"
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Snapshots section - outside the form but part of the same card */}
            <div className="mb-4">
              <h4>Story Snapshots</h4>
              <SnapshotManager 
                storyId={storyId}
                snapshots={story.snapshots}
                onSnapshotsChange={handleSnapshotsUpdate}
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
            <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isReadOnly}
                >
                  Save Story
                </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <div>
                {storyId && (
                  <Link 
                    to={`/stories/${storyId}/userlogs`}
                    className="btn btn-outline-info me-2"
                  >
                    View Activity
                  </Link>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryEditor;