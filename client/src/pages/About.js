
// src/pages/About.js
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => (
  <div className="static-page p-6 max-w-3xl mx-auto text-gray-800">
    <div className="text-right mb-4">
      <Link to="/" className="text-blue-600 hover:underline font-semibold">
        🏠 Home
      </Link>
    </div>
    <h2 className="text-3xl font-bold mb-4">About WordWave</h2>
    <p className="mb-4">
      <strong>WordWave</strong> is more than just a storytelling platform — it's a place where creativity flows, voices unite, 
      and stories are built one word at a time. Whether you're an aspiring author, a curious reader, or someone who just loves 
      to contribute a twist to a tale, WordWave welcomes you.
    </p>
    
    <p className="mb-4">
      Our platform allows users to collaboratively write stories in real-time or turn-by-turn, encouraging creativity, 
      surprise, and shared imagination. You can join ongoing stories, start your own, or simply explore what others have built. 
      WordWave is a community-driven canvas where every user becomes a storyteller.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-2">Why WordWave?</h3>
    <ul className="list-disc list-inside space-y-2">
      <li>🌍 Connect with storytellers across the globe</li>
      <li>✍️ Collaborate and co-write stories in a fun and interactive way</li>
      <li>📚 Explore a library of user-generated stories, from fantasy to sci-fi and everything in between</li>
      <li>🔒 Keep track of your contributions and stories with your personal dashboard</li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-2">Our Vision</h3>
    <p>
      At WordWave, we believe everyone has a story worth sharing. Our mission is to create a space where storytelling is 
      accessible, fun, and empowering for all. Whether you're writing for fun or passion, we're here to make your words count.
    </p>
  </div>
);

export default About;
