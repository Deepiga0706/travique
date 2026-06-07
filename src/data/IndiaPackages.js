// India Packages Sample Data
// TODO: Replace with API call to GET /api/packages?category=india

export const indiaPackages = [
  // North India
  {
    id: 'kashmir-paradise',
    title: 'Kashmir Paradise',
    destination: 'Srinagar, Gulmarg, Pahalgam',
    region: 'North India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800)',
    duration: '6 Days / 5 Nights',
    price: 24999,
    originalPrice: 32999,
    rating: 4.8,
    reviews: 245,
    description: 'Experience the paradise on Earth with houseboat stays, shikara rides, and breathtaking mountain views.',
    category: ['honeymoon', 'family', 'adventure'],
    highlights: ['Dal Lake Houseboat', 'Gulmarg Gondola', 'Pahalgam Valley'],
    inclusions: ['Hotels', 'Meals', 'Transfers', 'Sightseeing'],
    bestTime: 'March - October',
    featured: true
  },
  {
    id: 'himachal-adventure',
    title: 'Himachal Adventure',
    destination: 'Shimla, Manali, Dharamshala',
    region: 'North India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800)',
    duration: '7 Days / 6 Nights',
    price: 18999,
    originalPrice: 25999,
    rating: 4.7,
    reviews: 312,
    description: 'Adventure through the majestic Himalayas with thrilling activities and scenic mountain towns.',
    category: ['adventure', 'family', 'group'],
    highlights: ['Rohtang Pass', 'Solang Valley', 'Mall Road Shimla'],
    inclusions: ['Hotels', 'Breakfast', 'Transfers', 'Adventure Activities'],
    bestTime: 'April - June, September - November',
    featured: true
  },
  {
    id: 'uttarakhand-escape',
    title: 'Uttarakhand Escape',
    destination: 'Nainital, Mussoorie, Rishikesh',
    region: 'North India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1606210122158-eeb10e0823bf?w=800)',
    duration: '5 Days / 4 Nights',
    price: 15999,
    originalPrice: 21999,
    rating: 4.6,
    reviews: 189,
    description: 'Discover the spiritual and natural beauty of Uttarakhand from serene lakes to adventure sports.',
    category: ['family', 'adventure', 'pilgrimage'],
    highlights: ['Naini Lake Boating', 'Kempty Falls', 'Rishikesh Rafting'],
    inclusions: ['Hotels', 'Meals', 'Transfers'],
    bestTime: 'March - June, September - November',
    featured: false
  },
  {
    id: 'golden-triangle',
    title: 'Golden Triangle Tour',
    destination: 'Delhi, Agra, Jaipur',
    region: 'North India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800)',
    duration: '5 Days / 4 Nights',
    price: 19999,
    originalPrice: 27999,
    rating: 4.9,
    reviews: 567,
    description: 'India\'s most iconic tour covering the Taj Mahal, historic forts, and vibrant culture.',
    category: ['family', 'educational', 'group'],
    highlights: ['Taj Mahal Sunrise', 'Amber Fort', 'Qutub Minar'],
    inclusions: ['Hotels', 'All Meals', 'Guide', 'Transfers'],
    bestTime: 'October - March',
    featured: true
  },
  // South India
  {
    id: 'kerala-backwaters',
    title: 'Kerala Backwaters',
    destination: 'Kochi, Alleppey, Munnar',
    region: 'South India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800)',
    duration: '6 Days / 5 Nights',
    price: 22999,
    originalPrice: 29999,
    rating: 4.8,
    reviews: 423,
    description: 'Cruise through serene backwaters on a houseboat and explore lush tea plantations.',
    category: ['honeymoon', 'family', 'luxury'],
    highlights: ['Houseboat Stay', 'Munnar Tea Gardens', 'Kathakali Show'],
    inclusions: ['Hotels', 'Houseboat', 'Meals', 'Transfers'],
    bestTime: 'September - March',
    featured: true
  },
  {
    id: 'ooty-kodaikanal',
    title: 'Ooty & Kodaikanal',
    destination: 'Ooty, Kodaikanal, Coimbatore',
    region: 'South India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800)',
    duration: '5 Days / 4 Nights',
    price: 16999,
    originalPrice: 22999,
    rating: 4.5,
    reviews: 198,
    description: 'Explore the Queen of Hill Stations and the Princess of Hill Stations in one trip.',
    category: ['honeymoon', 'family'],
    highlights: ['Ooty Botanical Garden', 'Kodai Lake', 'Nilgiri Mountain Railway'],
    inclusions: ['Hotels', 'Breakfast', 'Transfers', 'Sightseeing'],
    bestTime: 'April - June, September - October',
    featured: false
  },
  {
    id: 'mysore-coorg',
    title: 'Mysore & Coorg',
    destination: 'Mysore, Coorg, Bangalore',
    region: 'South India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1600100397608-577b8eb4b3ed?w=800)',
    duration: '4 Days / 3 Nights',
    price: 13999,
    originalPrice: 18999,
    rating: 4.6,
    reviews: 156,
    description: 'Royal palaces meet coffee plantations in this perfect South India getaway.',
    category: ['family', 'honeymoon', 'educational'],
    highlights: ['Mysore Palace', 'Abbey Falls', 'Coffee Plantations'],
    inclusions: ['Hotels', 'Breakfast', 'Transfers'],
    bestTime: 'October - February',
    featured: false
  },
  {
    id: 'pondicherry-retreat',
    title: 'Pondicherry Retreat',
    destination: 'Pondicherry, Auroville, Mahabalipuram',
    region: 'South India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800)',
    duration: '4 Days / 3 Nights',
    price: 12999,
    originalPrice: 17999,
    rating: 4.7,
    reviews: 234,
    description: 'French colonial charm meets spiritual tranquility on the Tamil Nadu coast.',
    category: ['honeymoon', 'group', 'educational'],
    highlights: ['French Quarter', 'Auroville', 'Paradise Beach'],
    inclusions: ['Hotels', 'Breakfast', 'Transfers', 'Heritage Walk'],
    bestTime: 'October - March',
    featured: false
  },
  // West India
  {
    id: 'goa-beach-escape',
    title: 'Goa Beach Escape',
    destination: 'North Goa, South Goa',
    region: 'West India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800)',
    duration: '5 Days / 4 Nights',
    price: 14999,
    originalPrice: 19999,
    rating: 4.7,
    reviews: 678,
    description: 'Sun, sand, and sea await you in India\'s favorite beach destination.',
    category: ['honeymoon', 'group', 'adventure'],
    highlights: ['Beach Hopping', 'Water Sports', 'Old Goa Churches', 'Nightlife'],
    inclusions: ['Beach Resort', 'Breakfast', 'Transfers', 'Water Sports'],
    bestTime: 'November - February',
    featured: true
  },
  {
    id: 'royal-rajasthan',
    title: 'Royal Rajasthan',
    destination: 'Jaipur, Udaipur, Jodhpur, Jaisalmer',
    region: 'West India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800)',
    duration: '8 Days / 7 Nights',
    price: 34999,
    originalPrice: 45999,
    rating: 4.9,
    reviews: 445,
    description: 'Experience royal heritage, majestic forts, and golden sand dunes.',
    category: ['family', 'luxury', 'educational', 'group'],
    highlights: ['Desert Safari', 'Lake Palace', 'Mehrangarh Fort', 'Heritage Stays'],
    inclusions: ['Heritage Hotels', 'All Meals', 'Guide', 'Transfers', 'Camel Safari'],
    bestTime: 'October - March',
    featured: true
  },
  {
    id: 'gujarat-heritage',
    title: 'Gujarat Heritage',
    destination: 'Ahmedabad, Kutch, Gir, Dwarka',
    region: 'West India',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1609948543911-7f45f7c7bc2e?w=800)',
    duration: '7 Days / 6 Nights',
    price: 26999,
    originalPrice: 35999,
    rating: 4.6,
    reviews: 134,
    description: 'From the white desert to Asiatic lions, discover Gujarat\'s diverse treasures.',
    category: ['family', 'wildlife', 'educational', 'pilgrimage'],
    highlights: ['Rann of Kutch', 'Gir Lion Safari', 'Statue of Unity', 'Dwarka Temple'],
    inclusions: ['Hotels', 'Meals', 'Safari', 'Transfers'],
    bestTime: 'November - February',
    featured: false
  },
  // Islands
  {
    id: 'andaman-honeymoon',
    title: 'Andaman Honeymoon',
    destination: 'Port Blair, Havelock, Neil Island',
    region: 'Islands',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800)',
    duration: '6 Days / 5 Nights',
    price: 32999,
    originalPrice: 42999,
    rating: 4.8,
    reviews: 298,
    description: 'Crystal clear waters, pristine beaches, and romantic island vibes.',
    category: ['honeymoon', 'adventure', 'luxury'],
    highlights: ['Radhanagar Beach', 'Scuba Diving', 'Cellular Jail', 'Glass Bottom Boat'],
    inclusions: ['Beach Resort', 'All Meals', 'Ferry', 'Water Sports', 'Transfers'],
    bestTime: 'October - May',
    featured: true
  }
];

