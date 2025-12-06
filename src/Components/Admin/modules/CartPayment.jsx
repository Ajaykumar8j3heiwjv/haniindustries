"use client"

import { useState } from "react"
import "../styles/CartPayment.css"

export default function CartPayment() {
  const [settings, setSettings] = useState({
    paymentGateway: "razorpay",
    apiKey: "",
    apiSecret: "",
    taxRate: "18",
    shippingCost: "50",
    enableCOD: true,
    enableCard: true,
    enableUPI: true,
    enableWallet: false,
  })

  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSuccessMessage("Payment settings saved successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="payment-container">
      <h2 className="payment-title">Cart & Payment Settings</h2>

      {successMessage && <div className="success-alert">{successMessage}</div>}

      <form className="payment-form" onSubmit={handleSave}>
        <div className="form-section">
          <h3 className="section-heading">Payment Gateway Configuration</h3>

          <div className="form-group">
            <label htmlFor="paymentGateway">Select Payment Gateway</label>
            <select id="paymentGateway" name="paymentGateway" value={settings.paymentGateway} onChange={handleChange}>
              <option value="razorpay">Razorpay</option>
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="paytm">Paytm</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="apiKey">API Key</label>
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                value={settings.apiKey}
                onChange={handleChange}
                placeholder="Enter your API key"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apiSecret">API Secret</label>
              <input
                type="password"
                id="apiSecret"
                name="apiSecret"
                value={settings.apiSecret}
                onChange={handleChange}
                placeholder="Enter your API secret"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-heading">Pricing & Shipping</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="taxRate">Tax Rate (%)</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="shippingCost">Default Shipping Cost (₹)</label>
              <input
                type="number"
                id="shippingCost"
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-heading">Payment Methods</h3>

          <div className="payment-methods">
            <div className="payment-method">
              <input
                type="checkbox"
                id="enableCOD"
                name="enableCOD"
                checked={settings.enableCOD}
                onChange={handleChange}
              />
              <label htmlFor="enableCOD">
                <span className="method-icon">🚚</span>
                <span className="method-name">Cash on Delivery</span>
              </label>
            </div>

            <div className="payment-method">
              <input
                type="checkbox"
                id="enableCard"
                name="enableCard"
                checked={settings.enableCard}
                onChange={handleChange}
              />
              <label htmlFor="enableCard">
                <span className="method-icon">💳</span>
                <span className="method-name">Credit/Debit Card</span>
              </label>
            </div>

            <div className="payment-method">
              <input
                type="checkbox"
                id="enableUPI"
                name="enableUPI"
                checked={settings.enableUPI}
                onChange={handleChange}
              />
              <label htmlFor="enableUPI">
                <span className="method-icon">📱</span>
                <span className="method-name">UPI Payment</span>
              </label>
            </div>

            <div className="payment-method">
              <input
                type="checkbox"
                id="enableWallet"
                name="enableWallet"
                checked={settings.enableWallet}
                onChange={handleChange}
              />
              <label htmlFor="enableWallet">
                <span className="method-icon">💰</span>
                <span className="method-name">Digital Wallet</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save Settings
          </button>
          <button type="reset" className="btn-secondary">
            Reset
          </button>
        </div>
      </form>

      <div className="info-box">
        <h3>📌 Important Notes</h3>
        <ul>
          <li>Keep your API keys secure and never share them publicly</li>
          <li>Test your payment gateway in sandbox mode before going live</li>
          <li>Tax rate will be automatically calculated on all orders</li>
          <li>Shipping cost can be customized per order if needed</li>
        </ul>
      </div>
    </div>
  )
}
