"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "./Home.css"

const Home = () => {
  const { user } = useAuth()

  const categories = [
    {
      id: "technology",
      name: "Technology",
      description: "Explore the latest in tech innovation",
      subcategories: ["AI", "Web Dev", "Cybersecurity"],
      icon: "💻",
      color: "#3498db",
    },
    {
      id: "science",
      name: "Science",
      description: "Discover scientific breakthroughs",
      subcategories: ["Physics", "Biology", "Chemistry"],
      icon: "🔬",
      color: "#e74c3c",
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Improve your daily life",
      subcategories: ["Health", "Travel", "Food"],
      icon: "🌟",
      color: "#f39c12",
    },
  ]

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to BOOKBUCKS</h1>
            <p className="hero-subtitle">{user ? `Welcome back, ${user.name}!` : "Earn rewards by reading books"}</p>
            <p className="hero-description">
              Transform your reading habit into earnings. Read quality content, expand your knowledge, and get rewarded
              for every page you complete. Join thousands of readers who are already earning while learning.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50₦</span>
                <span className="stat-label">Per Page Read</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">45s</span>
                <span className="stat-label">Reading Time</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Books Available</span>
              </div>
            </div>
            <div className="hero-actions">
              {user ? (
                <Link to="/categories" className="cta-button primary">
                  Start Reading
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="cta-button primary">
                    Get Started
                  </Link>
                  <Link to="/login" className="cta-button secondary">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">
              <div className="card-content">
                <h3>Daily Earnings</h3>
                <p className="earnings">₦2,500</p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Explore Categories</h2>
          <p>Choose from our diverse collection of books and articles</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="category-card"
              style={{ "--category-color": category.color }}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <div className="subcategories">
                {category.subcategories.map((sub, index) => (
                  <span key={index} className="subcategory-tag">
                    {sub}
                  </span>
                ))}
              </div>
              <div className="category-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose BOOKBUCKS?</h2>
          <p>The smartest way to earn while you learn</p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">📚</div>
            <h3>Quality Content</h3>
            <p>Curated books and articles from trusted sources across various topics and genres.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <h3>Instant Rewards</h3>
            <p>Earn ₦50 for every page you read. Payments are processed instantly to your account.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Read anywhere, anytime. Our platform works seamlessly on all your devices.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h3>Secure Platform</h3>
            <p>Advanced security measures protect your account and ensure fair reading rewards.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
