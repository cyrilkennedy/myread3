"use client"

import { useState } from "react"
import { useParams, useNavigate } from "next/navigation"
import Link from "next/link"
import useAuth from "@/hooks/useAuth" // Assuming useAuth is a custom hook

const Categories = () => {
  const { category, subcategory } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 100

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#4caf50"
      case "Intermediate":
        return "#ff9800"
      case "Advanced":
        return "#f44336"
      default:
        return "#757575"
    }
  }

  const handleBookClick = (bookId) => {
    if (!user) {
      navigate("/login")
      return
    }
    navigate(`/read/${bookId}`)
  }

  const categoriesData = {
    programming: {
      name: "Programming",
      description: "Learn programming languages and concepts.",
      subcategories: {
        javascript: {
          name: "JavaScript",
          books: [
            { id: 1, title: "Book 1", author: "Author 1", pages: 100, difficulty: "Beginner" },
            { id: 2, title: "Book 2", author: "Author 2", pages: 150, difficulty: "Intermediate" },
            { id: 3, title: "Book 3", author: "Author 3", pages: 200, difficulty: "Advanced" },
          ],
        },
        python: {
          name: "Python",
          books: [
            { id: 4, title: "Book 4", author: "Author 4", pages: 120, difficulty: "Beginner" },
            { id: 5, title: "Book 5", author: "Author 5", pages: 180, difficulty: "Intermediate" },
          ],
        },
      },
    },
    // Add more categories as needed
  }

  const currentCategory = categoriesData[category]

  if (!currentCategory) {
    return <div className="error-message">Category not found</div>
  }

  // Subcategory view with books
  if (subcategory) {
    const currentSubcategory = currentCategory.subcategories[subcategory]
    if (!currentSubcategory) {
      return <div className="error-message">Subcategory not found</div>
    }

    const totalBooks = currentSubcategory.books.length
    const totalPages = Math.ceil(totalBooks / booksPerPage)
    const startIndex = (currentPage - 1) * booksPerPage
    const endIndex = startIndex + booksPerPage
    const currentBooks = currentSubcategory.books.slice(startIndex, endIndex)

    return (
      <div className="categories-container">
        <div className="breadcrumb">
          <Link to="/categories">Categories</Link>
          <span> / </span>
          <Link to={`/categories/${category}`}>{currentCategory.name}</Link>
          <span> / </span>
          <span>{currentSubcategory.name}</span>
        </div>

        <div className="subcategory-header">
          <h1>{currentSubcategory.name}</h1>
          <p>Select a book to start reading and earning rewards</p>
          <div className="pagination-info">
            Showing {startIndex + 1}-{Math.min(endIndex, totalBooks)} of {totalBooks} books
          </div>
        </div>

        <div className="books-grid">
          {currentBooks.map((book) => (
            <div key={book.id} className="book-card" onClick={() => handleBookClick(book.id)}>
              <div className="book-cover">
                <div className="book-icon">📖</div>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <div className="book-meta">
                  <span className="book-pages">{book.pages} pages</span>
                  <span className="book-difficulty" style={{ color: getDifficultyColor(book.difficulty) }}>
                    {book.difficulty}
                  </span>
                </div>
                <div className="book-earnings">
                  <span>Earn: ₦{book.pages * 5}</span>
                </div>
                <button className="read-button">{user ? "Start Reading" : "Login to Read"}</button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Previous
            </button>
            <span className="pagination-current">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="categories-container">
      <div className="breadcrumb">
        <Link to="/categories">Categories</Link>
        <span> / </span>
        <span>{currentCategory.name}</span>
      </div>

      <div className="category-header">
        <h1>{currentCategory.name}</h1>
        <p>{currentCategory.description}</p>
      </div>

      <div className="subcategories-grid">
        {Object.entries(currentCategory.subcategories).map(([key, subcategory]) => (
          <Link key={key} to={`/categories/${category}/${key}`} className="subcategory-card">
            <div className="subcategory-info">
              <h3>{subcategory.name}</h3>
              <p>{subcategory.books.length} books available</p>
              <div className="book-count">
                Total earnings: ₦{subcategory.books.reduce((total, book) => total + book.pages * 5, 0)}
              </div>
            </div>
            <div className="subcategory-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
