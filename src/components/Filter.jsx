import { useState, useEffect } from "react";
import { getTopics } from "../api";

export default function Filter({ searchParams, setSearchParams }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopics().then((res) => {
      setTopics(res);
      setIsLoading(false);
    });
  }, []);

  const handleTopic = (e) => {
    e.preventDefault();
    searchParams.delete("topic");
    if (e.target.value === "") {
      setSearchParams(searchParams);
    } else {
      setSearchParams((prev) => [...prev.entries(), ["topic", e.target.value]]);
    }
  };

  const handleSort = (e) => {
    e.preventDefault();
    searchParams.delete("sort_by");
    if (e.target.value === "") {
      setSearchParams(searchParams);
    } else {
      setSearchParams((prev) => [
        ...prev.entries(),
        ["sort_by", e.target.value],
      ]);
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    searchParams.delete("order");
    if (e.target.value === "") {
      setSearchParams(searchParams);
    } else {
      setSearchParams((prev) => [...prev.entries(), ["order", e.target.value]]);
    }
  };

  const reset = () => {
    setSearchParams();
  };

  return (
    <>
      <div>
        <label htmlFor="category">Article Category</label>
        <select onChange={handleTopic} id="category">
          {isLoading ? (
            <option value="">Loading Catagories</option>
          ) : (
            topics.map((topic) => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })
          )}
        </select>
      </div>
      <div>
        <label htmlFor="sort">Sort By</label>
        <select onChange={handleSort} id="sort">
          <option value="">Date (default)</option>
          <option value="comment_count">Comment Count</option>
          <option value="author">Author</option>
        </select>
      </div>
      <div>
        <label htmlFor="order">Order</label>
        <select onChange={handleOrder} id="order">
          <option value="desc">Descending (default)</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
}
