import React, { useState } from 'react'
import './Login.css'
import glow_loading from '../../assets/loading.gif'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from "../../firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [signState, setSignState] = useState("Sign In")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email is required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format")
      return false
    }
    if (!password.trim()) {
      toast.error("Password is required")
      return false
    }
    if (signState === "Sign Up") {
      if (!fullName.trim()) {
        toast.error("Full name is required")
        return false
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters")
        return false
      }
      if (password !== confirmPassword) {
        toast.error("Passwords don't match")
        return false
      }
    }
    return true
  }

  const firebaseErrorHandler = (error) => {
    console.log(error.code)
    if (signState === "Sign In") {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/invalid-email":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          toast.error("Wrong email or password")
          break
        default:
          toast.error(error.message)
      }
    } else {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered")
          break
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters")
          break
        default:
          toast.error(error.message)
      }
    }
  }


  const user_auth = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      if (signState === "Sign In") {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Logged in successfully!")
        navigate('/')
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, { displayName: fullName })
        toast.success("Account created successfully!")
        navigate('/')
      }
    } catch (error) {
      firebaseErrorHandler(error)
    } finally {
      setLoading(false)
    }
  }

  const handleStateChange = (newState) => {
    setSignState(newState)
    setFullName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className='login'>
      {loading && (
        <div className="login-spinner">
          <img src={glow_loading} alt="Loading..." />
        </div>
      )}
      <div className="login-container">
        <div className="login-form">
          <div className="olx-logo">
            <img src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Logo.png" alt="OLX" className='login-logo'/>
          </div>
          <h1>{signState}</h1>
          <p className="login-subtext">
            {signState === "Sign In"
              ? "Welcome back to OLX"
              : "Join millions of people using OLX"}
          </p>

          <div className="auth-form">
            {signState === "Sign Up" && (
              <div className="input-group">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
            )}

            <div className="input-group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="input-group">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>

            {signState === "Sign Up" && (
              <div className="input-group">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            )}

            <button onClick={user_auth} className="auth-button" disabled={loading}>
              {signState}
            </button>

            {signState === "Sign In" && (
              <div className="form-help">
                <div className="remember">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
            )}
          </div>

          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New to OLX?{" "}
                <span onClick={() => handleStateChange("Sign Up")}>
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => handleStateChange("Sign In")}>
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Login
