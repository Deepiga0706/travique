const packages = [
  {
    id: 'maldives-romantic-escape',
    category: 'honeymoon-packages',
    title: 'Maldives Romantic Escape',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    duration: '5 Days / 4 Nights',
    price: 'Starting Rs. 45,000',
    description: 'A secluded resort stay with private dinners and spa treatments.',
    destination: 'Maldives',
    inclusions: ['Accommodation', 'Daily breakfast', 'Airport transfers', 'One romantic dinner'],
    exclusions: ['Flights', 'Travel insurance', 'Personal expenses'],
    highlights: ['Private villa', 'Sunset cruise', 'Spa treatment'],
    itinerary: [
      { day: 1, title: 'Arrival and Resort Check-in', details: 'Meet and greet, transfer to villa, welcome drink and sunset walk.' },
      { day: 2, title: 'Island Exploration', details: 'Snorkeling, beach time and local island visit.' },
      { day: 3, title: 'Water Activities', details: 'Optional water-sports: diving, snorkeling and reef tour.' },
      { day: 4, title: 'Sunset Cruise', details: 'Private sunset cruise with champagne and canapés.' },
      { day: 5, title: 'Departure', details: 'Breakfast and transfer to airport.' }
    ]
  },
  {
    id: 'bali-honeymoon-retreat',
    category: 'honeymoon-packages',
    title: 'Bali Honeymoon Retreat',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    duration: '6 Days / 5 Nights',
    price: 'Starting Rs. 39,999',
    description: 'Romantic stays in Ubud with private tours and cultural experiences.',
    destination: 'Bali, Indonesia',
    inclusions: ['Accommodation', 'Breakfast', 'Private tour'],
    exclusions: ['Flights'],
    highlights: ['Rice terrace visit', 'Couples spa'],
    itinerary: [
      { day: 1, title: 'Arrival', details: 'Arrival and transfer to Ubud.' },
      { day: 2, title: 'Cultural Tour', details: 'Temple visits and local dances.' },
      { day: 3, title: 'Beach Day', details: 'Relax at the beach and sunset dinner.' }
    ]
  },
  {
    id: 'switzerland-couple-tour',
    category: 'honeymoon-packages',
    title: 'Switzerland Couple Tour',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    duration: '7 Days / 6 Nights',
    price: 'Starting Rs. 1,20,000',
    description: 'Alpine scenery, romantic train rides and lakeside dinners.',
    destination: 'Switzerland',
    inclusions: ['Accommodation', 'Breakfast', 'Train transfers'],
    exclusions: ['Flights'],
    highlights: ['Scenic train', 'Lake Lucerne'],
    itinerary: [
      { day: 1, title: 'Arrival Zurich', details: 'City orientation and lakeside dinner.' },
      { day: 2, title: 'Lucerne', details: 'Explore Lucerne and Mount Pilatus.' }
    ]
  },
  {
    id: 'kashmir-honeymoon-special',
    category: 'honeymoon-packages',
    title: 'Kashmir Honeymoon Special',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    duration: '5 Days / 4 Nights',
    price: 'Starting Rs. 34,000',
    description: 'Houseboat stay in Srinagar and mountain views.',
    destination: 'Kashmir',
    inclusions: ['Houseboat', 'Breakfast', 'Sightseeing'],
    exclusions: ['Flights'],
    highlights: ['Dal Lake', 'Shikara ride'],
    itinerary: [
      { day: 1, title: 'Arrival Srinagar', details: 'Check-in to houseboat and shikara ride.' },
      { day: 2, title: 'Local Sightseeing', details: 'Visit Mughal gardens and local markets.' }
    ]
  },
  {
    id: 'manali-couple-getaway',
    category: 'honeymoon-packages',
    title: 'Manali Couple Getaway',
    image: 'https://images.unsplash.com/photo-1518684079-6ea9c1a8c8e6?auto=format&fit=crop&w=1200&q=80',
    duration: '4 Days / 3 Nights',
    price: 'Starting Rs. 24,999',
    description: 'Mountain cottage stays and valley walks.',
    destination: 'Manali, India',
    inclusions: ['Accommodation', 'Breakfast', 'Transfers'],
    exclusions: ['Flights'],
    highlights: ['Rohtang Pass (seasonal)'],
    itinerary: [
      { day: 1, title: 'Arrival and Relax', details: 'Check-in and local dinner.' },
      { day: 2, title: 'Valley Exploration', details: 'Solang valley visit and optional activities.' }
    ]
  }
  ,
  /* International Tours */
  {
    id: 'europe-classic-escapade',
    category: 'international-tours',
    title: 'Europe Classic Escapade',
    image: 'https://images.unsplash.com/photo-1505765053867-76bccd3b0f4f?auto=format&fit=crop&w=1200&q=80',
    duration: '9 Days / 8 Nights',
    price: 'Starting Rs. 1,75,000',
    description: 'Signature European cities with guided sightseeing and rail transfers.',
    destination: 'Europe',
    inclusions: ['Hotels', 'Breakfast', 'Intercity trains'],
    exclusions: ['Flights'],
    highlights: ['Paris, Rome, Zurich'],
    itinerary: [
      { day: 1, title: 'Arrival Paris', details: 'City tour and Seine evening cruise.' },
      { day: 2, title: 'Paris to Rome', details: 'Flight to Rome and Colosseum visit.' }
    ]
  },
  {
    id: 'southeast-asia-highlights',
    category: 'international-tours',
    title: 'Southeast Asia Highlights',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    duration: '7 Days / 6 Nights',
    price: 'Starting Rs. 59,999',
    description: 'Cambodia and Thailand mix of culture and beaches.',
    destination: 'Thailand & Cambodia',
    inclusions: ['Hotels', 'Some meals', 'Transfers'],
    exclusions: ['Flights'],
    highlights: ['Angkor Wat', 'Bangkok street food'],
    itinerary: [
      { day: 1, title: 'Arrival Bangkok', details: 'Street food tour at night.' },
      { day: 2, title: 'Bangkok City', details: 'Temples and markets.' }
    ]
  },

  /* Family Vacations */
  {
    id: 'goa-family-fun',
    category: 'family-vacations',
    title: 'Goa Family Fun',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    duration: '5 Days / 4 Nights',
    price: 'Starting Rs. 19,999',
    description: 'Beach activities and kid-friendly resorts.',
    destination: 'Goa, India',
    inclusions: ['Hotel', 'Breakfast', 'Transfers'],
    exclusions: ['Flights'],
    highlights: ['Water sports', 'Beach games'],
    itinerary: [
      { day: 1, title: 'Arrival Goa', details: 'Resort check-in and beach time.' },
      { day: 2, title: 'Beach Activities', details: 'Fun activities for kids.' }
    ]
  },
  {
    id: 'jaipur-cultural-family',
    category: 'family-vacations',
    title: 'Jaipur Cultural Family',
    image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=1200&q=80',
    duration: '4 Days / 3 Nights',
    price: 'Starting Rs. 14,999',
    description: 'Heritage city tour suitable for families.',
    destination: 'Jaipur, India',
    inclusions: ['Hotel', 'Breakfast', 'Sightseeing'],
    exclusions: ['Flights'],
    highlights: ['Amber Fort', 'City Palace'],
    itinerary: [
      { day: 1, title: 'Arrival', details: 'City orientation.' },
      { day: 2, title: 'Fort Visit', details: 'Amber Fort and elephant ride (optional).' }
    ]
  },

  /* Adventure Trips */
  {
    id: 'nepal-trek-adventure',
    category: 'adventure-trips',
    title: 'Nepal Trek Adventure',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    duration: '8 Days / 7 Nights',
    price: 'Starting Rs. 29,999',
    description: 'Guided trekking routes with experienced guides.',
    destination: 'Nepal',
    inclusions: ['Guides', 'Lodging', 'Meals'],
    exclusions: ['Flights', 'Permits'],
    highlights: ['Himalayan views', 'Local villages'],
    itinerary: [
      { day: 1, title: 'Kathmandu Arrival', details: 'Preparation and briefing.' },
      { day: 2, title: 'Begin Trek', details: 'Trek to base village.' }
    ]
  },
  {
    id: 'rajasthan-desert-adventure',
    category: 'adventure-trips',
    title: 'Rajasthan Desert Adventure',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80',
    duration: '3 Days / 2 Nights',
    price: 'Starting Rs. 9,999',
    description: 'Camel safaris and desert camping experiences.',
    destination: 'Jaisalmer, India',
    inclusions: ['Camp stay', 'Meals', 'Camel safari'],
    exclusions: ['Flights'],
    highlights: ['Campfire', 'Desert sunset'],
    itinerary: [
      { day: 1, title: 'Arrive Jaisalmer', details: 'Transfer to desert camp.' },
      { day: 2, title: 'Desert Activities', details: 'Camel safari and cultural show.' }
    ]
  },

  /* Beach Escapes */
  {
    id: 'andaman-beach-retreat',
    category: 'beach-escapes',
    title: 'Andaman Beach Retreat',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    duration: '5 Days / 4 Nights',
    price: 'Starting Rs. 29,999',
    description: 'White sand beaches and coral snorkeling.',
    destination: 'Andaman Islands',
    inclusions: ['Hotel', 'Breakfast', 'Transfers'],
    exclusions: ['Flights'],
    highlights: ['Radhanagar Beach', 'Snorkeling'],
    itinerary: [
      { day: 1, title: 'Arrival Port Blair', details: 'Ferry to Havelock and check-in.' },
      { day: 2, title: 'Beach Day', details: 'Radhanagar Beach and relaxation.' }
    ]
  },

  /* Luxury Retreats */
  {
    id: 'sri-lanka-luxury-retreat',
    category: 'luxury-retreats',
    title: 'Sri Lanka Luxury Retreat',
    image: 'https://images.unsplash.com/photo-1499696014695-815c3f08a6b3?auto=format&fit=crop&w=1200&q=80',
    duration: '6 Days / 5 Nights',
    price: 'Starting Rs. 79,999',
    description: 'Luxury villas, private transfers and curated experiences.',
    destination: 'Sri Lanka',
    inclusions: ['Villa stay', 'Breakfast', 'Private transfers'],
    exclusions: ['Flights'],
    highlights: ['Private beaches', 'Gourmet dining'],
    itinerary: [
      { day: 1, title: 'Arrival', details: 'Private transfer and leisure.' },
      { day: 2, title: 'Spa & Relax', details: 'Signature spa and gourmet dining.' }
    ]
  }
];

export default packages;
