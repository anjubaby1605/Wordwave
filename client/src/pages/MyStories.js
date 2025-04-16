import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyStories.css';
import { getMyStories } from '../api/storyApi.js';

const MyStories = () => {
  const [myStories, setMyStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyStories = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const stories = await getMyStories();
        setMyStories(stories);
      } catch (err) {
        console.error('Error fetching my stories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyStories();
  }, [navigate]);

  return (
    <div className="my-stories">
      <div className="my-stories-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">My Stories</h2>
        <Link
          to="/"
          className="btn btn-primary d-flex justify-content-center align-items-center"
          style={{ width: '50px', height: '38px' }}
        >
          <i className="bi bi-house-door"></i>
        </Link>
      </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="stories-grid">
            {myStories.length > 0 ? (
              myStories.map(story => (
                <div key={story._id} className="story-card">
                  <h3>{story.title}</h3>
                  <p className="preview">{story.preview}</p>
                  <Link to={`/stories/${story._id}`} className="read-more-link">
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <p>No stories found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStories;
