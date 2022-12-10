import { React, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Test({ setOrder, setSort, setTopic }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj = Object.fromEntries([...searchParams]);
  const params = Object.values(paramsObj);

  const handleTopic = (e) => {
    e.preventDefault();
    searchParams.delete("topic");
    setSearchParams((prev) => [...prev.entries(), ["topic", e.target.value]]);
    setTopic(e.target.value);
  };

  const handleSort = (e) => {
    e.preventDefault();
    searchParams.delete("sort");
    setSearchParams((prev) => [...prev.entries(), ["sort", e.target.value]]);
    setSort(e.target.value);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    searchParams.delete("order");
    setSearchParams((prev) => [...prev.entries(), ["order", e.target.value]]);
    setOrder(e.target.value);
  };

  const reset = () => {
    setSort();
    setOrder();
    setTopic();
    setSearchParams();
  };

  return (
    <div>
      <select onChange={handleTopic}>
        <option value="">--Category--</option>
        <option value="coding">Coding</option>
        <option value="cooking">Cooking</option>
        <option value="football">Football</option>
      </select>

      <select onChange={handleSort}>
        <option value="">--Sort by--</option>

        <option value="comment_count">Comment Count</option>
        <option value="author">Author</option>
        <option value="date">Date</option>
      </select>

      <select onChange={handleOrder}>
        <option value="">--Order--</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button onClick={reset}>Reset</button>
    </div>
  );
}