// Category data for the India Tours page
export const indiaCategories = [
  {
    id: 'family',
    title: 'Family Vacations',
    description: 'Memories for every generation',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800)',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'honeymoon',
    title: 'Honeymoon Packages',
    description: 'Romantic getaways',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1439539698758-ba2680ecadb9?w=800)',
    icon: '💑'
  },
  {
    id: 'adventure',
    title: 'Adventure Tours',
    description: 'Thrilling experiences',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800)',
    icon: '🏔️'
  },
  {
    id: 'pilgrimage',
    title: 'Pilgrimage Tours',
    description: 'Sacred journeys',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1545126178-862cdb469409?w=800)',
    icon: '🙏'
  },
  {
    id: 'luxury',
    title: 'Luxury Escapes',
    description: 'Premium vacations',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800)',
    icon: '👑'
  },
  {
    id: 'wildlife',
    title: 'Wildlife Safaris',
    description: 'Nature encounters',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1549366021-9f761d450615?w=800)',
    icon: '🐅'
  },
  {
    id: 'educational',
    title: 'Educational Tours',
    description: 'Learning through travel',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800)',
    icon: '📚'
  },
  {
    id: 'group',
    title: 'Group Tours',
    description: 'Travel together',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800)',
    icon: '👥'
  }
];

