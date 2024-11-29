// components/FilterBar/FilterBar.js

import React, { useState } from "react";
import styles from "./FilterBar.module.css";

const FilterBar = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("");

  const handleFilter = () => {
    onFilter({ searchTerm, priceRange, location, minRating });
  };

  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        placeholder="Search by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price (PKR)"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Rating"
        step="0.1"
        max="5"
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
      />
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;
