import React from 'react'
import './Cards.css'

function Cards() {
      // Sample product data based on the content from OLX
  const featuredProducts = [
    {
      id: 1,
      title: "iPhone 13 5G",
      price: "₹ 27,000",
      location: "Valeplae, Karkal",
      date: "19 Jul",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "2021 Car - 25,096 km",
      price: "₹ 68,000",
      location: "Masinayakkampatti, Masinaickenpatty",
      date: "7 Jul",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "iPhone 15 Pro 4 month old",
      price: "₹ 33,500",
      location: "Samudrapur, Maharashtra",
      date: "Today",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "iPhone 13 4 month old",
      price: "₹ 21,000",
      location: "Samudrapur, Maharashtra",
      date: "4 days ago",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Mahindra Xylo 2012 Diesel",
      price: "₹ 2,60,000",
      location: "Samudrapur, Maharashtra",
      date: "8 Jul",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Model 19 160cc",
      price: "₹ 80,000",
      location: "Samudrapur MIDC, Maharashtra",
      date: "18 Jul",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
      id: 7,
      title: "Trendy Men Analog Watches",
      price: "₹ 249",
      location: "Samudrapur, Maharashtra",
      date: "8 Jul",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop"
    },
    {
      id: 8,
      title: "RD5 projector 3D 4K wifi smart",
      price: "₹ 6,500",
      location: "Samudrapur, Maharashtra",
      date: "10 Jul",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=200&fit=crop"
    }
  ];

  return (
    <div>
        <section className="recommendations-section">
          <div className="container">
            <div className="section-header">
              <h2>Fresh recommendations</h2>
            </div>
            <div className="products-grid">
              {featuredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                    <button className="favorite-btn">♡</button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-price">{product.price}</h3>
                    <p className="product-title">{product.title}</p>
                    <div className="product-location">
                      <span>{product.location}</span>
                      <span className="product-date">{product.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
  )
}

export default Cards