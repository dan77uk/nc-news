import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { useState } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";

export default function App() {
  const [user, setUser] = useState("cooljmessy");
  const [topic, setTopic] = useState("");
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState();

  return (
    <>
      <Header setTopic={setTopic} />
      <main>
        <Filter setOrder={setOrder} setSort={setSort} />
        <Routes>
          <Route path="/" element={<Articles order={order} sort={sort} />} />
          <Route
            path="/articles/:article_id"
            element={<Article user={user} />}
          />
          <Route
            path="/:topic"
            element={<Articles order={order} sort={sort} />}
          />
        </Routes>
      </main>
    </>
  );
}
