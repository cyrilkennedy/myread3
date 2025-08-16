"use client"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "./Categories.css"

const Categories = () => {
  const { category, subcategory } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const categoriesData = {
    technology: {
      name: "Technology",
      description: "Explore the latest in tech innovation and digital transformation",
      subcategories: {
        ai: {
          name: "Artificial Intelligence",
          books: [
            {
              id: 1,
              title: "Machine Learning Fundamentals",
              author: "Dr. Sarah Chen",
              pages: 15,
              difficulty: "Beginner",
            },
            {
              id: 2,
              title: "Deep Learning Applications",
              author: "Prof. Michael Roberts",
              pages: 22,
              difficulty: "Advanced",
            },
            {
              id: 3,
              title: "AI Ethics and Society",
              author: "Dr. Amanda Johnson",
              pages: 18,
              difficulty: "Intermediate",
            },
          ],
        },
        "web-dev": {
          name: "Web Development",
          books: [
            {
              id: 4,
              title: "Modern JavaScript Techniques",
              author: "Alex Thompson",
              pages: 20,
              difficulty: "Intermediate",
            },
            { id: 5, title: "React Best Practices", author: "Emma Wilson", pages: 16, difficulty: "Intermediate" },
            {
              id: 6,
              title: "Full-Stack Development Guide",
              author: "David Martinez",
              pages: 25,
              difficulty: "Advanced",
            },
          ],
        },
        cybersecurity: {
          name: "Cybersecurity",
          books: [
            { id: 7, title: "Network Security Basics", author: "Dr. James Parker", pages: 19, difficulty: "Beginner" },
            { id: 8, title: "Ethical Hacking Techniques", author: "Lisa Anderson", pages: 23, difficulty: "Advanced" },
            { id: 9, title: "Data Protection Strategies", author: "Robert Kim", pages: 17, difficulty: "Intermediate" },
          ],
        },
      },
    },
    science: {
      name: "Science",
      description: "Discover scientific breakthroughs and natural phenomena",
      subcategories: {
        physics: {
          name: "Physics",
          books: [
            {
              id: 10,
              title: "Quantum Mechanics Simplified",
              author: "Dr. Maria Gonzalez",
              pages: 21,
              difficulty: "Intermediate",
            },
            {
              id: 11,
              title: "Relativity Theory Explained",
              author: "Prof. John Smith",
              pages: 24,
              difficulty: "Advanced",
            },
            {
              id: 12,
              title: "Classical Physics Foundations",
              author: "Dr. Rachel Brown",
              pages: 16,
              difficulty: "Beginner",
            },
          ],
        },
        biology: {
          name: "Biology",
          books: [
            {
              id: 13,
              title: "Cellular Biology Essentials",
              author: "Dr. Kevin Lee",
              pages: 18,
              difficulty: "Intermediate",
            },
            { id: 14, title: "Genetics and Evolution", author: "Prof. Susan Davis", pages: 22, difficulty: "Advanced" },
            { id: 15, title: "Human Anatomy Basics", author: "Dr. Mark Johnson", pages: 20, difficulty: "Beginner" },
          ],
        },
        chemistry: {
          name: "Chemistry",
          books: [
            {
              id: 16,
              title: "Organic Chemistry Principles",
              author: "Dr. Anna White",
              pages: 19,
              difficulty: "Intermediate",
            },
            {
              id: 17,
              title: "Advanced Chemical Reactions",
              author: "Prof. Tom Wilson",
              pages: 25,
              difficulty: "Advanced",
            },
            { id: 18, title: "Basic Chemistry Concepts", author: "Dr. Lisa Garcia", pages: 15, difficulty: "Beginner" },
          ],
        },
      },
    },
    lifestyle: {
      name: "Lifestyle",
      description: "Improve your daily life with practical tips and insights",
      subcategories: {
        health: {
          name: "Health & Wellness",
          books: [
            {
              id: 19,
              title: "Nutrition for Optimal Health",
              author: "Dr. Jennifer Adams",
              pages: 17,
              difficulty: "Beginner",
            },
            {
              id: 20,
              title: "Mental Health Strategies",
              author: "Dr. Michael Brown",
              pages: 21,
              difficulty: "Intermediate",
            },
            {
              id: 21,
              title: "Fitness and Exercise Science",
              author: "Coach Sarah Miller",
              pages: 19,
              difficulty: "Intermediate",
            },
          ],
        },
        travel: {
          name: "Travel & Adventure",
          books: [
            { id: 22, title: "Budget Travel Secrets", author: "Jake Thompson", pages: 16, difficulty: "Beginner" },
            {
              id: 23,
              title: "Cultural Travel Experiences",
              author: "Maria Rodriguez",
              pages: 20,
              difficulty: "Intermediate",
            },
            {
              id: 24,
              title: "Adventure Travel Safety",
              author: "Captain Rick Jones",
              pages: 18,
              difficulty: "Intermediate",
            },
          ],
        },
        food: {
          name: "Food & Cooking",
          books: [
            { id: 25, title: "Healthy Cooking Basics", author: "Chef Emma Taylor", pages: 15, difficulty: "Beginner" },
            {
              id: 26,
              title: "International Cuisine Guide",
              author: "Chef Antonio Rossi",
              pages: 22,
              difficulty: "Intermediate",
            },
            {
              id: 27,
              title: "Advanced Culinary Techniques",
              author: "Chef Michelle Laurent",
              pages: 24,
              difficulty: "Advanced",
            },
          ],
        },
      },
    },
  }

  const allCategories = [
    { id: "technology", name: "Technology", icon: "💻", color: "#3498db" },
    { id: "science", name: "Science", icon: "🔬", color: "#e74c3c" },
    { id: "lifestyle", name: "Lifestyle", icon: "🌟", color: "#f39c12" },
  ]

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

  // Main categories view
  if (!category) {
    return (
      <div className="categories-container">
        <div className="categories-header">
          <h1>Browse Categories</h1>
          <p>Choose a category to explore books and start earning rewards</p>
        </div>

        <div className="categories-main-grid">
          {allCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="main-category-card"
              style={{ "--category-color": cat.color }}
            >
              <div className="category-icon-large">{cat.icon}</div>
              <h2>{cat.name}</h2>
              <p>{categoriesData[cat.id]?.description}</p>
              <div className="subcategories-preview">
                {Object.keys(categoriesData[cat.id]?.subcategories || {}).map((subKey, index) => (
                  <span key={index} className="subcategory-preview-tag">
                    {categoriesData[cat.id].subcategories[subKey].name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
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
        </div>

        <div className="books-grid">
          {currentSubcategory.books.map((book) => (
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
                  <span>Earn: ₦{book.pages * 50}</span>
                </div>
                <button className="read-button">{user ? "Start Reading" : "Login to Read"}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Category view with subcategories
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
                Total earnings: ₦{subcategory.books.reduce((total, book) => total + book.pages * 50, 0)}
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
