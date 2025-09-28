import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <div className="heart">🧡</div>
            <div className="leaves">🌿</div>
          </div>
          <span className="logo-text">Self-Care Assistant</span>
        </div>
        
        <nav className="nav">
          <div className="nav-icon">🧡</div>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;