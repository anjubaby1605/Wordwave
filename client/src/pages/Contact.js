// src/pages/Contact.js
import React from 'react';

const Contact = () => (
  <div className="static-page p-6 max-w-3xl mx-auto text-gray-800">
    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
    <p className="mb-4">
      We'd love to hear from you! Whether you have feedback, questions, or partnership inquiries, feel free to reach out.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-2">General Inquiries</h3>
    <p>Email: <a href="mailto:support@wordwave.com" className="text-blue-600 hover:underline">support@wordwave.com</a></p>

    <h3 className="text-xl font-semibold mt-6 mb-2">Technical Support</h3>
    <p>Having trouble with the platform? We're here to help.</p>
    <p>Email: <a href="mailto:tech@wordwave.com" className="text-blue-600 hover:underline">tech@wordwave.com</a></p>

    <h3 className="text-xl font-semibold mt-6 mb-2">Connect with Us</h3>
    <p>Follow us on social media for updates, tips, and community highlights.</p>
    <ul className="list-disc list-inside space-y-2">
      <li><a href="https://twitter.com/wordwave" className="text-blue-600 hover:underline">Twitter</a></li>
      <li><a href="https://instagram.com/wordwave" className="text-blue-600 hover:underline">Instagram</a></li>
      <li><a href="https://facebook.com/wordwave" className="text-blue-600 hover:underline">Facebook</a></li>
    </ul>
  </div>
);

export default Contact;
