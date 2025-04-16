// src/pages/Terms.js
import React from 'react';

const Terms = () => (
  <div className="static-page p-6 max-w-3xl mx-auto text-gray-800">
    <h2 className="text-3xl font-bold mb-4">Terms & Conditions</h2>
    <p className="mb-4">
      Welcome to WordWave! By using our platform, you agree to the following terms and conditions. Please read them carefully.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-2">1. Use of the Platform</h3>
    <p>
      You agree to use WordWave in a respectful and legal manner. Any misuse, spamming, or harassment of other users may lead 
      to suspension or removal of your account.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-2">2. Content Ownership</h3>
    <p>
      By contributing content to stories, you grant WordWave a non-exclusive license to use, display, and distribute your 
      contributions within the platform. You retain full ownership of your original work.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-2">3. Privacy</h3>
    <p>
      Your personal data is protected in accordance with our Privacy Policy. We do not sell your information to third parties.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-2">4. Account Responsibility</h3>
    <p>
      You are responsible for keeping your login credentials secure. If you believe your account has been compromised, please 
      contact us immediately.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h3>
    <p>
      WordWave may update these terms occasionally. Continued use of the platform after changes indicates your acceptance of 
      the updated terms.
    </p>

    <p className="mt-6">
      If you have questions about our Terms & Conditions, please contact us at: <a href="mailto:legal@wordwave.com" className="text-blue-600 hover:underline">legal@wordwave.com</a>
    </p>
  </div>
);

export default Terms;
