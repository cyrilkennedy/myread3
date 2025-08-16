"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otpCode: "",
  })
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const { login, pendingVerification } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password, formData.otpCode || null)
      toast.success("Login successful! Welcome back!")
      navigate("/")
    } catch (error) {
      if (error.message === "OTP_REQUIRED") {
        setShowOTP(true)
        setOtpSent(true)
        toast.info("OTP sent to your email for verification")
      } else {
        toast.error(error.message || "Login failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (!pendingVerification) return

    try {
      setLoading(true)
      // OTP is automatically sent when login fails with OTP_REQUIRED
      toast.success("New OTP sent to your email")
    } catch (error) {
      toast.error("Failed to resend OTP")
    } finally {
      setLoading(false)
    }
  }

  // Added handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your BOOKBUCKS account</p>
            <div className="security-indicator">
              <span className="security-icon">🔒</span>
              <span>Secured with advanced authentication</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {showOTP && (
              <div className="form-group otp-group">
                <label htmlFor="otpCode">Verification Code</label>
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
                    <p>Check your email for the verification code</p>
                    <button type="button" onClick={handleResendOTP} className="resend-otp-btn" disabled={loading}>
                      Resend Code
                    </button>
                  </div>
                )}
              </div>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <div className="loading-spinner"></div> : showOTP ? "Verify & Sign In" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
