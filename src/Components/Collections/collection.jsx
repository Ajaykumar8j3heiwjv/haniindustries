"use client"

import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../ProductCard"
import "../ProductGrid.css"
import "./collection.css"
import productsData from "../productsData"

function CollectionsPage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")

  const [filters, setFilters] = useState({
    availability: "all",
    priceRange: "all",
  })
  const [sortBy, setSortBy] = useState("featured")

  const allProducts = productsData

  const getFilteredProducts = () => {
    let filtered = [...allProducts]

    // Filter by category from URL
    if (category && category !== "others") {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (filters.availability !== "all") {
      filtered = filtered.filter((p) => p.availability === filters.availability)
    }

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filtered = filtered.filter((p) => p.price >= min && (max ? p.price <= max : true))
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }

  const filteredProducts = getFilteredProducts()

  const getPageTitle = () => {
    switch (category) {
      case "oil":
        return "EDIBLE OIL"
      case "cleaners":
        return "CLEANERS"
      case "appalam":
        return "APPALAM"
      default:
        return "ALL PRODUCTS"
    }
  }

  return (
    <div className="collections-page">
      <div className="breadcrumb">
        <span>Home</span>
        <span> / </span>
        <span>Collections</span>
        <span> / </span>
        <span className="current">{getPageTitle()}</span>
      </div>

      <div className="collections-container">
        <h1 className="page-title">{getPageTitle()}</h1>

        <div className="collections-content">
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>Filter:</h3>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span>Availability</span>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                  className="filter-select"
                >
                  <option value="all">All</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                </select>
              </label>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span>Price</span>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="filter-select"
                >
                  <option value="all">All Prices</option>
                  <option value="0-200">Rs. 0 - Rs. 200</option>
                  <option value="200-500">Rs. 200 - Rs. 500</option>
                  <option value="500-1000">Rs. 500 - Rs. 1000</option>
                  <option value="1000-">Rs. 1000+</option>
                </select>
              </label>
            </div>
          </aside>

          <main className="products-section">
            <div className="products-header">
              <p className="product-count">{filteredProducts.length} products</p>
              <div className="sort-container">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>No products found matching your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default CollectionsPage
