import React, { useState } from "react"
import axios from "axios"
import { db } from "../../firebaseConfig"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import "./Sell.css"
import Footer from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navbar/Navbar"
import { FaArrowLeft } from "react-icons/fa"

function Sell() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState("")

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setFormError("Please upload a valid image file (jpg, jpeg, png, gif, webp)");
      setImage(null);
      setPreview("");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setFormError("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) return setFormError("Please enter a product title")
    if (!category) return setFormError("Please select a category")
    const parsedPrice = Number(price);
    if (!price.trim()) return setFormError("Please enter a price");
    if (isNaN(parsedPrice)) return setFormError("Price must be a valid number");
    if (parsedPrice <= 0) return setFormError("Price must be greater than zero");
    if (parsedPrice > 10000000)
      return setFormError("Price cannot exceed 10,000,000");
    if (!location.trim()) return setFormError("Please enter a location")
    if (!description.trim()) return setFormError("Please enter a description")
    if (!image) return setFormError("Please upload an image")
    setFormError("")

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", "olx_preset")

      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dgc2gyhhb/image/upload",
        formData
      )
      const imageUrl = cloudRes.data.secure_url

      await addDoc(collection(db, "products"), {
        title,
        category,
        price: Number(price),
        description,
        location,                        
        imageUrl,
        createdAt: serverTimestamp(),
        date: new Date().toISOString(),
      })

      toast.success("Ad posted successfully!", {
        onClose: () => navigate("/"),
        autoClose: 2000,
      })

      setTitle("")
      setCategory("")
      setPrice("")
      setDescription("")
      setLocation("")
      setImage(null)
      setPreview("")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" /> Back
        </button>
      </div>
      <div className="sell-form-container">
        <h2>Post Your Ad</h2>
        {formError && <p className="form-error">{formError}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Cars">Cars</option>
            <option value="Bikes">Bikes</option>
            <option value="Electronics">Electronics</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            className="input-field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="input-field"             
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            placeholder="Description"
            rows="4"
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="input-field"
            onChange={handleImageChange}
          />

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" className="preview-img-small" />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Posting..." : "Post Ad"}
          </button>
        </form>

        <ToastContainer position="top-right" className="custom-toast" />
      </div>

      <Footer />
    </>
  );
}

export default Sell;
