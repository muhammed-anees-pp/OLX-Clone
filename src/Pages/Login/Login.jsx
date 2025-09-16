import React, { useState } from 'react'
import './Login.css'

function Login() {
  const [signState, setSignState] = useState("Sign In")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (signState === "Sign Up") {
      if (!fullName.trim()) {
        newErrors.fullName = "Full name is required"
      }
      
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match"
      }
      
      if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }
    
    if (!password.trim()) {
      newErrors.password = "Password is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const user_auth = async (event) => {
    event.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    try {
      if (signState === "Sign In") {
        console.log("Login attempt:", { email, password })
      } else {
        console.log("Signup attempt:", { fullName, email, password })
      }
    } catch (error) {
      console.error("Authentication error:", error)
    }
    setLoading(false)
  }

  const handleStateChange = (newState) => {
    setSignState(newState)
    setErrors({})
    setFullName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    loading ? <div className='login-spinner'>
      <div className="spinner"></div>
      <p>Please wait...</p>
    </div> :
    <div className='login'>
      <div className="login-container">
        <div className="login-form">
          <div className="olx-logo">
            <img src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Logo.png" alt="OLX" className='login-logo'/>
          </div>
          <h1>{signState}</h1>
          <p className="login-subtext">
            {signState === "Sign In" ? "Welcome back to OLX" : "Join millions of people using OLX"}
          </p>
          
          <div className="auth-form">
            {signState === "Sign Up" && (
              <div className="input-group">
                <input 
                  value={fullName} 
                  onChange={(e) => {setFullName(e.target.value)}} 
                  type="text" 
                  placeholder='Full Name'
                />
              </div>
            )}
            
            <div className="input-group">
              <input 
                value={email} 
                onChange={(e) => {setEmail(e.target.value)}} 
                type="email" 
                placeholder='Email' 
              />
            </div>
            
            <div className="input-group">
              <input 
                value={password} 
                onChange={(e) => {setPassword(e.target.value)}} 
                type="password" 
                placeholder='Password'
              />
            </div>
            
            {signState === "Sign Up" && (
              <div className="input-group">
                <input 
                  value={confirmPassword} 
                  onChange={(e) => {setConfirmPassword(e.target.value)}} 
                  type="password" 
                  placeholder='Confirm Password'
                />
              </div>
            )}
            
            <button onClick={user_auth} className="auth-button">
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
            {signState === "Sign In" ? 
              <p>New to OLX? <span onClick={() => {handleStateChange("Sign Up")}}>Sign Up Now</span></p> : 
              <p>Already have an account? <span onClick={() => {handleStateChange("Sign In")}}>Sign In Now</span></p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login