// Testimonials data
export const indiaTestimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150)',
    rating: 5,
    review: 'Our Kerala trip was absolutely magical! The houseboat experience and the personalized itinerary made it unforgettable. Travique handled everything perfectly.',
    package: 'Kerala Backwaters'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150)',
    rating: 5,
    review: 'The Royal Rajasthan tour exceeded all expectations. From heritage hotels to the desert safari, every moment was carefully curated. Highly recommend!',
    package: 'Royal Rajasthan'
  },
  {
    id: 3,
    name: 'Anita Desai',
    location: 'Bangalore, Karnataka',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150)',
    rating: 5,
    review: 'Took our kids on the Golden Triangle tour. The guide was knowledgeable and patient. Kids learned so much about Indian history. Perfect family trip!',
    package: 'Golden Triangle Tour'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Chandigarh, Punjab',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150)',
    rating: 4,
    review: 'Kashmir is truly paradise! The houseboat stay on Dal Lake was romantic and serene. Travique made our honeymoon extra special with thoughtful touches.',
    package: 'Kashmir Paradise'
  },
  {
    id: 5,
    name: 'Meera Nair',
    location: 'Chennai, Tamil Nadu',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150)',
    rating: 5,
    review: 'The Andaman trip was perfect for our anniversary. Crystal clear waters, amazing snorkeling, and the resort was top-notch. Will book with Travique again!',
    package: 'Andaman Honeymoon'
  }
];

// Gallery images
export const indiaGallery = [
  {
    id: 1,
    title: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800)'
  },
  {
    id: 2,
    title: 'Dal Lake',
    location: 'Srinagar, Kashmir',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800)'
  },
  {
    id: 3,
    title: 'Kerala Backwaters',
    location: 'Alleppey, Kerala',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800)'
  },
  {
    id: 4,
    title: 'Goa Beaches',
    location: 'Goa',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800)'
  },
  {
    id: 5,
    title: 'Hawa Mahal',
    location: 'Jaipur, Rajasthan',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800)'
  },
  {
    id: 6,
    title: 'Radhanagar Beach',
    location: 'Havelock, Andaman',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800)'
  },
  {
    id: 7,
    title: 'Living Root Bridges',
    location: 'Cherrapunji, Meghalaya',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800)'
  },
  {
    id: 8,
    title: 'Pangong Lake',
    location: 'Ladakh',
    image: '[images.unsplash.com](https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800)'
  }
];

