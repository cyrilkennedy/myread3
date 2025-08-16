"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import "./Withdrawal.css"

const Withdrawal = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    accountNumber: "",
    bankName: "",
    accountName: "",
  })
  const [loading, setLoading] = useState(false)

  const banks = [
    "Access Bank",
    "Zenith Bank",
    "GTBank",
    "First Bank",
    "UBA",
    "Fidelity Bank",
    "Union Bank",
    "Sterling Bank",
    "Stanbic IBTC",
    "Wema Bank",
    "FCMB",
    "Ecobank",
    "Keystone Bank",
    "Polaris Bank",
    "Heritage Bank",
  ]

  const minWithdrawal = 1000
  const maxWithdrawal = user?.balance || 0

  if (!user) {
    navigate("/login")
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setWithdrawalData({
      ...withdrawalData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const amount = Number.parseFloat(withdrawalData.amount)

    if (!amount || amount < minWithdrawal) {
      toast.error(`Minimum withdrawal amount is ₦${minWithdrawal.toLocaleString()}`)
      return false
    }

    if (amount > maxWithdrawal) {
      toast.error("Insufficient balance")
      return false
    }

    if (!withdrawalData.accountNumber || withdrawalData.accountNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit account number")
      return false
    }

    if (!withdrawalData.bankName) {
      toast.error("Please select a bank")
      return false
    }

    if (!withdrawalData.accountName.trim()) {
      toast.error("Please enter account name")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const amount = Number.parseFloat(withdrawalData.amount)

      // In real app, this would integrate with Paystack
      // For now, we'll simulate a successful withdrawal
      const transaction = {
        id: Date.now().toString(),
        type: "withdrawal",
        amount: -amount,
        description: `Withdrawal to ${withdrawalData.bankName} - ${withdrawalData.accountNumber}`,
        date: new Date().toISOString(),
        status: "pending",
      }

      // Update user balance and add transaction
      updateUser({
        balance: user.balance - amount,
        transactions: [transaction, ...(user.transactions || [])],
      })

      toast.success("Withdrawal request submitted successfully! Processing may take 1-3 business days.")

      // Reset form
      setWithdrawalData({
        amount: "",
        accountNumber: "",
        bankName: "",
        accountName: "",
      })

      // Navigate back to profile after a delay
      setTimeout(() => {
        navigate("/profile")
      }, 2000)
    } catch (error) {
      toast.error("Withdrawal failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="withdrawal-container">
      <div className="withdrawal-header">
        <button onClick={() => navigate("/profile")} className="back-btn">
          ← Back to Profile
        </button>
        <h1>Withdraw Funds</h1>
        <p>Transfer your earnings to your bank account</p>
      </div>

      <div className="withdrawal-content">
        <div className="balance-info">
          <h3>Available Balance</h3>
          <div className="balance-amount">₦{user.balance?.toLocaleString() || "0"}</div>
          <p>Minimum withdrawal: ₦{minWithdrawal.toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit} className="withdrawal-form">
          <div className="form-group">
            <label htmlFor="amount">Withdrawal Amount</label>
            <div className="input-wrapper">
              <span className="currency-symbol">₦</span>
              <input
                type="number"
                id="amount"
                name="amount"
                value={withdrawalData.amount}
                onChange={handleInputChange}
                placeholder="0"
                min={minWithdrawal}
                max={maxWithdrawal}
                required
              />
            </div>
            <small className="input-help">
              Enter amount between ₦{minWithdrawal.toLocaleString()} and ₦{maxWithdrawal.toLocaleString()}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <select id="bankName" name="bankName" value={withdrawalData.bankName} onChange={handleInputChange} required>
              <option value="">Select your bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={withdrawalData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter 10-digit account number"
              maxLength="10"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountName">Account Name</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={withdrawalData.accountName}
              onChange={handleInputChange}
              placeholder="Enter account holder name"
              required
            />
          </div>

          <div className="withdrawal-summary">
            <h4>Withdrawal Summary</h4>
            <div className="summary-row">
              <span>Amount:</span>
              <span>₦{withdrawalData.amount ? Number.parseFloat(withdrawalData.amount).toLocaleString() : "0"}</span>
            </div>
            <div className="summary-row">
              <span>Processing Fee:</span>
              <span>₦0</span>
            </div>
            <div className="summary-row total">
              <span>You will receive:</span>
              <span>₦{withdrawalData.amount ? Number.parseFloat(withdrawalData.amount).toLocaleString() : "0"}</span>
            </div>
          </div>

          <button type="submit" className="withdrawal-btn" disabled={loading}>
            {loading ? (
              <div className="loading-content">
                <div className="loading-spinner"></div>
                Processing...
              </div>
            ) : (
              "Submit Withdrawal Request"
            )}
          </button>
        </form>

        <div className="withdrawal-info">
          <h4>Important Information</h4>
          <ul>
            <li>Withdrawals are processed within 1-3 business days</li>
            <li>Ensure your account details are correct to avoid delays</li>
            <li>You will receive an email confirmation once processed</li>
            <li>Contact support if you don't receive funds within 5 business days</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Withdrawal
