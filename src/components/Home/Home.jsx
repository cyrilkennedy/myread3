"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "./Home.css"

const Home = () => {
  const { user } = useAuth()

  const categories = [
    {
      name: "Technology",
      icon: "💻",
      subcategories: ["AI", "Web Dev", "Cybersecurity"],
      color: "#3b82f6",
    },
    {
      name: "Science",
      icon: "🔬",
      subcategories: ["Physics", "Biology", "Chemistry"],
      color: "#10b981",
    },
    {
      name: "Lifestyle",
      icon: "🌟",
      subcategories: ["Health", "Travel", "Food"],
      color: "#f59e0b",
    },
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="brand-text">BOOKBUCKS</span>
            </h1>
            <p className="hero-subtitle">
              Earn money while expanding your knowledge. Read books, articles, and educational content to earn real cash
              rewards.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">₦50</span>
                <span className="stat-label">Per Page Read</span>
              </div>
              <div className="stat">
                <span className="stat-number">45s</span>
                <span className="stat-label">Reading Time</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Books Available</span>
              </div>
            </div>
            <div className="hero-actions">
              {user ? (
                <Link to="/categories" className="btn btn-primary">
                  Start Reading & Earning
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary">
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn btn-secondary">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore Categories</h2>
          <p className="section-subtitle">Choose from our diverse collection of educational content</p>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/categories/${category.name.toLowerCase()}`}
                className="category-card"
                style={{ "--category-color": category.color }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <div className="category-subcategories">
                  {category.subcategories.map((sub, subIndex) => (
                    <span key={subIndex} className="subcategory-tag">
                      {sub}
                    </span>
                  ))}
                </div>
                <div className="category-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose BOOKBUCKS?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Earn While Learning</h3>
              <p className="feature-description">
                Get paid ₦50 for every page you read. Turn your reading time into earning time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Quality Content</h3>
              <p className="feature-description">
                Access thousands of carefully curated books and articles across multiple categories.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Instant Rewards</h3>
              <p className="feature-description">
                Earn rewards instantly after completing each page. No waiting, no delays.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Referral Program</h3>
              <p className="feature-description">
                Invite friends and earn additional income from their reading activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Start Earning?</h2>
              <p className="cta-subtitle">Join thousands of readers who are already earning money while learning</p>
              <Link to="/signup" className="btn btn-primary btn-large">
                Sign Up Now - It's Free!
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
