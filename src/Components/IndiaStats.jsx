import React, { useState, useEffect, useRef } from 'react';
import { indiaStats } from '../data/IndiaPackages';

const AnimatedCounter = ({ value, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const startValue = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (value - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toLocaleString('en-IN');
    }
    return num;
  };

  return (
    <span ref={counterRef} className="stat-number">
      {formatNumber(count)}{suffix}
    </span>
  );
};

const IndiaStats = () => {
  return (
    <section className="india-stats-section">
      <div className="container">
        <div className="stats-grid">
          {indiaStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndiaStats;
