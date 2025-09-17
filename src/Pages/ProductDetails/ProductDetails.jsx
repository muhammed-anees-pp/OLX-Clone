import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { FaArrowLeft } from "react-icons/fa"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import "./ProductDetails.css"

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() })
        }
      } catch (err) {
        console.error("Error loading product:", err)
      }
    }
    fetchProduct()
  }, [id])

  if (!product) return <div className="loading">Loading...</div>

  return (
    <>
      <Navbar />
      <div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" /> Back
        </button>
      </div>
      <div className="details-container">
        

        <div className="details-card">
          <div className="details-image">
            <img src={product.imageUrl} alt={product.title} />
          </div>

          <div className="details-info">
            <h2>{product.title}</h2>
            <p className="details-price">₹ {product.price}</p>
            <p className="details-location">{product.location}</p>
            <p className="details-date">
              {new Date(product.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="details-description">{product.description}</p>

            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
