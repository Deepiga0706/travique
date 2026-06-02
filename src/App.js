import './App.css';
import Homepage from './homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import FAQ from './Pages/FAQ';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Bookings from './Pages/Bookings';
import CategoryPage from './Pages/CategoryPage';
import PackageDetails from './Pages/PackageDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/honeymoon-packages" element={<CategoryPage slug="honeymoon-packages" title="Honeymoon Packages" />} />
        <Route path="/international-tours" element={<CategoryPage slug="international-tours" title="International Tours" />} />
        <Route path="/family-vacations" element={<CategoryPage slug="family-vacations" title="Family Vacations" />} />
        <Route path="/adventure-trips" element={<CategoryPage slug="adventure-trips" title="Adventure Trips" />} />
        <Route path="/beach-escapes" element={<CategoryPage slug="beach-escapes" title="Beach Escapes" />} />
        <Route path="/luxury-retreats" element={<CategoryPage slug="luxury-retreats" title="Luxury Retreats" />} />
        <Route path="/package/:id" element={<PackageDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
