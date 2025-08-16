"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import "./Referral.css"

const Referral = () => {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)

  // Mock leaderboard data - in real app, this would come from backend
  const leaderboardData = [
    { rank: 1, name: "Sarah Johnson", referrals: 45, earnings: 22500 },
    { rank: 2, name: "Michael Chen", referrals: 38, earnings: 19000 },
    { rank: 3, name: "Emma Wilson", referrals: 32, earnings: 16000 },
    { rank: 4, name: "David Martinez", referrals: 28, earnings: 14000 },
    { rank: 5, name: "Lisa Anderson", referrals: 25, earnings: 12500 },
    { rank: 6, name: "You", referrals: user?.referrals || 0, earnings: user?.referralEarnings || 0 },
  ]

  const referralLink = `https://bookbucks.com/signup?ref=${user?.id || "demo123"}`
  const referralBonus = 500 // ₦500 per referral

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      toast.success("Referral link copied to clipboard!")
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      toast.error("Failed to copy link. Please copy manually.")
    }
  }

  const shareOnWhatsApp = () => {
    const message = `Join BOOKBUCKS and earn money by reading books! Use my referral link: ${referralLink}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const shareOnTwitter = () => {
    const message = `Earn money by reading books on BOOKBUCKS! 📚💰 Join using my link: ${referralLink}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
    window.open(twitterUrl, "_blank")
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
    window.open(facebookUrl, "_blank")
  }

  if (!user) {
    return (
      <div className="referral-container">
        <div className="error-message">Please log in to access your referral dashboard.</div>
      </div>
    )
  }

  const userRank = leaderboardData.findIndex((item) => item.name === "You") + 1
  const nextTarget = userRank > 1 ? leaderboardData[userRank - 2].referrals : (user.referrals || 0) + 5

  return (
    <div className="referral-container">
      <div className="referral-header">
        <h1>Referral Program</h1>
        <p>Earn ₦{referralBonus.toLocaleString()} for every friend you refer!</p>
      </div>

      <div className="referral-content">
        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{user.referrals || 0}</div>
            <div className="stat-label">Total Referrals</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-value">₦{(user.referralEarnings || 0).toLocaleString()}</div>
            <div className="stat-label">Referral Earnings</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">#{userRank}</div>
            <div className="stat-label">Your Rank</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{nextTarget - (user.referrals || 0)}</div>
            <div className="stat-label">To Next Rank</div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <h3>Progress to Next Rank</h3>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(((user.referrals || 0) / nextTarget) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <div className="progress-labels">
              <span>{user.referrals || 0} referrals</span>
              <span>{nextTarget} referrals</span>
            </div>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="referral-link-section">
          <h3>Your Referral Link</h3>
          <div className="link-container">
            <input type="text" value={referralLink} readOnly className="referral-input" />
            <button onClick={copyToClipboard} className={`copy-btn ${copied ? "copied" : ""}`}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="share-buttons">
            <h4>Share on Social Media</h4>
            <div className="social-buttons">
              <button onClick={shareOnWhatsApp} className="share-btn whatsapp">
                <span className="share-icon">📱</span>
                WhatsApp
              </button>
              <button onClick={shareOnTwitter} className="share-btn twitter">
                <span className="share-icon">🐦</span>
                Twitter
              </button>
              <button onClick={shareOnFacebook} className="share-btn facebook">
                <span className="share-icon">📘</span>
                Facebook
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="how-it-works">
          <h3>How Referrals Work</h3>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h4>Share Your Link</h4>
              <p>Send your unique referral link to friends and family</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h4>Friend Signs Up</h4>
              <p>When someone uses your link to create an account</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h4>Earn Rewards</h4>
              <p>Get ₦{referralBonus.toLocaleString()} added to your balance instantly</p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="leaderboard-section">
          <h3>Top Referrers</h3>
          <div className="leaderboard">
            {leaderboardData.map((item, index) => (
              <div key={index} className={`leaderboard-item ${item.name === "You" ? "current-user" : ""}`}>
                <div className="rank-badge">#{item.rank}</div>
                <div className="user-info">
                  <span className="user-name">{item.name}</span>
                  <span className="user-stats">
                    {item.referrals} referrals • ₦{item.earnings.toLocaleString()}
                  </span>
                </div>
                {item.rank <= 3 && (
                  <div className="trophy">{item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : "🥉"}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Information */}
        <div className="bonus-info">
          <h3>Referral Bonuses</h3>
          <div className="bonus-tiers">
            <div className="bonus-tier">
              <div className="tier-icon">🎁</div>
              <div className="tier-info">
                <h4>Welcome Bonus</h4>
                <p>₦{referralBonus.toLocaleString()} for each successful referral</p>
              </div>
            </div>
            <div className="bonus-tier">
              <div className="tier-icon">🔥</div>
              <div className="tier-info">
                <h4>Monthly Bonus</h4>
                <p>Extra ₦2,000 for 10+ referrals in a month</p>
              </div>
            </div>
            <div className="bonus-tier">
              <div className="tier-icon">👑</div>
              <div className="tier-info">
                <h4>VIP Bonus</h4>
                <p>₦10,000 bonus for reaching 50 total referrals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Referral
