import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { useState } from "react";
import Header from "./components/Header";

export default function App() {
  const [user, setUser] = useState("cooljmessy");
  const [topic, setTopic] = useState("");

  return (
    <>
      <Header setTopic={setTopic} />
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
