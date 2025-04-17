import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStories } from '../../api/storyApi';



const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getStories();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <div className="text-center my-5">Loading stories...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const colorClasses = ['custom-yellow', 'custom-blue', 'custom-green','custom-pink']; // Column-based colors

  return (
    <div
  style={{
    backgroundImage: `url('/image/bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    paddingTop: '2rem'
  }}
>
  
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <Link to="/" className="me-3 home-button">
            <img src="image/house.png" alt="Home" className="home-icon" />
          </Link>
        <h2>All Stories</h2>
        <Link to="/story-page" className="custom-create-btn">
          Create New Story
        </Link>
      </div>
      <div className="row">
        {stories.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No stories found. Create one!</div>
          </div>
        ) : (
          stories.map((story, index) => {
            const colorClass = colorClasses[index % colorClasses.length]; // rotate colors
            return (
              <div key={story._id} className="col-md-6 col-lg-4 mb-4">
                <div className={`card h-100 ${colorClass}`}>
                {/*<div className={`card h-100 ${colorClass}`}>*/}
                  <div className="card-body p-3">
                    <h5 className="card-title">{story.title}</h5>
                    <p className="card-text text-muted">
                      {story.content.substring(0, 100)}...
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {story.tags.map(tag => (
                        <span key={tag} className="badge bg-info">{tag}</span>
                      ))}
                    </div>
                    <Link to={`/stories/${story._id}`} className="custom-read-btn">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            )
          }
          )
        )}
      </div>
    </div>
    </div>
  );
};

export default StoryList;
