import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { title: 'Honeymoon Packages', img: 'https://static1.thetravelimages.com/wordpress/wp-content/uploads/2022/12/couple-on-a-honeymoon-in-the-maldives.JPG?auto=format&fit=crop&w=800&q=80', desc: 'Romantic secluded getaways' },
  { title: 'International Tours', img: 'https://tourismteacher.com/wp-content/uploads/2020/09/pexels-photo-753626.jpeg?auto=format&fit=crop&w=800&q=80', desc: 'Global iconic landmarks' },
  { title: 'Family Vacations', img: 'https://thumbs.dreamstime.com/b/family-having-fun-beach-side-view-happy-african-american-152091966.jpg?auto=format&fit=crop&w=800&q=80', desc: 'Memories for every generation' },
  { title: 'Adventure Trips', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', desc: 'Thrilling offbeat escapes' },
  { title: 'Beach Escapes', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', desc: 'Sun, sand and sea' },
  { title: 'Luxury Retreats', img: 'https://travelfoodnlife.com/wp-content/uploads/2024/05/luxury-travel-agency.jpg?auto=format&fit=crop&w=800&q=80', desc: 'Ultra-premium private stays' }
];

export default function HolidayCategories() {
  const navigate = useNavigate();
  return (
    <section id="categories" className="categories container">
      <h2 className="section-title">Featured Holiday Categories</h2>
      <div className="grid">
        {categories.map((c, i) => (
          <article key={i} className="card category-card">
            <div className="media" style={{ backgroundImage: `url(${c.img})` }} />
            <div className="card-body">
              <h3>{c.title}</h3>
              <p className="muted">{c.desc}</p>
              <button className="btn btn-outline" onClick={()=>{
                const slug = c.title.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'');
                navigate(`/${slug}`);
              }}>Explore</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
