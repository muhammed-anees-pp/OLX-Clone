import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css"
import { useNavigate } from "react-router-dom"
import location_icon from "../../assets/icons/location-icon.png"
import search_icon from "../../assets/icons/search-icon.png"
import dropdown_arrow from "../../assets/icons/dropdown-arrow.png"
import heart_icon from "../../assets/icons/heart-icon.png"
import { auth } from "../../firebaseConfig"
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"
import { useAuth } from "../AuthContext/AuthContext"



function Navbar() {
  const [locationDropdown, setLocationDropdown] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const profileRef = useRef(null);
  const searchInputRef = useRef(null);


  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Error logging out",error)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Logo.png" alt="OLX" />
        </div>

        <div className="location-selector" onClick={() => setLocationDropdown(!locationDropdown)}>
          <div className="location-content">
            <img src={location_icon} alt="Location" className="location-icon" />
            <span>India</span>
            <img src={dropdown_arrow} alt="Dropdown" className="location-icon" />
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
            <input ref={searchInputRef} type="text" placeholder="Find Cars, Mobile Phones and more..." className="search-input" />
            <button className="search-button">
              <img src={search_icon} alt="Search" className="search-icon" />
            </button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="language-selector">
            <span>ENGLISH</span>
            <img src={dropdown_arrow} alt="Dropdown" className="dropdown-arrow" />
          </div>

          <div className="favorites-icon">
            <img src={heart_icon} alt="Favorites" className="heart-icon" />
          </div>

          {!user ? (
            <div className="login-link" onClick={() => navigate("/login")}>
              <span>Login</span>
            </div>
          ) : (
            <div ref={profileRef} className="profile-section" onClick={() => setProfileDropdown(!profileDropdown)}>
              <div className="profile-avatar">
                <span>{user.displayName ? user.displayName[0].toUpperCase() : "U"}</span>
              </div>
              <img src={dropdown_arrow} alt="Dropdown" className="dropdown-arrow" />
              {profileDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-item">My Account</div>
                  <div className="dropdown-item">My Orders</div>
                  <div className="dropdown-item">Settings</div>
                  <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          )}
          <button className="sell-button" onClick={() => {
              if (user) {
                navigate("/sell");
              } else {
                toast.error("You have to login first")
                setTimeout(() => {
                navigate("/login")
                }, 1500)
              }
            }}>
            <span className="plus-icon">+</span>
            <span>SELL</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
