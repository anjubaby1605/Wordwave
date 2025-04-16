import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import userIcon from './usericon.png';
import './home.css';
import Footer from './Footer.js';
import { getStories } from '../api/storyApi.js';
import axios from 'axios';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stories, setStories] = useState([]); // state for real stories
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        if (isLoggedIn) {
          // If logged in, fetch the user's stories
          const token = localStorage.getItem('token');
          const res = await axios.get('/api/stories/user/mystories', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStories(res.data);
        } else {
          // Fetch all stories for non-logged in users or guest view
          const response = await getStories();
          const shuffled = shuffleArray(response); // shuffle stories
          setStories(shuffled);
        }
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      }
    };
    fetchStories();
  }, [isLoggedIn]);

  // Shuffle stories randomly
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    return shuffled;
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/signin');
  };

  return (
    <div className="register-container">
      <header className="register-header">
          <div className="logo-container">
            <img src={logo} alt="WordWave Logo" className="logo" />
          <div className='centred-heading'>
            <h1 className="app-name">WordWave</h1>
           </div>
        
        </div>
        

        <div className="user-menu">
          <img
            src={userIcon}
            alt="User"
            className="user-icon"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              {!isLoggedIn ? (
                <Link to="/signin" className="dropdown-item">Login / Register</Link>
              ) : (
                <>
                  <Link to="/mystories" className="dropdown-item">My Stories</Link>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="hero-section">
        <div className="tagline-container">
          <h2>Welcome to WordWave</h2>
          <p>Create, Share, Inspire Together</p>
          <p>Create your novel seamlessly. Whether you’re a published author or budding talent looking for life beyond status updates, you can get away from the noise and focus on telling your story with WordWave.</p>
          <Link to="/story-page" className="create-story-btn">Create Your Story</Link>
        </div>
      </div>
        <main className="main-content">
          <div className="stories-grid">
            {stories.length > 0 ? (
              stories.slice(0, 6).map((story,index) => (
                <StoryCard key={story._id} story={story} index={index} />
              ))
            ) : (
              <p>Loading stories...</p>
            )}
          </div>
          <div className="read-more-container">
          <Link to="/stories" className="blue-btn read-more-btn">Read More Stories</Link>
          </div>
        </main>

      <Footer />
    </div>
  );
};


const StoryCard = ({ story, index }) => {
  const token = localStorage.getItem('token');
  const storyRoute = token 
    ? `/stories/${story._id}` 
    : `/stories/public/${story._id}`;

  const colorClasses = ['card-green', 'card-blue', 'card-yellow', 'card-pink'];
  const colorClass = colorClasses[index % colorClasses.length];

  return (
    <div className={`story-card ${colorClass}`}>
      <h3>{story.title}</h3>
      <p className="preview">{story.preview}</p>

      <Link to={storyRoute} className="read-more-link">Read More</Link>

      <div className="tags">
        {story.tags && story.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};


export default Home;
