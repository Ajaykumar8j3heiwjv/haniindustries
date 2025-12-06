import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}

export default PrivateRoute
