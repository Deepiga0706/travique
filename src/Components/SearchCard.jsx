import React from 'react';

export default function SearchCard() {
  return (
    <div className="search-float container" aria-hidden={false}>
      <form className="search-card" onSubmit={e => e.preventDefault()} aria-label="Booking Search">
        <div className="field">
          <label className="sr-only">Destination</label>
          <input placeholder="Destination" aria-label="Destination" />
        </div>

        <div className="field">
          <label className="sr-only">Travel Theme</label>
          <select aria-label="Travel Theme">
            <option>Any Theme</option>
            <option>Honeymoon</option>
            <option>Adventure</option>
            <option>Family</option>
            <option>Luxury</option>
          </select>
        </div>

        <div className="field">
          <label className="sr-only">Travel Date</label>
          <input type="date" aria-label="Departure Date" />
        </div>

        <div className="field submit">
          <button className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  );
}
