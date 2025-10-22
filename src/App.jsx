import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Sell from "./Pages/Sell/Sell"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import Login from "./Pages/Login/Login"
import AuthProvider from "./Components/AuthContext/AuthContext"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
