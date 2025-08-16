"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import "./Profile.css"

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState({
    name: false,
    username: false,
    password: false,
  })
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-message">Please log in to view your profile.</div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = (field) => {
    if (field === "name" && formData.name.trim()) {
      updateUser({ name: formData.name.trim() })
      toast.success("Name updated successfully!")
      setIsEditing({ ...isEditing, name: false })
    } else if (field === "username" && formData.username.trim()) {
      updateUser({ username: formData.username.trim() })
      toast.success("Username updated successfully!")
      setIsEditing({ ...isEditing, username: false })
    } else if (field === "password") {
      if (formData.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters")
        return
      }
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match")
        return
      }
      // In real app, this would verify current password
      toast.success("Password updated successfully!")
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setIsEditing({ ...isEditing, password: false })
    }
  }

  const handleCancel = (field) => {
    setIsEditing({ ...isEditing, [field]: false })
    if (field === "name") {
      setFormData({ ...formData, name: user.name })
    } else if (field === "username") {
      setFormData({ ...formData, username: user.username || "" })
    } else if (field === "password") {
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
  }

  const toggleTheme = () => {
    const newTheme = user.theme === "light" ? "dark" : "light"
    updateUser({ theme: newTheme })
    document.body.className = newTheme
    toast.success(`Switched to ${newTheme} mode`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-large">{user.name?.charAt(0).toUpperCase() || "U"}</div>
        <h1>My Profile</h1>
        <p>Manage your account settings and view your earnings</p>
      </div>

      <div className="profile-content">
        {/* Balance Card */}
        <div className="balance-card">
          <h2>Account Balance</h2>
          <div className="balance-amount">₦{user.balance?.toLocaleString() || "0"}</div>
          <div className="balance-actions">
            <Link to="/withdrawal" className="withdraw-btn">
              Withdraw Funds
            </Link>
          </div>
        </div>

        {/* User Information */}
        <div className="info-section">
          <h3>Personal Information</h3>

          {/* Name */}
          <div className="info-item">
            <label>Full Name</label>
            {isEditing.name ? (
              <div className="edit-field">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
                <div className="edit-actions">
                  <button onClick={() => handleSave("name")} className="save-btn">
                    Save
                  </button>
                  <button onClick={() => handleCancel("name")} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-display">
                <span>{user.name}</span>
                <button onClick={() => setIsEditing({ ...isEditing, name: true })} className="edit-btn">
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="info-item">
            <label>Email Address</label>
            <div className="info-display">
              <span>{user.email}</span>
              <span className="readonly-label">Read Only</span>
            </div>
          </div>

          {/* Username */}
          <div className="info-item">
            <label>Username</label>
            {isEditing.username ? (
              <div className="edit-field">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose a username"
                />
                <div className="edit-actions">
                  <button onClick={() => handleSave("username")} className="save-btn">
                    Save
                  </button>
                  <button onClick={() => handleCancel("username")} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-display">
                <span>{user.username || "Not set"}</span>
                <button onClick={() => setIsEditing({ ...isEditing, username: true })} className="edit-btn">
                  {user.username ? "Edit" : "Add"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security Section */}
        <div className="info-section">
          <h3>Security</h3>

          <div className="info-item">
            <label>Password</label>
            {isEditing.password ? (
              <div className="edit-field">
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Current password"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New password"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                />
                <div className="edit-actions">
                  <button onClick={() => handleSave("password")} className="save-btn">
                    Update Password
                  </button>
                  <button onClick={() => handleCancel("password")} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-display">
                <span>••••••••</span>
                <button onClick={() => setIsEditing({ ...isEditing, password: true })} className="edit-btn">
                  Change
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="info-section">
          <h3>Preferences</h3>

          <div className="info-item">
            <label>Theme</label>
            <div className="info-display">
              <span>{user.theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
              <button onClick={toggleTheme} className="theme-toggle-btn">
                Switch to {user.theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="info-section">
          <h3>Recent Transactions</h3>
          <div className="transactions-list">
            {user.transactions && user.transactions.length > 0 ? (
              user.transactions.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <span className="transaction-description">{transaction.description}</span>
                    <span className="transaction-date">{formatDate(transaction.date)}</span>
                  </div>
                  <div className={`transaction-amount ${transaction.type}`}>+₦{transaction.amount}</div>
                </div>
              ))
            ) : (
              <div className="no-transactions">
                <p>No transactions yet. Start reading to earn your first rewards!</p>
                <Link to="/categories" className="start-reading-btn">
                  Start Reading
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
