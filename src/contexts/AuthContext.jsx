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
  const [sessionToken, setSessionToken] = useState(null)
  const [deviceFingerprint, setDeviceFingerprint] = useState(null)
  const [isVerified, setIsVerified] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(null)

  const generateDeviceFingerprint = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("BOOKBUCKS Security", 2, 2)

    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(",") || "",
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvasFingerprint: canvas.toDataURL(),
      webglFingerprint: getWebGLFingerprint(),
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId(),
    }

    return btoa(JSON.stringify(fingerprint))
  }

  const getWebGLFingerprint = () => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) return "no-webgl"

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
      return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "webgl-available"
    } catch (e) {
      return "webgl-error"
    }
  }

  const generateSessionId = () => {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
  }

  const setSecureCookie = (name, value, days = 7) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
  }

  const getSecureCookie = (name) => {
    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  const deleteSecureCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure;samesite=strict`
  }

  useEffect(() => {
    const initializeAuth = async () => {
      const fingerprint = generateDeviceFingerprint()
      setDeviceFingerprint(fingerprint)

      const savedToken = getSecureCookie("bookbucks_session")
      const savedUser = localStorage.getItem("bookbucks_user")

      if (savedToken && savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          if (await verifySession(savedToken, fingerprint)) {
            setUser(userData)
            setSessionToken(savedToken)
            setIsVerified(true)
          } else {
            await secureLogout()
          }
        } catch (error) {
          console.error("Error initializing auth:", error)
          await secureLogout()
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const verifySession = async (token, fingerprint) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(token && fingerprint)
      }, 100)
    })
  }

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendOTP = async (email, type = "signup") => {
    const otp = generateOTP()
    console.log(`[SECURITY] OTP for ${email}: ${otp}`)

    const otpData = {
      code: otp,
      email: email,
      type: type,
      expires: Date.now() + 5 * 60 * 1000,
      attempts: 0,
    }

    localStorage.setItem("bookbucks_otp", JSON.stringify(otpData))
    return { success: true, message: "OTP sent to your email" }
  }

  const verifyOTP = async (email, code) => {
    const storedOTP = localStorage.getItem("bookbucks_otp")
    if (!storedOTP) return { success: false, message: "No OTP found" }

    const otpData = JSON.parse(storedOTP)

    if (otpData.expires < Date.now()) {
      localStorage.removeItem("bookbucks_otp")
      return { success: false, message: "OTP expired" }
    }

    if (otpData.attempts >= 3) {
      localStorage.removeItem("bookbucks_otp")
      return { success: false, message: "Too many attempts" }
    }

    if (otpData.email !== email || otpData.code !== code) {
      otpData.attempts++
      localStorage.setItem("bookbucks_otp", JSON.stringify(otpData))
      return { success: false, message: "Invalid OTP" }
    }

    localStorage.removeItem("bookbucks_otp")
    return { success: true, message: "OTP verified successfully" }
  }

  const login = async (email, password, otpCode = null) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!email || !password) {
          reject(new Error("Email and password are required"))
          return
        }

        const currentFingerprint = generateDeviceFingerprint()

        await new Promise((r) => setTimeout(r, 1000))

        const isNewDevice = !getSecureCookie("bookbucks_device")

        if (isNewDevice && !otpCode) {
          await sendOTP(email, "login")
          setPendingVerification({ email, password, type: "login" })
          reject(new Error("OTP_REQUIRED"))
          return
        }

        if (otpCode) {
          const otpResult = await verifyOTP(email, otpCode)
          if (!otpResult.success) {
            reject(new Error(otpResult.message))
            return
          }
        }

        const sessionToken = generateSessionId()
        const userData = {
          id: Date.now(),
          name: email.split("@")[0],
          email: email,
          balance: 0,
          totalEarned: 0,
          referrals: 0,
          referralEarnings: 0,
          booksRead: 0,
          pagesRead: 0,
          joinDate: new Date().toISOString(),
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
          theme: "light",
          transactions: [],
          deviceFingerprint: currentFingerprint,
          lastLogin: new Date().toISOString(),
          loginCount: 1,
        }

        setSecureCookie("bookbucks_session", sessionToken, 7)
        setSecureCookie("bookbucks_device", currentFingerprint, 30)
        localStorage.setItem("bookbucks_user", JSON.stringify(userData))

        setUser(userData)
        setSessionToken(sessionToken)
        setIsVerified(true)
        setPendingVerification(null)

        resolve(userData)
      } catch (error) {
        reject(error)
      }
    })
  }

  const signup = async (name, email, password, referralCode = "", otpCode = null) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!name || !email || !password) {
          reject(new Error("All fields are required"))
          return
        }

        if (!otpCode) {
          await sendOTP(email, "signup")
          setPendingVerification({ name, email, password, referralCode, type: "signup" })
          reject(new Error("OTP_REQUIRED"))
          return
        }

        const otpResult = await verifyOTP(email, otpCode)
        if (!otpResult.success) {
          reject(new Error(otpResult.message))
          return
        }

        const currentFingerprint = generateDeviceFingerprint()
        const sessionToken = generateSessionId()

        const userData = {
          id: Date.now(),
          name: name,
          email: email,
          balance: referralCode ? 100 : 0,
          totalEarned: referralCode ? 100 : 0,
          referrals: 0,
          referralEarnings: 0,
          booksRead: 0,
          pagesRead: 0,
          joinDate: new Date().toISOString(),
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
          theme: "light",
          transactions: referralCode
            ? [
                {
                  id: 1,
                  type: "referral_bonus",
                  amount: 100,
                  description: "Referral signup bonus",
                  date: new Date().toISOString(),
                  status: "completed",
                },
              ]
            : [],
          deviceFingerprint: currentFingerprint,
          isVerified: true,
          signupDate: new Date().toISOString(),
        }

        setSecureCookie("bookbucks_session", sessionToken, 7)
        setSecureCookie("bookbucks_device", currentFingerprint, 30)
        localStorage.setItem("bookbucks_user", JSON.stringify(userData))

        setUser(userData)
        setSessionToken(sessionToken)
        setIsVerified(true)
        setPendingVerification(null)

        resolve(userData)
      } catch (error) {
        reject(error)
      }
    })
  }

  const requireStepUpAuth = async (operation) => {
    if (!user) throw new Error("User not authenticated")

    const sensitiveOps = ["withdrawal", "password_change", "email_change"]

    if (sensitiveOps.includes(operation)) {
      await sendOTP(user.email, "stepup")
      return { requiresOTP: true, message: "Additional verification required" }
    }

    return { requiresOTP: false }
  }

  const secureLogout = async () => {
    try {
      if (sessionToken) {
        console.log(`[SECURITY] Invalidating session: ${sessionToken}`)
      }

      deleteSecureCookie("bookbucks_session")
      deleteSecureCookie("bookbucks_device")
      localStorage.removeItem("bookbucks_user")
      localStorage.removeItem("bookbucks_otp")

      setUser(null)
      setSessionToken(null)
      setIsVerified(false)
      setPendingVerification(null)

      return { success: true, message: "Logged out securely" }
    } catch (error) {
      console.error("Logout error:", error)
      return { success: false, message: "Logout failed" }
    }
  }

  const logout = () => {
    secureLogout()
  }

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  const addEarnings = (amount, description = "Reading reward") => {
    const transaction = {
      id: Date.now(),
      type: "reading",
      amount: amount,
      description: description,
      date: new Date().toISOString(),
      status: "completed",
    }

    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
      totalEarned: prev.totalEarned + amount,
      pagesRead: prev.pagesRead + 1,
      transactions: [transaction, ...prev.transactions],
    }))
  }

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    addEarnings,
    loading,
    isVerified,
    pendingVerification,
    sendOTP,
    verifyOTP,
    requireStepUpAuth,
    deviceFingerprint,
    sessionToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
