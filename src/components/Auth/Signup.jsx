"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import "./Signup.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otpCode: "",
  })
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const { signup, pendingVerification } = useAuth()
  const navigate = useNavigate()

  // Declare handleChange function
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
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return false
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      toast.error("Password must contain uppercase, lowercase, and number")
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
      await signup(formData.name.trim(), formData.email.trim(), formData.password, "", formData.otpCode || null)
      toast.success("Account created successfully! Welcome to BOOKBUCKS!")
      navigate("/")
    } catch (error) {
      if (error.message === "OTP_REQUIRED") {
        setShowOTP(true)
        setOtpSent(true)
        toast.info("OTP sent to your email for verification")
      } else {
        toast.error(error.message || "Signup failed. Please try again.")
      }
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
            <div className="security-indicator">
              <span className="security-icon">🔒</span>
              <span>Email verification required</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {showOTP && (
              <div className="form-group otp-group">
                <label htmlFor="otpCode">Email Verification Code</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="otpCode"
                    name="otpCode"
                    value={formData.otpCode}
                    onChange={handleChange}
                    required={showOTP}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    pattern="[0-9]{6}"
                  />
                </div>
                {otpSent && (
                  <div className="otp-info">
                    <p>We've sent a verification code to your email</p>
                  </div>
                )}
              </div>
            )}

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : showOTP ? (
                "Verify & Create Account"
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
