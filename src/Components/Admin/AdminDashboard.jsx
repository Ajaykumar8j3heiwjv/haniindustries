"use client"

import { useState } from "react"
import "./AdminDashboard.css"
import AddProduct from "./modules/AddProduct"
import AddFeaturedProduct from "./modules/AddFeaturedProduct"
import CartPayment from "./modules/CartPayment"
import Dashboard from "./modules/Dashboard"
import PlacedOrders from "./modules/PlacedOrders"

export default function AdminDashboard({ onLogout }) {
  const [activeModule, setActiveModule] = useState("dashboard")

  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />
      case "addProduct":
        return <AddProduct />
      case "addFeatured":
        return <AddFeaturedProduct />
      case "payment":
        return <CartPayment />
      case "placedOrders":
        return <PlacedOrders />
      default:
        return <Dashboard />
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <h1 className="admin-title">Hani Industries</h1>
          <p className="admin-subtitle">Admin Dashboard</p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-wrapper">
        {/* Main Content */}
        <main className="admin-content">{renderContent()}</main>

        {/* Right Side Menu */}
        <aside className="admin-menu">
          <nav className="menu-nav">
            <h2 className="menu-title">Modules</h2>

            <ul className="menu-list">
              <li>
                <button
                  className={`menu-item ${activeModule === "dashboard" ? "active" : ""}`}
                  onClick={() => setActiveModule("dashboard")}
                >
                  <span className="menu-icon">📊</span>
                  <span className="menu-text">Dashboard</span>
                </button>
              </li>

              <li>
                <button
                  className={`menu-item ${activeModule === "addProduct" ? "active" : ""}`}
                  onClick={() => setActiveModule("addProduct")}
                >
                  <span className="menu-icon">➕</span>
                  <span className="menu-text">Add Product</span>
                </button>
              </li>

              <li>
                <button
                  className={`menu-item ${activeModule === "addFeatured" ? "active" : ""}`}
                  onClick={() => setActiveModule("addFeatured")}
                >
                  <span className="menu-icon">⭐</span>
                  <span className="menu-text">Featured Product</span>
                </button>
              </li>

              <li>
                <button
                  className={`menu-item ${activeModule === "payment" ? "active" : ""}`}
                  onClick={() => setActiveModule("payment")}
                >
                  <span className="menu-icon">💳</span>
                  <span className="menu-text">Cart & Payment</span>
                </button>
              </li>

              <li>
                <button
                  className={`menu-item ${activeModule === "placedOrders" ? "active" : ""}`}
                  onClick={() => setActiveModule("placedOrders")}
                >
                  <span className="menu-icon">📦</span>
                  <span className="menu-text">Placed Orders</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="menu-footer">
            <p className="footer-text">© 2025 Hani Industries</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
