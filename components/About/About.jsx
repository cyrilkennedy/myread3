import "./About.css"

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About BOOKBUCKS</h1>
        <p>Transforming reading into rewards, one page at a time</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At BOOKBUCKS, we believe that learning should be rewarded. Our platform combines the joy of reading with
            financial incentives, creating a unique ecosystem where knowledge truly pays. We're committed to making
            quality education accessible while providing readers with tangible rewards for their time and effort.
          </p>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <div className="how-it-works-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose Your Book</h3>
              <p>Browse our extensive library of curated books across Technology, Science, and Lifestyle categories.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Read & Learn</h3>
              <p>Spend 45 seconds reading each page. Our system ensures quality reading time for fair rewards.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Earn Rewards</h3>
              <p>Receive ₦50 for every page completed. Watch your balance grow as you expand your knowledge.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Withdraw Earnings</h3>
              <p>Cash out your earnings securely through our integrated payment system whenever you're ready.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Choose BOOKBUCKS?</h2>
          <div className="features-list">
            <div className="feature-item">
              <h4>Quality Content</h4>
              <p>All books are carefully selected and reviewed by our editorial team to ensure educational value.</p>
            </div>
            <div className="feature-item">
              <h4>Fair Rewards</h4>
              <p>Our transparent reward system ensures you're compensated fairly for your reading time.</p>
            </div>
            <div className="feature-item">
              <h4>Secure Platform</h4>
              <p>Advanced security measures protect your account and prevent fraudulent activities.</p>
            </div>
            <div className="feature-item">
              <h4>Mobile Optimized</h4>
              <p>Read anywhere, anytime with our fully responsive platform that works on all devices.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h4>Education First</h4>
              <p>We prioritize quality educational content that adds real value to our readers' lives.</p>
            </div>
            <div className="value-card">
              <h4>Transparency</h4>
              <p>Clear reward structures and honest communication in all our interactions.</p>
            </div>
            <div className="value-card">
              <h4>Innovation</h4>
              <p>Continuously improving our platform to enhance the reading and earning experience.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
