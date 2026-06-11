import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

const API = "http://localhost:5000/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [newPkg, setNewPkg] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    location: "",
    image: "",
    highlights: "",
  });

  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("travique_current_user") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [pkgRes, bookRes] = await Promise.all([
        axios.get(`${API}/packages`),
        axios.get(`${API}/admin/bookings`, { headers: authHeader() }),
      ]);
      const pkgs = pkgRes.data || [];
      const bkgs = bookRes.data || [];
      setPackages(pkgs);
      setBookings(bkgs);
      setStats({
        totalPackages: pkgs.length,
        totalBookings: bkgs.length,
        totalRevenue: bkgs.reduce((s, b) => s + (b.totalAmount || 0), 0),
        pendingBookings: bkgs.filter((b) => b.status === "pending").length,
      });
    } catch (e) {
      showToast("Failed to load data", "error");
    }
    setLoading(false);
  }

  function authHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleAddPackage(e) {
    e.preventDefault();
    try {
      const payload = {
        ...newPkg,
        price: Number(newPkg.price),
        highlights: newPkg.highlights
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
      };
      await axios.post(`${API}/admin/packages`, payload, { headers: authHeader() });
      showToast("Package added successfully!");
      setNewPkg({
        title: "",
        slug: "",
        description: "",
        price: "",
        duration: "",
        category: "",
        location: "",
        image: "",
        highlights: "",
      });
      fetchAll();
    } catch (e) {
      showToast(e.response?.data?.message || "Failed to add package", "error");
    }
  }

  async function handleDeletePackage(id, title) {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await axios.delete(`${API}/admin/packages/${id}`, { headers: authHeader() });
      showToast("Package deleted!");
      fetchAll();
    } catch (e) {
      showToast("Failed to delete package", "error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("travique_current_user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "⊞" },
    { key: "packages", label: "Packages", icon: "✦" },
    { key: "add-package", label: "Add Package", icon: "＋" },
    { key: "bookings", label: "Bookings", icon: "◈" },
    { key: "profile", label: "Profile", icon: "◉" },
  ];

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">✦</span>
          <span className="brand-name">IndiaToursAdmin</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.key === "bookings" && stats.pendingBookings > 0 && (
                <span className="nav-badge">{stats.pendingBookings}</span>
              )}
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span>⎋</span> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-title">{navItems.find((n) => n.key === activeTab)?.label}</div>
          <div className="topbar-user">
            <span className="user-avatar">
              {(user.firstname || user.email || "?").charAt(0).toUpperCase()}
            </span>
            <span className="user-email">{user.email}</span>
            <span className="role-badge">Admin</span>
          </div>
        </header>

        {/* Toast */}
        {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}

        <div className="admin-content">
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="tab-content">
              <div className="stats-grid">
                <StatCard icon="📦" label="Total Packages" value={stats.totalPackages} color="amber" />
                <StatCard
                  icon="🎫"
                  label="Total Bookings"
                  value={stats.totalBookings}
                  color="teal"
                />
                <StatCard
                  icon="💰"
                  label="Total Revenue"
                  value={`₹${stats.totalRevenue.toLocaleString()}`}
                  color="rose"
                />
                <StatCard
                  icon="⏳"
                  label="Pending Bookings"
                  value={stats.pendingBookings}
                  color="violet"
                />
              </div>

              <div className="recent-section">
                <h2 className="section-title">Recent Bookings</h2>
                <BookingsTable bookings={bookings.slice(0, 5)} compact />
              </div>

              <div className="recent-section">
                <h2 className="section-title">Recent Packages</h2>
                <PackagesList
                  packages={packages.slice(0, 4)}
                  onDelete={handleDeletePackage}
                  compact
                />
              </div>
            </div>
          )}

          {/* PACKAGES TAB */}
          {activeTab === "packages" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="section-title">
                  All Packages <span className="count-badge">{packages.length}</span>
                </h2>
                <button className="btn-primary" onClick={() => setActiveTab("add-package")}>+ Add New</button>
              </div>
              {loading ? <Loader /> : <PackagesList packages={packages} onDelete={handleDeletePackage} />}
            </div>
          )}

          {/* ADD PACKAGE TAB */}
          {activeTab === "add-package" && (
            <div className="tab-content">
              <h2 className="section-title">Add New Package</h2>
              <form className="pkg-form" onSubmit={handleAddPackage}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      required
                      placeholder="e.g. Kerala Backwaters Tour"
                      value={newPkg.title}
                      onChange={(e) => setNewPkg({ ...newPkg, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Slug *</label>
                    <input
                      required
                      placeholder="e.g. kerala-backwaters-tour"
                      value={newPkg.slug}
                      onChange={(e) => setNewPkg({ ...newPkg, slug: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      required
                      type="number"
                      placeholder="15000"
                      value={newPkg.price}
                      onChange={(e) => setNewPkg({ ...newPkg, price: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      placeholder="5 Days / 4 Nights"
                      value={newPkg.duration}
                      onChange={(e) => setNewPkg({ ...newPkg, duration: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newPkg.category}
                      onChange={(e) => setNewPkg({ ...newPkg, category: e.target.value })}
                    >
                      <option value="">Select category</option>
                      <option value="adventure">Adventure</option>
                      <option value="cultural">Cultural</option>
                      <option value="beach">Beach</option>
                      <option value="wildlife">Wildlife</option>
                      <option value="pilgrimage">Pilgrimage</option>
                      <option value="honeymoon">Honeymoon</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      placeholder="Kerala, India"
                      value={newPkg.location}
                      onChange={(e) => setNewPkg({ ...newPkg, location: e.target.value })}
                    />
                  </div>
                  <div className="form-group full">
                    <label>Image URL</label>
                    <input
                      placeholder="https://..."
                      value={newPkg.image}
                      onChange={(e) => setNewPkg({ ...newPkg, image: e.target.value })}
                    />
                  </div>
                  <div className="form-group full">
                    <label>Description *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the package..."
                      value={newPkg.description}
                      onChange={(e) => setNewPkg({ ...newPkg, description: e.target.value })}
                    />
                  </div>
                  <div className="form-group full">
                    <label>
                      Highlights <span className="hint">(comma separated)</span>
                    </label>
                    <input
                      placeholder="Houseboat stay, Ayurvedic spa, Backwater cruise"
                      value={newPkg.highlights}
                      onChange={(e) => setNewPkg({ ...newPkg, highlights: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setActiveTab("packages")}>Cancel</button>
                  <button type="submit" className="btn-primary">Add Package</button>
                </div>
              </form>
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === "bookings" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="section-title">
                  All Bookings <span className="count-badge">{bookings.length}</span>
                </h2>
              </div>
              <div className="booking-stats-row">
                {["confirmed", "pending", "cancelled"].map((s) => (
                  <div key={s} className={`booking-stat-chip status-${s}`}>
                    <strong>{bookings.filter((b) => b.status === s).length}</strong> {s}
                  </div>
                ))}
              </div>
              {loading ? <Loader /> : <BookingsTable bookings={bookings} />}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="tab-content">
              <h2 className="section-title">Admin Profile</h2>
              <div className="profile-card">
                <div className="profile-avatar-lg">
                  {(user.firstname || user.name || user.email || "?")[0].toUpperCase()}
                </div>
                <div className="profile-info">
                  {(user.firstname || user.name) && (
                    <div className="profile-row">
                      <span>Name</span>
                      <strong>
                        {user.firstname
                          ? `${user.firstname} ${user.lastname || ""}`.trim()
                          : user.name}
                      </strong>
                    </div>
                  )}
                  <div className="profile-row">
                    <span>Email</span>
                    <strong>{user.email}</strong>
                  </div>
                  <div className="profile-row">
                    <span>Role</span>
                    <span className="role-badge">Admin</span>
                  </div>
                  <div className="profile-row">
                    <span>Member Since</span>
                    <strong>{user.createdAt ? new Date(user.createdAt).getFullYear() : "—"}</strong>
                  </div>
                  <div className="profile-row">
                    <span>Packages</span>
                    <strong>{stats.totalPackages}</strong>
                  </div>
                  <div className="profile-row">
                    <span>Total Bookings</span>
                    <strong>{stats.totalBookings}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <span className="stat-icon">{icon}</span>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function PackagesList({ packages, onDelete, compact }) {
  if (!packages.length) return <div className="empty-state">No packages found.</div>;
  return (
    <div className={`pkg-grid ${compact ? "pkg-grid-compact" : ""}`}>
      {packages.map((pkg) => (
        <div key={pkg._id || pkg.slug} className="pkg-card">
          {pkg.image && <img src={pkg.image} alt={pkg.title} className="pkg-thumb" />}
          <div className="pkg-card-body">
            <div className="pkg-card-title">{pkg.title}</div>
            <div className="pkg-card-meta">
              <span className="pkg-price">₹{(pkg.price || 0).toLocaleString()}</span>
              <span className="pkg-duration">{pkg.duration}</span>
            </div>
            {pkg.category && <span className={`pkg-cat cat-${pkg.category}`}>{pkg.category}</span>}
          </div>
          <button
            className="delete-btn"
            onClick={() => onDelete(pkg._id, pkg.title)}
            title="Delete"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

function BookingsTable({ bookings, compact }) {
  if (!bookings.length) return <div className="empty-state">No bookings yet.</div>;
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Package</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id || i}>
              <td className="td-num">{i + 1}</td>
              <td>{b.customerName || b.user?.name || "—"}</td>
              <td>{b.packageTitle || b.package?.title || "—"}</td>
              <td>
                {b.travelDate
                  ? new Date(b.travelDate).toLocaleDateString("en-IN")
                  : "—"}
              </td>
              <td className="td-amt">₹{(b.totalAmount || 0).toLocaleString()}</td>
              <td>
                <span className={`status-pill status-${b.status}`}>{b.status || "pending"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

