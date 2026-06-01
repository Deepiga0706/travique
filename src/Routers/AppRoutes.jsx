import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Honeymoon from "../Pages/Honeymoon";
import International from "../Pages/International";
import IndiaTours from "../Pages/IndiaTours";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/honeymoon" element={<Honeymoon />} />
        <Route path="/international" element={<International />} />
        <Route path="/india" element={<IndiaTours />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
  );
}

export default AppRoutes;