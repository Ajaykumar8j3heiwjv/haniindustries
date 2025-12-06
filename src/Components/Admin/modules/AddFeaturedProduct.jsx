"use client"

import { useState } from "react"
import "../styles/AddFeaturedProduct.css"

export default function AddFeaturedProduct() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [successMessage, setSuccessMessage] = useState("")

  const products = [
    { id: 1, name: "Industrial Lubricant", price: "₹450" },
    { id: 2, name: "Cleaning Solutions", price: "₹320" },
    { id: 3, name: "Safety Equipment", price: "₹1,200" },
    { id: 4, name: "Hardware Fasteners", price: "₹150" },
    { id: 5, name: "Packaging Materials", price: "₹280" },
    { id: 6, name: "Electronic Components", price: "₹850" },
  ]

  const featuredProducts = [
    { id: 1, name: "Industrial Lubricant", position: 1 },
    { id: 3, name: "Safety Equipment", position: 2 },
  ]

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const handleAddFeatured = () => {
    if (selectedProducts.length > 0) {
      setSuccessMessage(`${selectedProducts.length} product(s) marked as featured!`)
      setTimeout(() => setSuccessMessage(""), 3000)
      setSelectedProducts([])
    }
  }

  return (
    <div className="featured-container">
      <h2 className="featured-title">Manage Featured Products</h2>

      {successMessage && <div className="success-alert">{successMessage}</div>}

      <div className="featured-grid">
        <div className="featured-section">
          <h3 className="section-heading">Currently Featured</h3>
          <div className="featured-list">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="featured-item">
                <div className="featured-index">#{product.position}</div>
                <div className="featured-info">
                  <p className="featured-name">{product.name}</p>
                  <p className="featured-status">Featured</p>
                </div>
                <button className="btn-remove">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="featured-section">
          <h3 className="section-heading">Select Products to Feature</h3>
          <div className="products-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <input
                  type="checkbox"
                  id={`product-${product.id}`}
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleSelectProduct(product.id)}
                />
                <label htmlFor={`product-${product.id}`} className="product-label">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="featured-actions">
            <button className="btn-add-featured" onClick={handleAddFeatured} disabled={selectedProducts.length === 0}>
              Mark as Featured ({selectedProducts.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
