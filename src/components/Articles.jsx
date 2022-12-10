import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import { format } from "date-fns";
import Filter from "./Filter";
import Test from "./Test";
import ErrorPage from "./ErrorPage";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [order, setOrder] = useState("desc");
  // const [sort, setSort] = useState();
  // const [topic, setTopic] = useState();
  const [error, setError] = useState(false);
  // const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj = Object.fromEntries([...searchParams]);
  // const params = Object.values(paramsObj);

  // let pageTitle = "All";
  // if (topic) {
  //   pageTitle = topic;
  // }

  useEffect(() => {
    setError(false);
    getArticles(paramsObj.topic, paramsObj.sort_by, paramsObj.order)
      // getArticles(topic, sort, order)
      .then((result) => {
        setArticles(result);
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      })
      .catch((err) => {
        setError(true);
      });
  }, [searchParams]);

  if (error) {
    return <ErrorPage />;
  }

  return isLoading ? (
    <article className="loading-wrapper"></article>
  ) : (
    <>
      <div className="articles-title-container">
        {/* <h3 className="articles-title">{pageTitle} Articles</h3> */}
        {/* <Filter setOrder={setOrder} setSort={setSort} /> */}
        <Test
          // setOrder={setOrder}
          // setSort={setSort}
          // setTopic={setTopic}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

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
