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
      <article>
        <label htmlFor="order">ORDER BY</label>
        <select onChange={handleOrder} id="order">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </article>
      <article>
        <label htmlFor="sort">SORT BY</label>
        <select onChange={handleSort} id="sort">
          <option value="default">Date</option>
          <option value="author">Author</option>
          <option value="comment_count">Comment Count</option>
        </select>
      </article>
    </section>
  );
}
