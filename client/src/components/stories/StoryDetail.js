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
       // console.log('API Response:', response);
        
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
    <div
    className="story-detail-wrapper"
    style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden'
    }}
  >
    {/* ✅ Background Image with blur */}
    <div
      style={{
        backgroundImage: `url('/image/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(4px)', // Light blur
        position: 'absolute',
        inset: 0,
        zIndex: 0
      }}
    />
  
      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Story card */}
        <div className="story-card-small p-4">
          <div className="row">
            <div className="col-md-6">
              <h2>{story.title}</h2>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {story.tags?.map(tag => (
                  <span key={tag} className="badge bg-primary">{tag}</span>
                ))}
              </div>
              <pre className="mt-3" style={{ whiteSpace: 'pre-wrap' }}>
                {story.content}
              </pre>
            </div>
          </div>
        </div>
  
        {/* Buttons */}
        <div
  className="mt-4 d-flex justify-content-center align-items-center gap-3"
  style={{ marginBottom: '3rem' }}
>
          <Link to={`/stories/${id}/edit`} className="custom-edit-btn">
            Edit Story
          </Link>
          <Link to="/stories" className="custom-back-btn">
            Back to Stories
          </Link>
          <Link to="/" title="Home">
            <img
              src="/image/house.png"
              alt="Home"
              style={{ width: '36px', height: '36px', objectFit: 'contain' }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
  
};

export default StoryDetail;