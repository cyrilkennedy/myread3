"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import "./ReadingPage.css"

const ReadingPage = () => {
  const { bookId } = useParams()
  const { user, addEarnings } = useAuth()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [timeLeft, setTimeLeft] = useState(45)
  const [isReading, setIsReading] = useState(false)
  const [canEarn, setCanEarn] = useState(false)
  const [hasEarned, setHasEarned] = useState(false)
  const [mouseMovements, setMouseMovements] = useState(0)
  const [keystrokes, setKeystrokes] = useState(0)
  const [focusTime, setFocusTime] = useState(0)
  const [lastActivity, setLastActivity] = useState(Date.now())

  const bookData = {
    1: {
      title: "Machine Learning Fundamentals",
      author: "Dr. Sarah Chen",
      totalPages: 15,
      pages: [
        {
          pageNumber: 1,
          content: `Machine learning represents a revolutionary approach to artificial intelligence that enables computers to learn and make intelligent decisions from data without being explicitly programmed for every specific task. This transformative technology has fundamentally changed how we approach problem-solving across numerous industries and applications.

At its core, machine learning involves sophisticated algorithms that can identify complex patterns within vast datasets and use these discovered patterns to make accurate predictions or informed decisions about new, previously unseen data. The process mimics human learning but operates at unprecedented scales and speeds.

The field has revolutionized industries including healthcare, finance, entertainment, transportation, and manufacturing. Machine learning systems can detect fraudulent transactions, recommend personalized products, diagnose medical conditions with remarkable accuracy, enable autonomous vehicle navigation, and optimize manufacturing processes for maximum efficiency.

There are three fundamental types of machine learning approaches: supervised learning, which uses labeled training data; unsupervised learning, which discovers hidden patterns in unlabeled data; and reinforcement learning, which learns through environmental interaction and feedback mechanisms.

Understanding these core concepts is essential for anyone seeking to work with artificial intelligence systems or leverage machine learning capabilities in their professional field. The applications continue expanding rapidly, making this an exciting and lucrative area for career development and technological innovation.`,
        },
        {
          pageNumber: 2,
          content: `Supervised learning stands as the most widely implemented and commercially successful type of machine learning, where sophisticated algorithms learn from carefully curated input-output pairs to make accurate predictions on completely new, unseen data. This approach requires comprehensive datasets with known correct answers, called labels, which serve as the foundation for the algorithm's learning process.

The methodology involves training algorithms on thousands or millions of examples, allowing them to understand complex relationships between inputs and desired outputs. Common real-world applications include email spam detection systems, advanced image recognition platforms, medical diagnostic tools, and financial risk assessment models.

In spam detection, algorithms analyze thousands of emails previously labeled as "spam" or "legitimate" to classify new incoming messages with remarkable accuracy. Similarly, image recognition systems process millions of labeled photographs to identify objects, people, animals, or specific scenes in new images with human-level precision.

The standard process involves strategically splitting available data into distinct training and testing sets. The training set teaches the algorithm patterns and relationships, while the testing set evaluates performance on completely unseen data, ensuring the model can generalize beyond its training examples.

Key algorithms include linear regression for continuous value prediction, decision trees for clear classification boundaries, random forests for robust ensemble learning, and neural networks for complex pattern recognition. Each algorithm offers unique strengths suited for different problem types and data characteristics.`,
        },
      ],
    },
  }

  const book = bookData[bookId]

  useEffect(() => {
    const handleMouseMove = () => {
      setMouseMovements((prev) => prev + 1)
      setLastActivity(Date.now())
    }

    const handleKeyPress = () => {
      setKeystrokes((prev) => prev + 1)
      setLastActivity(Date.now())
    }

    const handleFocus = () => {
      const interval = setInterval(() => {
        setFocusTime((prev) => prev + 1)
      }, 1000)

      const handleBlur = () => {
        clearInterval(interval)
      }

      window.addEventListener("blur", handleBlur)
      return () => {
        clearInterval(interval)
        window.removeEventListener("blur", handleBlur)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("keypress", handleKeyPress)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("keypress", handleKeyPress)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    if (!book) {
      toast.error("Book not found")
      navigate("/categories")
      return
    }
  }, [user, book, navigate])

  useEffect(() => {
    let timer
    if (isReading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanEarn(true)
            setIsReading(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isReading, timeLeft])

  const startReading = () => {
    setIsReading(true)
    setTimeLeft(45)
    setCanEarn(false)
    setHasEarned(false)
    setMouseMovements(0)
    setKeystrokes(0)
    setFocusTime(0)
  }

  const claimReward = () => {
    const timeSinceLastActivity = Date.now() - lastActivity
    const isLikelyBot = mouseMovements < 5 || focusTime < 30 || timeSinceLastActivity > 10000

    if (isLikelyBot) {
      toast.error("Suspicious activity detected. Please interact naturally with the page.")
      return
    }

    if (canEarn && !hasEarned) {
      addEarnings(5, `Reading page ${currentPage} of "${book.title}"`)
      setHasEarned(true)
      setCanEarn(false)
      toast.success("₦5 earned! Great job reading!")
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage < book.totalPages) {
      setCurrentPage(currentPage + 1)
    } else {
      toast.success("Congratulations! You have finished the book.")
      navigate("/categories")
    }
  }

  if (!user || !book) {
    return <div className="reading-container">Loading...</div>
  }

  const currentPageData = book.pages[currentPage - 1]

  return (
    <div className="reading-container">
      <div className="ad-placement header-ad">
        <div className="ad-content">
          <span>Advertisement</span>
          <p>Your Header Ad Here - 728x90</p>
        </div>
      </div>

      <div className="reading-header">
        <button onClick={() => navigate("/categories")} className="back-btn">
          ← Back to Categories
        </button>
        <div className="book-info">
          <h1>{book.title}</h1>
          <p>by {book.author}</p>
        </div>
      </div>

      <div className="reading-content">
        <div className="page-info">
          <span>
            Page {currentPage} of {book.totalPages}
          </span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentPage / book.totalPages) * 100}%` }}></div>
          </div>
        </div>

        <div className="reading-panel">
          <div className="page-content">
            <h2>Page {currentPageData?.pageNumber}</h2>

            <div className="ad-placement middle-ad-1">
              <div className="ad-content">
                <span>Advertisement</span>
                <p>Middle Ad 1 - 300x250</p>
              </div>
            </div>

            <div className="text-content">{currentPageData?.content}</div>

            <div className="ad-placement middle-ad-2">
              <div className="ad-content">
                <span>Advertisement</span>
                <p>Middle Ad 2 - 300x250</p>
              </div>
            </div>
          </div>

          <div className="reading-controls">
            <div className="timer-section">
              <div className="timer-display">
                <div className="timer-circle">
                  <span className="timer-text">{timeLeft}s</span>
                </div>
                <p>Reading Time</p>
              </div>

              <div className="reading-actions">
                {!isReading && !canEarn && !hasEarned && (
                  <button onClick={startReading} className="start-reading-btn">
                    Start Reading Timer
                  </button>
                )}

                {isReading && (
                  <div className="reading-status">
                    <div className="reading-indicator">📖 Reading in progress...</div>
                    <p>Please read the content above carefully</p>
                  </div>
                )}

                {canEarn && !hasEarned && (
                  <button onClick={claimReward} className="claim-reward-btn">
                    Claim ₦5 Reward
                  </button>
                )}

                {hasEarned && (
                  <div className="earned-status">
                    <div className="earned-indicator">✅ ₦5 Earned!</div>
                    <p>Great job! You can now move to the next page.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="navigation-controls">
              <button onClick={previousPage} disabled={currentPage === 1} className="nav-btn prev-btn">
                ← Previous
              </button>
              <button
                onClick={nextPage}
                disabled={!hasEarned}
                className="nav-btn next-btn"
                title={!hasEarned ? "Complete reading to continue" : ""}
              >
                {currentPage === book.totalPages ? "Finish Book" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ad-placement footer-ad">
        <div className="ad-content">
          <span>Advertisement</span>
          <p>Your Footer Ad Here - 728x90</p>
        </div>
      </div>
    </div>
  )
}

export default ReadingPage
