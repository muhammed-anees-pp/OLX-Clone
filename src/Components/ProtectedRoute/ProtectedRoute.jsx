import React from "react";
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../AuthContext/AuthContext"
import glow_loading from "../../assets/loading.gif"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading)
  return (
    <div className="loading-spinner">
      <img src={glow_loading} alt="Loading..." />
    </div>
  );

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
