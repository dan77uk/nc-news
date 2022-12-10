export default function Test({
  // setOrder,
  // setSort,
  // setTopic,
  searchParams,
  setSearchParams,
}) {
  const handleTopic = (e) => {
    e.preventDefault();
    searchParams.delete("topic");
    if (e.target.value === "") {
      setSearchParams(searchParams);
      // setTopic();
    } else {
      setSearchParams((prev) => [...prev.entries(), ["topic", e.target.value]]);
      // setTopic(e.target.value);
    }
  };

  const handleSort = (e) => {
    e.preventDefault();
    searchParams.delete("sort_by");
    if (e.target.value === "") {
      setSearchParams(searchParams);
      // setSort();
    } else {
      setSearchParams((prev) => [
        ...prev.entries(),
        ["sort_by", e.target.value],
      ]);
      // setSort(e.target.value);
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    searchParams.delete("order");
    if (e.target.value === "") {
      setSearchParams(searchParams);
      // setOrder();
    } else {
      setSearchParams((prev) => [...prev.entries(), ["order", e.target.value]]);
      // setOrder(e.target.value);
    }
  };

  const reset = () => {
    // setSort();
    // setOrder();
    // setTopic();
    setSearchParams();
  };

  return (
    <div>
      <select onChange={handleTopic}>
        <option value="">All Categories</option>
        <option value="coding">Coding</option>
        <option value="cooking">Cooking</option>
        <option value="football">Football</option>
      </select>

      <select onChange={handleSort}>
        <option value="">Sort by date</option>
        <option value="comment_count">Comment Count</option>
        <option value="author">Author</option>
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
