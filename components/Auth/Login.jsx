"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  // Device tracking stub - will be enhanced with backend
  const getDeviceFingerprint = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("Device fingerprint", 2, 2)

    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvasFingerprint: canvas.toDataURL(),
      timestamp: new Date().toISOString(),
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Device tracking
      const deviceInfo = getDeviceFingerprint()
      console.log("Device tracking:", deviceInfo)

      // Simulate login validation (replace with actual API call)
      if (formData.email && formData.password) {
        const userData = {
          id: "user_" + Date.now(),
          name: formData.email.split("@")[0],
          email: formData.email,
          deviceInfo,
        }

        login(userData)
        toast.success("Login successful! Welcome back!")
        navigate("/")
      } else {
        toast.error("Please fill in all fields")
      }
    } catch (error) {
      toast.error("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your BOOKBUCKS account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <div className="loading-spinner"></div> : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
