import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyStories.css';
import { getMyStories } from '../api/storyApi.js';
import house from './house.png';


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
       <Link to="/" className="home-button">
        <img src={house} alt="Home" className="home-icon" />
        </Link>
      <div className="my-stories-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">My Stories</h2>
       

      </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="stories-grid">
          {myStories.length > 0 ? (
            myStories.map((story, index) => {
              const colorClass = `card-color-${index % 4}`;
              return (
                <div key={story._id} className={`story-card ${colorClass}`}>
                  <h3>{story.title}</h3>
                  <p className="preview">{story.preview}</p>
                  <Link to={`/stories/${story._id}`} className="read-more-link">
                    Read More
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No stories found.</p>
          )}
          </div>
        )}
      </div>
      <img src='image\img1.jpg' alt="Decor" className="corner-image" />
    </div>
  );
};

export default MyStories;
