import React from "react";
import StoryEditor from "../components/stories/StoryEditor";

const StoryPage = () => {
  const handleSave = (storyData) => {
    console.log("Story saved:", storyData);
  };

  return (
    <div className="story-page" 
    >
      <h1>Word Wave</h1>
      <p>CREATE. BUILD. READ</p> 
      <StoryEditor/>
    </div>
  );
};

export default StoryPage;