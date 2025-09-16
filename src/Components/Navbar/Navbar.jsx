import React, { useState } from 'react';
import './Navbar.css';
import location_icon from '../../assets/icons/location-icon.png'
import search_icon from '../../assets/icons/search-icon.png'
import dropdown_arrow from '../../assets/icons/dropdown-arrow.png'
import heart_icon from '../../assets/icons/heart-icon.png'

function Navbar() {
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Logo.png" alt="OLX" />
        </div>

        <div className="location-selector" onClick={() => setLocationDropdown(!locationDropdown)}>
          <div className="location-content">
            <img 
              src={location_icon}
              alt="Location" 
              className="location-icon"
            />
            <span>India</span>
            <img 
              src={dropdown_arrow}
              alt="Dropdown" 
              className="location-icon"
            />
          </div>
          {locationDropdown && (
            <div className="location-dropdown">
              <div className="dropdown-item">Delhi</div>
              <div className="dropdown-item">Mumbai</div>
              <div className="dropdown-item">Bangalore</div>
              <div className="dropdown-item">Chennai</div>
            </div>
          )}
        </div>

        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Find Cars, Mobile Phones and more..."
              className="search-input"
            />
            <button className="search-button">
              <img 
                src={search_icon} 
                alt="Search" 
                className="search-icon"
              />
            </button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="language-selector">
            <span>ENGLISH</span>
            <img 
              src={dropdown_arrow}
              alt="Dropdown" 
              className="dropdown-arrow"
            />
          </div>

          <div className="favorites-icon">
            <img 
              src={heart_icon}
              alt="Favorites" 
              className="heart-icon"
            />
          </div>

          <div className="login-link">
            <span>Login</span>
          </div>

          <div className="profile-section" onClick={() => setProfileDropdown(!profileDropdown)}>
            <div className="profile-avatar">
              <span>M</span>
            </div>
            <img 
              src={dropdown_arrow}
              alt="Dropdown" 
              className="dropdown-arrow"
            />
            {profileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-item">My Account</div>
                <div className="dropdown-item">My Orders</div>
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item">Logout</div>
              </div>
            )}
          </div>

          <button className="sell-button">
            <span className="plus-icon">+</span>
            <span>SELL</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;