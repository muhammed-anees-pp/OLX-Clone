import React, { useState } from 'react'
import './Categories.css'
import dropdown_arrow from '../../assets/icons/dropdown-arrow.png'

function Categories () {
  const [showAllCategories, setShowAllCategories] = useState(false)

  const categories = [
    'Cars',
    'Motorcycles',
    'Mobile Phones',
    'For Sale: Houses & Apartments',
    'Scooters',
    'Commercial & Other Vehicles',
    'For Rent: Houses & Apartments'
  ];

  const allCategoriesList = [
    'Cars',
    'Motorcycles',
    'Mobile Phones',
    'Houses & Apartments for Sale',
    'Scooters',
    'Commercial & Other Vehicles',
    'Houses & Apartments for Rent',
    'Jobs',
    'Bikes',
    'Electronics & Appliances',
    'Furniture',
    'Fashion',
    'Books, Sports & Hobbies',
    'Pets',
    'Services'
  ];

  return (
    <div className="categories-section">
      <div className="categories-container">
        <div className="all-categories-wrapper">
          <div 
            className="all-categories-button"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            <span>ALL CATEGORIES</span>
            <img 
              src={dropdown_arrow} 
              alt="Dropdown" 
              className="categories-dropdown-arrow"
            />
          </div>
          
          {showAllCategories && (
            <div className="all-categories-dropdown">
              {allCategoriesList.map((category, index) => (
                <div key={index} className="category-dropdown-item">
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="category-links">
          {categories.map((category, index) => (
            <a key={index} href="#" className="category-link">
              {category}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories