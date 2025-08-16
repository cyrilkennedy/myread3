import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>BOOKBUCKS</h3>
            <p>Earn rewards by reading books</p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/support">Support</a>
                </li>
                <li>
                  <a href="/categories">Categories</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 BOOKBUCKS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
