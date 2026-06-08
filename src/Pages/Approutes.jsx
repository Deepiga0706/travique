// =============================================
// frontend/src/Routers/AppRoutes.jsx
// Adds /admin protected route
// =============================================

import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../Pages/AdminDashboard";
import Login from "../Pages/Login";
// ... import your existing pages

// ── Admin Route Guard ──────────────────────
function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user?.email) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

// ── Private Route Guard ────────────────────
function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user?.email) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/login" element={<Login />} />

      {/* Admin-only route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Add your other existing routes here */}
      {/* <Route path="/packages/:slug" element={<PackageDetails />} /> */}
      {/* <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} /> */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}