import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { AuthProvider } from "./contexts/AuthContext"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import Categories from "./components/Categories/Categories"
import Profile from "./components/Profile/Profile"
import Referral from "./components/Referral/Referral"
import Support from "./components/Support/Support"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import About from "./components/About/About"
import ReadingPage from "./components/Reading/ReadingPage"
import Withdrawal from "./components/Withdrawal/Withdrawal"

import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:category" element={<Categories />} />
              <Route path="/categories/:category/:subcategory" element={<Categories />} />
              <Route path="/read/:bookId" element={<ReadingPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/withdrawal" element={<Withdrawal />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
