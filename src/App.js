import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { useState } from "react";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState("cooljmessy");

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Articles />} />
          <Route
            path="/articles/:article_id"
            element={<Article user={user} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}
