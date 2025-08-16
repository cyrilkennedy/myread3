"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import "./Support.css"

const Support = () => {
  const [activeAccordion, setActiveAccordion] = useState(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const faqData = [
    {
      id: 1,
      question: "How do I earn money on BOOKBUCKS?",
      answer:
        "You earn ₦50 for every page you read. Simply choose a book from our categories, start the reading timer (45 seconds per page), and claim your reward after completing each page. The money is instantly added to your account balance.",
    },
    {
      id: 2,
      question: "What is the minimum withdrawal amount?",
      answer:
        "The minimum withdrawal amount is ₦1,000. This helps us process payments efficiently and reduces transaction costs. You can withdraw your earnings to any Nigerian bank account.",
    },
    {
      id: 3,
      question: "How long does it take to process withdrawals?",
      answer:
        "Withdrawals are typically processed within 1-3 business days. You'll receive an email confirmation once your withdrawal has been processed and the funds have been sent to your bank account.",
    },
    {
      id: 4,
      question: "Can I refer friends and earn bonuses?",
      answer:
        "Yes! You earn ₦500 for every friend who signs up using your referral link. There are also bonus rewards for reaching referral milestones - ₦2,000 extra for 10+ monthly referrals and ₦10,000 for reaching 50 total referrals.",
    },
    {
      id: 5,
      question: "Why is there a 45-second reading timer?",
      answer:
        "The 45-second timer ensures quality reading time and prevents abuse of the system. This gives you enough time to properly read and understand the content while maintaining fairness for all users.",
    },
    {
      id: 6,
      question: "What types of books are available?",
      answer:
        "We offer books across three main categories: Technology (AI, Web Development, Cybersecurity), Science (Physics, Biology, Chemistry), and Lifestyle (Health, Travel, Food). All content is carefully curated for educational value.",
    },
    {
      id: 7,
      question: "Is my account secure?",
      answer:
        "Yes, we use advanced security measures including device tracking to prevent fraud and protect your account. Your personal information and earnings are encrypted and stored securely.",
    },
    {
      id: 8,
      question: "Can I use BOOKBUCKS on mobile devices?",
      answer:
        "BOOKBUCKS is fully optimized for mobile devices. You can read books and earn money on your smartphone, tablet, or computer with the same great experience.",
    },
    {
      id: 9,
      question: "What happens if I don't complete a book?",
      answer:
        "You can stop reading at any time and still keep the earnings from pages you've completed. There's no penalty for not finishing a book - you can always return to continue reading later.",
    },
    {
      id: 10,
      question: "How do I change my account settings?",
      answer:
        "Go to your Profile page where you can edit your name, add a username, change your password, and switch between light and dark themes. You can also view your transaction history and account balance there.",
    },
  ]

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast.error("Please fill in all fields")
      return
    }

    // Simulate form submission
    toast.success("Your message has been sent! We'll get back to you within 24 hours.")

    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="support-container">
      <div className="support-header">
        <h1>Support & FAQ</h1>
        <p>Find answers to common questions or get in touch with our support team</p>
      </div>

      <div className="support-content">
        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-accordion">
            {faqData.map((faq) => (
              <div key={faq.id} className={`accordion-item ${activeAccordion === faq.id ? "active" : ""}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(faq.id)}>
                  <span>{faq.question}</span>
                  <span className="accordion-icon">{activeAccordion === faq.id ? "−" : "+"}</span>
                </button>
                <div className="accordion-content">
                  <div className="accordion-body">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="contact-section">
          <h2>Contact Support</h2>
          <p>Can't find what you're looking for? Send us a message and we'll help you out!</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" value={contactForm.subject} onChange={handleInputChange} required>
                <option value="">Select a topic</option>
                <option value="account">Account Issues</option>
                <option value="payment">Payment & Withdrawals</option>
                <option value="technical">Technical Problems</option>
                <option value="referral">Referral Program</option>
                <option value="books">Book Content</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                placeholder="Describe your issue or question in detail..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* Quick Help Section */}
        <div className="quick-help-section">
          <h2>Quick Help</h2>
          <div className="help-cards">
            <div className="help-card">
              <div className="help-icon">📚</div>
              <h3>Getting Started</h3>
              <p>New to BOOKBUCKS? Learn how to start earning money by reading books.</p>
              <a href="/categories" className="help-link">
                Browse Books
              </a>
            </div>
            <div className="help-card">
              <div className="help-icon">💰</div>
              <h3>Withdrawals</h3>
              <p>Learn how to withdraw your earnings to your bank account safely.</p>
              <a href="/profile" className="help-link">
                View Balance
              </a>
            </div>
            <div className="help-card">
              <div className="help-icon">👥</div>
              <h3>Referrals</h3>
              <p>Earn extra money by referring friends to BOOKBUCKS.</p>
              <a href="/referral" className="help-link">
                Get Referral Link
              </a>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h4>Email Support</h4>
                <p>support@bookbucks.com</p>
                <span>Response within 24 hours</span>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-icon">💬</div>
              <div className="contact-details">
                <h4>WhatsApp</h4>
                <p>+234 800 BOOKBUCKS</p>
                <span>Monday - Friday, 9AM - 6PM</span>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-icon">🐦</div>
              <div className="contact-details">
                <h4>Twitter</h4>
                <p>@BookbucksNG</p>
                <span>Follow for updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
