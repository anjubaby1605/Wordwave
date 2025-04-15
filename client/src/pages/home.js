import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import userIcon from './usericon.png';
import './home.css';
import Footer from './Footer.js';

const sampleStories = [
  {
    id: 1,
    title: 'Sample Story 1',
    preview: 'This is a preview of the first sample story...',
    fullStory: 'This is the full story of the first sample story. It has more content...',
    tags: ['fantasy', 'adventure']
  },
  {
    id: 2,
    title: 'Sample Story 2',
    preview: 'This is a preview of the second sample story...',
    fullStory: 'This is the full story of the second sample story. It has more content...',
    tags: ['sci-fi', 'future']
  },
  {
    id: 3,
    title: 'Sample Story 3',
    preview: 'This is a preview of the third sample story...',
    fullStory: 'This is the full story of the third sample story. It has more content...',
    tags: ['mystery', 'detective']
  },
  {
    id: 4,
    title: 'Sample Story 4',
    preview: 'This is a preview of the fourth sample story...',
    fullStory: 'This is the full story of the fourth sample story. It has more content...',
    tags: ['adventure', 'action']
  },
];

const Register = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear token
    setIsLoggedIn(false);
    navigate('/signin');
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <div className="logo-container">
          <img src={logo} alt="WordWave Logo" className="logo" />
          <h1 className="app-name">WordWave</h1>
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
                  <Link to="/stories" className="dropdown-item">Stories</Link>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        <div className="tagline-container">
          <h2>Collaborative Storytelling Platform</h2>
          <p>Create, Share, Inspire Together</p>
          <Link to="/story-page" className="create-story-btn">Create Your Story</Link>
        </div>

        <div className="stories-grid">
          {sampleStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const StoryCard = ({ story }) => {
  return (
    <div className="story-card">
      <h3>{story.title}</h3>
      <p className="preview">{story.preview}</p>
      <Link to={`/story/${story.id}`} className="read-more-link">Read More</Link>
      <div className="tags">
        {story.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Register;
