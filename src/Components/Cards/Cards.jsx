import React, { useEffect, useState } from "react"
import "./Cards.css"
import { db } from "../../firebaseConfig"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'


function Cards() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)

        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setProducts(items);
      } catch (err) {
        console.error("Error fetching products:", err)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="recommendations-section">
      <div className="container">
        <div className="section-header">
          <h2>Fresh recommendations</h2>
        </div>

        <div className="products-grid">
          {products.length === 0 ? (
            <p>No products yet</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.title} />
                  <button className="favorite-btn">♡</button>
                </div>
                
                <div className="product-info">
                  <h3 className="product-price">₹ {product.price}</h3>


                  <h4 className="product-title">{product.title}</h4>

                  <div className="product-location">
                    <span>{product.location}</span>    
                    <span className="product-date">
                      {new Date(product.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Cards;
