
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './MyStories.css';


// const MyStories = () => {
//   const [myStories, setMyStories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // Loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMyStories = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/signin');
//           return;
//         }
//         const res = await axios.get('/api/stories/user/mystories', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMyStories(res.data);
//         setIsLoading(false);  // Set loading to false once data is fetched
//       } catch (err) {
//         console.error('Error fetching my stories:', err);
//         setIsLoading(false);  // Set loading to false if there's an error
//       }
//     };

//     fetchMyStories();
//   }, [navigate]);

//   return (
//     <div className="my-stories">
//       <div className="my-stories-container">
//         <h2>My Stories</h2>
//         {isLoading ? (  // Show loading message while data is being fetched
//           <p>Loading...</p>
//         ) : (
//           <div className="stories-grid">
//             {myStories.length > 0 ? (
//               myStories.map(story => (
//                 <div key={story._id} className="story-card">
//                   <h3>{story.title}</h3>
//                   <p className="preview">{story.preview}</p>
//                   <Link to={`/stories/${story._id}`} className="read-more-link">
//                     Read More
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <p>No stories found.</p>  // If no stories are found, show this message
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyStories;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyStories.css';
import { getMyStories } from '../api/storyApi.js'; // ✅ Make sure the path is correct

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
        const stories = await getMyStories(); // ✅ Using your shared API utility
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
        <h2>My Stories</h2>
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
