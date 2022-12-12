import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import { format } from "date-fns";
import Filter from "./Filter";
import ErrorPage from "./ErrorPage";
import Dropdown from "react-bootstrap/Dropdown";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj = Object.fromEntries([...searchParams]);

  useEffect(() => {
    setError(false);
    getArticles(paramsObj.topic, paramsObj.sort_by, paramsObj.order)
      .then((result) => {
        setArticles(result.articles);
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      })
      .catch((err) => {
        setError(true);
      });
  }, [searchParams]);

  const resetSearchParams = () => {
    setSearchParams();
  };

  if (error) {
    return <ErrorPage />;
  }

  return isLoading ? (
    <article className="loading-wrapper"></article>
  ) : (
    <>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="open-filter-button">
            Filter Results
          </Dropdown.Toggle>
          {Object.keys(paramsObj).length === 0 ? null : (
            <button onClick={resetSearchParams} id="filter-reset">
              Reset
            </button>
          )}

          <Dropdown.Menu>
            <Filter
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ul className="article-list">
        {articles.map((article) => {
          const dt = new Date(article.created_at);
          const readableDate = format(dt, "E do LLL y");
          return (
            <li key={article.article_id}>
              <p className="article-list--date">Published on {readableDate}</p>
              <h3>
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </h3>
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
                  <p>{article.votes}</p>
                  <p>{article.comment_count}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
