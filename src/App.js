import './App.css';
import React, { useState } from 'react';
import Homepage from './homepage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import FAQ from './Pages/FAQ';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';
import Bookings from './Pages/Bookings';
import CategoryPage from './Pages/CategoryPage';
import PackageDetails from './Pages/PackageDetails';
import BookNow from './Pages/BookingNow';
import EducationalTrip from './Pages/EducationalTrip';
import IndiaToursPage from './Pages/IndiaTourpage';
import CustomizeTrip from './Pages/CustomizeTrip';
import CustomTripDetails from './Pages/CustomTripDetails';



import { WhatsAppWidget } from './Components/whatsapp';
import AdminDashboard from './Pages/AdminDashboard';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsConditions from './Pages/TermsConditions';


// ── Role-based Route Guard ────────────────────────────────────────
function ProtectedRoute({ children, requiredRole }) {
  let user = null;
  try { user = JSON.parse(localStorage.getItem('travique_current_user') || 'null'); } catch {}

  if (!user || !user.email) return <Navigate to="/login" replace />;
  if (requiredRole && user.role?.toLowerCase() !== requiredRole.toLowerCase()) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('travique_current_user')||'null') }
    catch(e) { return null }
  });

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={() => setUser(null)} />
      <WhatsAppWidget phone="917812896197" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login onAuth={(u)=>setUser(u)} />} />
        <Route path="/signup" element={<Signup onAuth={(u)=>setUser(u)} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/honeymoon-packages" element={<CategoryPage slug="honeymoon-packages" title="Honeymoon Packages" />} />
        <Route path="/international-tours" element={<CategoryPage slug="international-tours" title="International Tours" />} />
        <Route path="/group-tours" element={<CategoryPage slug="group-tours" title="Group Tours" />} />
        <Route path="/group" element={<CategoryPage slug="group-tours" title="Group Tours" />} />
        <Route path="/india" element={<IndiaToursPage />} />
        <Route path="/destination/:slug" element={<CategoryPage />} />
        <Route path="/family-vacations" element={<CategoryPage slug="family-vacations" title="Family Vacations" />} />
        <Route path="/adventure-trips" element={<CategoryPage slug="adventure-trips" title="Adventure Trips" />} />
        <Route path="/beach-escapes" element={<CategoryPage slug="beach-escapes" title="Beach Escapes" />} />
        <Route path="/luxury-retreats" element={<CategoryPage slug="luxury-retreats" title="Luxury Retreats" />} />
        <Route path="/package/:slug" element={<PackageDetails />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/educational" element={<EducationalTrip />} />
        <Route path="/customize-trip" element={<CustomizeTrip />} />
        <Route path="/custom-trip/:id" element={<CustomTripDetails />} />


        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
