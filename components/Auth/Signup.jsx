"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import "./Signup.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
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

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return false
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Device tracking
      const deviceInfo = getDeviceFingerprint()
      console.log("Device tracking:", deviceInfo)

      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        deviceInfo,
      }

      signup(userData)
      toast.success("Account created successfully! Welcome to BOOKBUCKS!")
      navigate("/")
    } catch (error) {
      toast.error("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="signup-header">
            <h2>Join BOOKBUCKS</h2>
            <p>Create your account and start earning rewards</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
                  placeholder="Create a password (min. 6 characters)"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? <div className="loading-spinner"></div> : "Create Account"}
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
