import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { useState } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";

export default function App() {
  const [user, setUser] = useState("cooljmessy");
  const [topic, setTopic] = useState("");
  const [order, setOrder] = useState("");

  return (
    <>
      <Header setTopic={setTopic} />
      <Filter setOrder={setOrder} />
      <main>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route
            path="/articles/:article_id"
            element={<Article user={user} />}
          />
          <Route path="/:topic" element={<Articles />} />
        </Routes>
      </main>
    </>
  );
}
