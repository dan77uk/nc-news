import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles } from "../api";
import { format } from "date-fns";
export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  let pageTitle = "All Articles";
  if (topic) {
    pageTitle = topic;
  }

  useEffect(() => {
    getArticles(topic)
      .then((result) => {
        setArticles(result);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, [topic]);

  return isLoading ? (
    <article className="loading-wrapper">
      <p>... loading</p>
    </article>
  ) : (
    <>
      <h3 className="articles-title">{pageTitle}</h3>
      <ul className="article-list">
        {articles.map((article) => {
          const dt = new Date(article.created_at);
          const readableDate = format(dt, "E do LLL y");
          return (
            <li key={article.article_id}>
              <p className="article-list--date">Published on {readableDate}</p>
              <h3>{article.title}</h3>
              <div className="article-list--article-info">
                <p className="article-list--article-info--link">
                  <Link to={`/articles/${article.article_id}`}>
                    Read Article
                  </Link>
                </p>
                <h4>
                  By {article.author} /{" "}
                  <Link to={`/${article.topic}`}>{article.topic}</Link>
                </h4>

                <div className="article-list--article-info--interactions">
                  <p>
                    <span>{article.votes}</span> Likes
                  </p>
                  <p>
                    <span>{article.comment_count}</span> Comments
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
