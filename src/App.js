import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState("cooljmessy");
  return (
    <main>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article user={user} />} />
      </Routes>
    </main>
  );
}
