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

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-text">BOOKBUCKS</span>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {user ? (
            // Logged in user navigation
            <>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
              <Link to="/categories" className="nav-link" onClick={closeMenu}>
                Categories
              </Link>
              <Link to="/profile" className="nav-link" onClick={closeMenu}>
                Profile
              </Link>
              <Link to="/referral" className="nav-link" onClick={closeMenu}>
                Referral
              </Link>
              <Link to="/support" className="nav-link" onClick={closeMenu}>
                Support
              </Link>
              <div className="nav-user-info">
                <span className="user-balance">₦{user.balance}</span>
                <span className="user-name">{user.name}</span>
              </div>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            // Visitor navigation
            <>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
              <Link to="/about" className="nav-link" onClick={closeMenu}>
                About
              </Link>
              <Link to="/support" className="nav-link" onClick={closeMenu}>
                Support
              </Link>
              <Link to="/login" className="nav-link" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="nav-link nav-signup" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
