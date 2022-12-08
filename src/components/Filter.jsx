import React from "react";

export default function Filter() {
  const handleSort = (event) => {
    event.preventDefault();
    console.log("heloo");
  };
  return (
    <section className="filter-container">
      <label>
        Order
        <select onChange={handleSort}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </label>
    </section>
  );
}
