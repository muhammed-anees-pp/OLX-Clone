import React from "react";
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../AuthContext/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p>Loading...</p>

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
