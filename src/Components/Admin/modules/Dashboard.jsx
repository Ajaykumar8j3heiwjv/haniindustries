import "../styles/Dashboard.css"

export default function Dashboard() {
  const stats = [
    { label: "Total Products", value: "156", icon: "📦", color: "#001f3f" },
    { label: "Featured Products", value: "24", icon: "⭐", color: "#0074D9" },
    { label: "Total Orders", value: "2,847", icon: "🛒", color: "#FF4136" },
    { label: "Revenue", value: "₹5.2L", icon: "💰", color: "#2ECC40" },
  ]

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Overview</h2>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color + "15" }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
            <div className="stat-border" style={{ borderTopColor: stat.color }}></div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="recent-orders">
          <h3 className="section-title">Recent Orders</h3>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD001</td>
                <td>Rajesh Kumar</td>
                <td>₹8,500</td>
                <td>
                  <span className="status-badge completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>#ORD002</td>
                <td>Priya Singh</td>
                <td>₹12,000</td>
                <td>
                  <span className="status-badge pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>#ORD003</td>
                <td>Amit Patel</td>
                <td>₹6,250</td>
                <td>
                  <span className="status-badge completed">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="quick-stats">
          <h3 className="section-title">Quick Stats</h3>
          <div className="stat-item">
            <span>Conversion Rate</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "68%" }}></div>
            </div>
            <span className="percentage">68%</span>
          </div>
          <div className="stat-item">
            <span>Customer Satisfaction</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "92%" }}></div>
            </div>
            <span className="percentage">92%</span>
          </div>
          <div className="stat-item">
            <span>Stock Availability</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "85%" }}></div>
            </div>
            <span className="percentage">85%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
