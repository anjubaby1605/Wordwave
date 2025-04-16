// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from './logo.png';
// import userIcon from './usericon.png';
// import './home.css';
// import Footer from './Footer.js';
// import { getStories } from '../api/storyApi.js';

// const Home = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [stories, setStories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await getStories();
//         const shuffled = shuffleArray(response);
//         setStories(shuffled);
//       } catch (error) {
//         console.error('Failed to fetch stories:', error);
//       }
//     };

//     fetchStories();
//   }, []);

//   const shuffleArray = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(prev => !prev);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/signin');
//   };

//   return (
//     <div className="register-container">
//       <header className="register-header">
//         <div className="logo-container">
//           <img src={logo} alt="WordWave Logo" className="logo" />
//           <h1 className="app-name">WordWave</h1>
//         </div>

//         <div className="user-menu">
//           <img
//             src={userIcon}
//             alt="User"
//             className="user-icon"
//             onClick={toggleDropdown}
//           />
//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               {!isLoggedIn ? (
//                 <Link to="/signin" className="dropdown-item">Login / Register</Link>
//               ) : (
//                 <>
//                   <Link to="/stories" className="dropdown-item">My Stories</Link>
//                   <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="tagline-container">
//           <h2>Collaborative Storytelling Platform</h2>
//           <p>Create, Share, Inspire Together</p>
//           <Link to="/story-page" className="create-story-btn blue-btn">
//             Create Your Story
//           </Link>
//         </div>

//         <div className="stories-grid">
//           {stories.length > 0 ? (
//             stories.slice(0, 6).map(story => (
//               <StoryCard key={story._id} story={story} />
//             ))
//           ) : (
//             <p>Loading stories...</p>
//           )}
//         </div>

//         {/* Read More Button */}
//         <div className="read-more-container">
//           <Link to="/stories" className="blue-btn">
//             Read More Stories
//           </Link>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// const StoryCard = ({ story }) => {
//   const token = localStorage.getItem('token');
//   const storyRoute = token 
//     ? `/stories/${story._id}` 
//     : `/stories/public/${story._id}`;

//   return (
//     <div className="story-card">
//       <h3>{story.title}</h3>
//       <p className="preview">{story.preview}</p>

//       <Link to={storyRoute} className="read-more-link">Read More</Link>

//       <div className="tags">
//         {story.tags && story.tags.map(tag => (
//           <span key={tag} className="tag">{tag}</span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from './logo.png';
// import userIcon from './usericon.png';
// import './home.css';
// import Footer from './Footer.js';
// import { getStories } from '../api/storyApi.js';

// const Home = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [stories, setStories] = useState([]);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   // Check login status on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   // Fetch stories only on initial mount
//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await getStories();
//         setStories(shuffleArray(response)); // shuffle only once when stories are fetched
//       } catch (error) {
//         console.error('Failed to fetch stories:', error);
//       }
//     };

//     fetchStories();
//   }, []); // Empty array ensures it runs only once

//   // Handle clicking outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Shuffle array function
//   const shuffleArray = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/signin');
//   };

//   return (
//     <div className="register-container">
//       <header className="register-header">
//         <div className="logo-container">
//           <img src={logo} alt="WordWave Logo" className="logo" />
//           <h1 className="app-name">WordWave</h1>
//         </div>

//         <div className="user-menu" ref={dropdownRef}>
//           <img
//             src={userIcon}
//             alt="User"
//             className="user-icon"
//             onClick={() => setDropdownOpen(prev => !prev)}
//           />
//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               {!isLoggedIn ? (
//                 <Link to="/signin" className="dropdown-item">Login / Register</Link>
//               ) : (
//                 <>
//                   <Link to="/stories" className="dropdown-item">My Stories</Link>
//                   <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="tagline-container">
//           <h2>Collaborative Storytelling Platform</h2>
//           <p>Create, Share, Inspire Together</p>
//           <Link to="/story-page" className="create-story-btn blue-btn">
//             Create Your Story
//           </Link>
//         </div>

//         <div className="stories-grid">
//           {stories.length > 0 ? (
//             stories.slice(0, 6).map(story => (
//               <StoryCard key={story._id} story={story} />
//             ))
//           ) : (
//             <p>Loading stories...</p>
//           )}
//         </div>

//         <div className="read-more-container">
//           <Link to="/stories" className="blue-btn">
//             Read More Stories
//           </Link>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// const StoryCard = ({ story }) => {
//   const token = localStorage.getItem('token');
//   const storyRoute = token
//     ? `/stories/${story._id}`
//     : `/stories/public/${story._id}`;

//   return (
//     <div className="story-card">
//       <h3>{story.title}</h3>
//       <p className="preview">{story.preview}</p>

//       <Link to={storyRoute} className="read-more-link">Read More</Link>

//       <div className="tags">
//         {story.tags && story.tags.map(tag => (
//           <span key={tag} className="tag">{tag}</span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import userIcon from './usericon.png';
import './home.css';
import Footer from './Footer.js';
import { getStories } from '../api/storyApi.js';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stories, setStories] = useState([]); // state for logged-in user's stories
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getStories();
        const shuffled = shuffleArray(response); // shuffle here
        setStories(shuffled);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      }
    };

    if (isLoggedIn) {
      fetchStories();
    }
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
                  <Link to="/stories" className="dropdown-item">My Stories</Link>
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
          <Link to="/story-page" className="create-story-btn blue-btn">
            Create Your Story
          </Link>
        </div>

        <div className="stories-grid">
          {stories.length > 0 ? (
            stories.slice(0, 6).map(story => (
              <StoryCard key={story._id} story={story} />
            ))
          ) : (
            <p>Loading stories...</p>
          )}
        </div>

        <Link to="/stories" className="blue-btn read-more-btn">Read More Stories</Link>
      </main>

      <Footer />
    </div>
  );
};

const StoryCard = ({ story }) => {
  const token = localStorage.getItem('token');
  const storyRoute = token 
    ? `/stories/${story._id}` 
    : `/stories/public/${story._id}`;

  return (
    <div className="story-card">
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

