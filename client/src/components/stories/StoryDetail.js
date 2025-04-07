import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStory } from '../../api/storyApi';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await getStory(id);
        console.log('API Response:', response); // Debug log
        
        // Directly use the response since it's the story object
        if (response) {
          setStory(response);
        } else {
          setError('Story data is empty');
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError(err.message || 'Failed to load story');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!story) return <div className="alert alert-warning">Story not found</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>{story.title}</h2>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {story.tags?.map(tag => (
              <span key={tag} className="badge bg-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="card-body">
          <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }}>
            {story.content}
          </pre>
          <div className="mt-3">
            <Link to={`/stories/${id}/edit`} className="btn btn-warning me-2">
              Edit Story
            </Link>
            <Link to="/stories" className="btn btn-secondary">
              Back to Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;