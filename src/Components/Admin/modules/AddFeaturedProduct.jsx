"use client"

import { useState } from "react"
import "../styles/AddFeaturedProduct.css"

export default function AddFeaturedProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    ratings: "",
    price: "",
    reviewNo: "",
    originalPrice: "",
    productImage: "",
    discount: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [ratingError, setRatingError] = useState("")
  const [featuredProducts, setFeaturedProducts] = useState([])

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "productImage" && files && files[0]) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
      setFormData((prev) => ({ ...prev, [name]: file }))
    } else if (name === "ratings") {
      const ratingValue = parseFloat(value)
      if (ratingValue > 5) {
        setRatingError("Rating cannot be more than 5")
      } else {
        setRatingError("")
      }
      setFormData((prev) => ({ ...prev, [name]: value }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      id: Date.now(),
      productName: formData.productName,
      price: formData.price,
      originalPrice: formData.originalPrice,
      reviewNo: formData.reviewNo,
      image: imagePreview,
    }
    setFeaturedProducts((prev) => [...prev, newProduct])
    setSuccessMessage("Featured product added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
    setFormData({
      productName: "",
      ratings: "",
      price: "",
      reviewNo: "",
      originalPrice: "",
      productImage: "",
      discount: "",
    })
    setImagePreview("")
    setRatingError("")
  }

  return (
    <div className="featured-container">
      <h2 className="featured-title">Add Featured Product</h2>

      {successMessage && <div className="success-alert">{successMessage}</div>}

      <form className="featured-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="section-heading">Featured Product Information</h3>

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
              <label htmlFor="ratings">Ratings *</label>
              <input
                type="number"
                id="ratings"
                name="ratings"
                value={formData.ratings}
                onChange={handleChange}
                placeholder="0.0"
                min="0"
                max="5"
                step="0.1"
                required
              />
              {ratingError && <span className="error-message">{ratingError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviewNo">Review No. *</label>
              <input
                type="number"
                id="reviewNo"
                name="reviewNo"
                value={formData.reviewNo}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="originalPrice">Original Price *</label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="productImage">Product Image *</label>
              <div className="input-preview-container">
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Product Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount (%)</label>
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
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Add Featured Product
          </button>
          <button type="reset" className="btn-secondary">
            Clear Form
          </button>
        </div>
      </form>

      {featuredProducts.length > 0 && (
        <div className="featured-products-table">
          <h3 className="table-title">Featured Products</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Original Price</th>
                <th>Review No.</th>
              </tr>
            </thead>
            <tbody>
              {featuredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.productName} className="table-image" />
                  </td>
                  <td>{product.productName}</td>
                  <td>${product.price}</td>
                  <td>${product.originalPrice}</td>
                  <td>{product.reviewNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