// FAQ data
export const indiaFAQs = [
  {
    id: 1,
    question: 'What is the best time to visit India?',
    answer: 'India is a year-round destination! October to March is ideal for most regions with pleasant weather. For hill stations, April to June offers respite from summer heat. Monsoon season (July-September) is perfect for Kerala and the Western Ghats. We recommend packages based on the best season for each destination.'
  },
  {
    id: 2,
    question: 'How can I customize a package?',
    answer: 'All our packages are fully customizable! Simply click "Enquire Now" on any package or contact our travel experts. You can modify destinations, duration, hotels, activities, and more. We\'ll create a personalized itinerary that matches your preferences and budget.'
  },
  {
    id: 3,
    question: 'Are flights included in the package price?',
    answer: 'Flight inclusions vary by package. Most of our packages include ground transportation, hotels, and activities. Flights can be added at an additional cost. Look for the "Inclusions" section on each package for details, or ask our team to add flights to your booking.'
  },
  {
    id: 4,
    question: 'Which package is best for families with children?',
    answer: 'Our top family-friendly packages include Kerala Backwaters, Golden Triangle Tour, and Ooty-Kodaikanal. These offer a mix of sightseeing, nature, and activities suitable for all ages. We can also customize any package with kid-friendly hotels and activities.'
  },
  {
    id: 5,
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and EMI options through secure payment gateways. A 20% advance is required to confirm your booking, with the balance due 15 days before departure. We also offer flexible payment plans for premium packages.'
  },
  {
    id: 6,
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 30+ days before departure receive a full refund minus processing fees. 15-29 days: 50% refund. 7-14 days: 25% refund. Less than 7 days: No refund. We recommend travel insurance for added protection. Special policies apply during peak seasons.'
  }
];

// Stats data
export const indiaStats = [
  { value: 28, suffix: '+', label: 'States Covered' },
  { value: 150, suffix: '+', label: 'Destinations' },
  { value: 10000, suffix: '+', label: 'Happy Travelers' },
  { value: 500, suffix: '+', label: 'Tour Packages' }
];

// Why Choose Travique features
export const whyChooseFeatures = [
  {
    icon: '💰',
    title: 'Best Price Guarantee',
    description: 'We match any comparable price and offer exclusive deals you won\'t find elsewhere.'
  },
  {
    icon: '🎯',
    title: 'Expert Tour Guides',
    description: 'Knowledgeable local guides who bring destinations to life with stories and insights.'
  },
  {
    icon: '✨',
    title: 'Customized Packages',
    description: 'Tailor every aspect of your trip to match your preferences and travel style.'
  },
  {
    icon: '🏨',
    title: 'Verified Hotels',
    description: 'Handpicked accommodations that meet our quality standards for comfort and service.'
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    description: 'Your transactions are protected with bank-grade encryption and security protocols.'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Round-the-clock assistance before, during, and after your trip for peace of mind.'
  }
];

// Budget ranges for filter
export const budgetRanges = [
  { id: 'all', label: 'All Budgets', min: 0, max: Infinity },
  { id: 'budget', label: 'Under ₹15,000', min: 0, max: 15000 },
  { id: 'mid', label: '₹15,000 - ₹25,000', min: 15000, max: 25000 },
  { id: 'premium', label: '₹25,000 - ₹35,000', min: 25000, max: 35000 },
  { id: 'luxury', label: 'Above ₹35,000', min: 35000, max: Infinity }
];

// Duration options for filter
export const durationOptions = [
  { id: 'all', label: 'Any Duration' },
  { id: 'short', label: '1-4 Days' },
  { id: 'medium', label: '5-7 Days' },
  { id: 'long', label: '8+ Days' }
];
