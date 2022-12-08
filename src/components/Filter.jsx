import React from "react";

export default function Filter({ setOrder, setSort }) {
  const handleOrder = (event) => {
    event.preventDefault();
    setOrder(event.target.value);
  };
  const handleSort = (event) => {
    event.preventDefault();
    if (event.target.value === "default") {
      setSort();
    } else {
      setSort(event.target.value);
    }
  };
  return (
    <section className="filter-container">
      <label>
        Order
        <select onChange={handleOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      <label>
        Sort By
        <select onChange={handleSort}>
          <option value="default">Date</option>
          <option value="author">Author</option>
          <option value="comment_count">Comment Count</option>
        </select>
      </label>
    </section>
  );
}
