"use client"

import { useState } from "react"
import "../styles/AddProduct.css"

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    image: null,
  })

  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccessMessage("Product added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
    setFormData({
      productName: "",
      category: "",
      price: "",
      discount: "",
      stock: "",
      description: "",
      image: null,
    })
  }

  return (
    <div className="add-product-container">
      <h2 className="form-title">Add New Product</h2>

      {successMessage && <div className="success-alert">{successMessage}</div>}

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="section-heading">Product Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productName">Product Name *</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="chemicals">Chemicals</option>
                <option value="hardware">Hardware</option>
                <option value="electronics">Electronics</option>
                <option value="packaging">Packaging</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount (%) *</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock Quantity *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-heading">Product Details</h3>

          <div className="form-group full-width">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed product description..."
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label htmlFor="image">Product Image *</label>
            <div className="file-input-wrapper">
              <input type="file" id="image" name="image" onChange={handleFileChange} accept="image/*" required />
              <span className="file-label">{formData.image ? formData.image.name : "Choose image file..."}</span>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Add Product
          </button>
          <button type="reset" className="btn-secondary">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  )
}
