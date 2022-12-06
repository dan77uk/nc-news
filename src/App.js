import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </main>
  );
}
