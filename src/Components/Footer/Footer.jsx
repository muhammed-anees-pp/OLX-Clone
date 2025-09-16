import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">POPULAR LOCATIONS</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Kolkata</a></li>
            <li><a href="#" className="footer-link">Mumbai</a></li>
            <li><a href="#" className="footer-link">Chennai</a></li>
            <li><a href="#" className="footer-link">Pune</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">TRENDING LOCATIONS</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Bhubaneshwar</a></li>
            <li><a href="#" className="footer-link">Hyderabad</a></li>
            <li><a href="#" className="footer-link">Chandigarh</a></li>
            <li><a href="#" className="footer-link">Nashik</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">ABOUT US</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">TechOLX</a></li>
            <li><a href="#" className="footer-link">Careers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">OLX</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Blog</a></li>
            <li><a href="#" className="footer-link">Help</a></li>
            <li><a href="#" className="footer-link">Sitemap</a></li>
            <li><a href="#" className="footer-link">Legal & Privacy information</a></li>
            <li><a href="#" className="footer-link">Vulnerability Disclosure Program</a></li>
          </ul>
        </div>

      </div>
    </footer>
  )
}

export default Footer