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

  // Sample book data - in real app, this would come from backend
  const bookData = {
    1: {
      title: "Machine Learning Fundamentals",
      author: "Dr. Sarah Chen",
      totalPages: 15,
      pages: [
        {
          pageNumber: 1,
          content: `Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task. At its core, machine learning involves algorithms that can identify patterns in data and use these patterns to make predictions or decisions about new, unseen data.

The field of machine learning has revolutionized numerous industries, from healthcare and finance to entertainment and transportation. By analyzing vast amounts of data, machine learning systems can detect fraud, recommend products, diagnose diseases, and even drive cars autonomously.

There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning uses labeled data to train models, unsupervised learning finds hidden patterns in unlabeled data, and reinforcement learning learns through interaction with an environment.

Understanding these fundamentals is crucial for anyone looking to work with AI systems or leverage machine learning in their field. The applications are virtually limitless, and the technology continues to evolve rapidly, making it an exciting area of study and career development.`,
        },
        {
          pageNumber: 2,
          content: `Supervised learning is perhaps the most common type of machine learning, where algorithms learn from input-output pairs to make predictions on new data. This approach requires a dataset with known correct answers, called labels, which the algorithm uses to learn the relationship between inputs and outputs.

Common examples of supervised learning include email spam detection, image recognition, and medical diagnosis. In spam detection, the algorithm learns from thousands of emails labeled as "spam" or "not spam" to classify new incoming emails. Similarly, image recognition systems are trained on millions of labeled images to identify objects, people, or scenes in new photographs.

The process typically involves splitting data into training and testing sets. The training set is used to teach the algorithm, while the testing set evaluates how well it performs on unseen data. This evaluation helps determine if the model can generalize beyond its training data.

Key algorithms in supervised learning include linear regression, decision trees, random forests, and neural networks. Each has its strengths and is suited for different types of problems. Linear regression works well for predicting continuous values, while decision trees excel at classification tasks with clear decision boundaries.`,
        },
        // Add more pages as needed
      ],
    },
    // Add more books as needed
  }

  const book = bookData[bookId]

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
  }

  const claimReward = () => {
    if (canEarn && !hasEarned) {
      addEarnings(50, `Reading page ${currentPage} of "${book.title}"`)
      setHasEarned(true)
      setCanEarn(false)
      toast.success("₦50 earned! Great job reading!")
    }
  }

  const nextPage = () => {
    if (currentPage < book.totalPages) {
      setCurrentPage(currentPage + 1)
      setTimeLeft(45)
      setCanEarn(false)
      setHasEarned(false)
      setIsReading(false)
    } else {
      toast.success("Congratulations! You've completed the book!")
      navigate("/categories")
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setTimeLeft(45)
      setCanEarn(false)
      setHasEarned(false)
      setIsReading(false)
    }
  }

  if (!user || !book) {
    return <div className="reading-container">Loading...</div>
  }

  const currentPageData = book.pages[currentPage - 1]

  return (
    <div className="reading-container">
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
            <div className="text-content">{currentPageData?.content}</div>
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
                    Claim ₦50 Reward
                  </button>
                )}

                {hasEarned && (
                  <div className="earned-status">
                    <div className="earned-indicator">✅ ₦50 Earned!</div>
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
    </div>
  )
}

export default ReadingPage
