import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; // Make sure you have a CSS file for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 WordWave. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/about" className="footer-link">About</Link>
        <Link to="/contact" className="footer-link">Contact</Link>
        <Link to="/terms" className="footer-link">Terms</Link>
        <p>isygfdiyeffhcgdkjhfkyfsIYDGOSAUFUODHCJLXMCNMX
          ;JHDLJFSKHYGFYHGDSKHGVKHDSGVKHDSKJZGLODUHVUDH
          BVLKHGDSIYFGIDY
        </p>
      </div>
    </footer>
  );
};

export default Footer;
