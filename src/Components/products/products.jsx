"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RelatedProducts from "../RelatedProducts"
import featuredProducts from "../productsData"
import { useCart } from "../Cart/CartContext"
import "./products.css"

function ProductsPage() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)

  // Find the product by id
  const product = featuredProducts.find(p => p.id === id)
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")

  // Get price for selected size
  const selectedSizePrice = product?.sizePrices?.[selectedSize]
  const currentPrice = selectedSizePrice?.price || product.price
  const originalPrice = selectedSizePrice?.originalPrice || product.originalPrice
  const discount = selectedSizePrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : product.discount

  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
    navigate('/cart')
  }

  // Get related products from the same category, excluding the current product
  const relatedProducts = featuredProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3) // Limit to 3 related products

  return (
    <div className="products-page">
      <div className="breadcrumb">
        <span>Home</span>
        <span> / </span>
        <span>Products</span>
        <span> / </span>
        <span className="current">{product.name}</span>
      </div>

      <div className="product-detail-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[0] || "/placeholder.svg"} alt={product.name} />
            {discount > 0 && <span className="discount-badge">-{discount}%</span>}
          </div>
          <div className="thumbnail-gallery">
            {product.images.map((img, idx) => (
              <img key={idx} src={img || "/placeholder.svg"} alt={`${product.name} ${idx + 1}`} />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>

          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-value">{product.rating}</span>
            <span className="reviews">({product.reviews} reviews)</span>
          </div>

          <div className="product-price-section">
            <div className="prices">
              <span className="current-price">Rs. {currentPrice}</span>
              <span className="original-price">Rs. {originalPrice}</span>
              <span className="discount-percent">Save {discount}%</span>
            </div>
          </div>

          <p className="description">{product.description}</p>
          <p className="long-description">{product.longDescription}</p>

          <div className="product-options">
            <div className="size-selector">
              <label>Select Size:</label>
              <div className="sizes">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div className="product-features">
            <h3>Key Features:</h3>
            <ul>
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

export default ProductsPage
