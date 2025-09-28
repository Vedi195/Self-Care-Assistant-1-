import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Heart size={28} />
              <span>Self-Care Assistant</span>
            </div>
            <p className="footer-description">
              Your personal wellness companion for a better, healthier life. 
              We're here to support your journey to optimal well-being.
            </p>
            
            {/* About Us Section */}
            <div className="about-us-section">
              <h4>About Self-Care Assistant</h4>
              <p>
                We believe that self-care should be accessible, personalized, and enjoyable. 
                Our platform combines AI-powered recommendations with proven wellness practices 
                to help you build sustainable healthy habits and achieve your wellness goals.
              </p>
            </div>
          </div>

          <div className="footer-contents">
            <div className="footer-section">
              <h3>Our Services</h3>
              <ul className="footer-links">
                <li><Link to="/fashion-suggestion">Fashion Suggestion</Link></li>
                <li><Link to="/health-tips">Health Tips</Link></li>
                <li><Link to="/daily-routine">Daily Routine</Link></li>
                <li><Link to="/skin-hair-care">Skin & Hair Care</Link></li>
                <li><Link to="/todo-list">To-do List</Link></li>
                <li><Link to="/reminders">Reminders</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Support</h3>
              <ul className="footer-links">
                <li><Link to="/contact">Contact Us</Link></li>
                <li><a href="#help-center">Help Center</a></li>
                <li><a href="#privacy-policy">Privacy Policy</a></li>
                <li><a href="#terms-of-service">Terms of Service</a></li>
                <li><a href="#cookie-policy">Cookie Policy</a></li>
                <li><a href="mailto:support@selfcareassistant.com">Email Support</a></li>
              </ul>
            </div>
          </div>    
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© {new Date().getFullYear()} Vedika' Self-Care Assistant. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;