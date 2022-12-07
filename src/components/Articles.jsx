import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api";
import { format } from "date-fns";
export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((result) => {
        setArticles(result);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return isLoading ? (
    <p>... loading</p>
  ) : (
    <ul className="article-list">
      {articles.map((article) => {
        const dt = new Date(article.created_at);
        const readableDate = format(dt, "E do LLL y");
        return (
          <li key={article.article_id}>
            <h3>
              {article.title}
              <span>
                <Link to={`/articles/${article.article_id}`}>View Article</Link>
              </span>
            </h3>
            <div className="article-list--article-info">
              <h4>By {article.author}</h4>
              <h5>{article.topic}</h5>
              <div className="article-list--article-info--interactions">
                <p>
                  <span>{article.votes}</span> Votes
                </p>
                <p>
                  <span>{article.comment_count}</span> Comments
                </p>
              </div>
              <p className="article-list--date">Published on {readableDate}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
