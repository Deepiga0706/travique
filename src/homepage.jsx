import React from 'react';
import './styles/homepage.css';
import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import HolidayCategories from './Components/HolidayCategories';
import Destinations from './Components/Destinations';
import Features from './Components/Features';
import Testimonials from './Components/Testimonials';
import Offers from './Components/Offers';
import Newsletter from './Components/Newsletter';
import Footer from './Components/Footer';

export default function Homepage() {
  return (
    <div className="travique-root">
      <Navbar />
      <main>
        <HeroSection />
        <HolidayCategories />
        <Destinations />
        <Features />
        <Testimonials />
        <Offers />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
