"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("bookbucks_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("bookbucks_user")
      }
    }
    setLoading(false)
  }, [])

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("bookbucks_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("bookbucks_user")
    }
  }, [user])

  const login = (userData) => {
    const userWithDefaults = {
      ...userData,
      balance: userData.balance || 0,
      referrals: userData.referrals || 0,
      referralEarnings: userData.referralEarnings || 0,
      transactions: userData.transactions || [],
      theme: userData.theme || "light",
      username: userData.username || "",
      joinDate: userData.joinDate || new Date().toISOString(),
    }
    setUser(userWithDefaults)
  }

  const signup = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      balance: 0,
      referrals: 0,
      referralEarnings: 0,
      transactions: [],
      theme: "light",
      username: "",
      joinDate: new Date().toISOString(),
    }
    setUser(newUser)
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  const addEarnings = (amount, description = "Reading reward") => {
    const transaction = {
      id: Date.now().toString(),
      type: "earning",
      amount,
      description,
      date: new Date().toISOString(),
    }

    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
      transactions: [transaction, ...prev.transactions],
    }))
  }

  const addReferralEarning = (amount) => {
    const transaction = {
      id: Date.now().toString(),
      type: "referral",
      amount,
      description: "Referral bonus",
      date: new Date().toISOString(),
    }

    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
      referralEarnings: prev.referralEarnings + amount,
      transactions: [transaction, ...prev.transactions],
    }))
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    addEarnings,
    addReferralEarning,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
