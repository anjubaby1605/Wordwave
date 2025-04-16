import React, { useEffect, useState } from 'react';
import { getMystories } from '../api/storyApi';  // Corrected import
import { Link } from 'react-router-dom';

const MyStories = () => {
  const [stories, setStories] = useState([]); // Store the fetched stories
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const data = await getMystories(); // Use getMystories instead of getMyStories
        setStories(data); // Set the fetched stories to state
      } catch (err) {
        setError(err.message); // Set the error message if there's an error
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchUserStories(); // Trigger the fetching of stories
  }, []);

  if (loading) return <p>Loading your stories...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message if there's an error

  return (
    <div className="my-stories-container">
      <h2>My Stories</h2>
      {stories.length === 0 ? (
        <p>You haven't written any stories yet.</p> // Show this message if no stories
      ) : (
        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story._id} className="story-card">
              <h3>{story.title}</h3>
              <p>{story.content.substring(0, 100)}...</p>
              <Link to={`/stories/${story._id}`} className="read-more-link">Read More</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStories;
