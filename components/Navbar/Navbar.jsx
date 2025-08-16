"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "./Navbar.css"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          BOOKBUCKS
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="navbar-nav">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>

            {user ? (
              <>
                <Link to="/categories" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Categories
                </Link>
                <Link to="/referral" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Referral
                </Link>
                <div className="profile-dropdown">
                  <Link to="/profile" className="profile-link" onClick={() => setIsMenuOpen(false)}>
                    <div className="profile-avatar">{user.name?.charAt(0).toUpperCase() || "U"}</div>
                    <span className="profile-name">{user.name}</span>
                  </Link>
                </div>
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="nav-link signup-btn" onClick={() => setIsMenuOpen(false)}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
