import React, { useState, useMemo } from 'react';
import { indiaPackages, budgetRanges, durationOptions } from '../data/indiaPackages';

import IndiaStats from '../components/india/IndiaStats';
import IndiaSearchFilter from '../components/india/IndiaSearchFilter';
import IndiaCategories from '../components/india/IndiaCategories';
import IndiaPackages from '../data/IndiaPackages';
import IndiaGallery from '../components/india/IndiaGallery';

import '../styles/IndiaTours.css';

const IndiaToursPage = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Parse duration from string like "6 Days / 5 Nights"
  const parseDuration = (durationStr) => {
    const match = durationStr.match(/(\d+)\s*Days/i);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter packages based on all criteria
  const filteredPackages = useMemo(() => {
    return indiaPackages.filter((pkg) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        pkg.title.toLowerCase().includes(searchLower) ||
        pkg.destination.toLowerCase().includes(searchLower) ||
        pkg.region.toLowerCase().includes(searchLower);

      // Budget filter
      const budgetRange = budgetRanges.find((b) => b.id === selectedBudget);
      const matchesBudget =
        selectedBudget === 'all' ||
        (pkg.price >= budgetRange.min && pkg.price <= budgetRange.max);

      // Duration filter
      const days = parseDuration(pkg.duration);
      let matchesDuration = true;
      if (selectedDuration === 'short') matchesDuration = days >= 1 && days <= 4;
      else if (selectedDuration === 'medium') matchesDuration = days >= 5 && days <= 7;
      else if (selectedDuration === 'long') matchesDuration = days >= 8;

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || pkg.category.includes(selectedCategory);

      return matchesSearch && matchesBudget && matchesDuration && matchesCategory;
    });
  }, [searchQuery, selectedBudget, selectedDuration, selectedCategory]);

  // Get featured packages for highlight section
  const featuredPackages = useMemo(() => {
    return indiaPackages.filter((pkg) => pkg.featured);
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Scroll to packages section
    document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBudget('all');
    setSelectedDuration('all');
    setSelectedCategory('all');
  };

  return (
    <div className="india-tours-page">
      <IndiaHero />
      <IndiaStats />

      <IndiaSearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        clearFilters={clearFilters}
        resultsCount={filteredPackages.length}
      />

      <IndiaCategories onCategorySelect={handleCategorySelect} />

      <IndiaPackages
        packages={filteredPackages}
        featuredPackages={featuredPackages}
        selectedCategory={selectedCategory}
      />

      <WhyChooseTravique />
      <IndiaTestimonials />
      <IndiaGallery />
      <IndiaFAQ />

      {/* Floating Enquire Button */}
      <a href="#enquire" className="floating-enquire-btn">
        <span className="enquire-icon">📩</span>
        <span className="enquire-text">ENQUIRE NOW</span>
      </a>
    </div>
  );
};

export default IndiaToursPage;
