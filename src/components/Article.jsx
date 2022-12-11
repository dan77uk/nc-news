import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, patchArticleVote } from "../api";
import Comments from "./comments/Comments";
import { format } from "date-fns";
import ErrorPage from "./ErrorPage";
import { UserContext } from "../context/User";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setError(false);
    getArticleById(article_id)
      .then((res) => {
        setArticle(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setError(true);
      });
  }, [article_id]);

  const handleVote = (event) => {
    let voteValue = 0;
    if (event.target.value === "up") {
      voteValue = 1;
    } else {
      voteValue = -1;
    }
    setArticle((currentArticle) => {
      currentArticle.votes += voteValue;
      return { ...currentArticle };
    });
    setVoted(true);
    patchArticleVote(article_id, voteValue).then((res) => {
      return res;
    });
  };

  let readableDate = "";
  if (!isLoading) {
    const dt = new Date(article.created_at);
    readableDate = format(dt, "HH:MM E do LLL y");
  }

  if (error) {
    return <ErrorPage />;
  }

  return isLoading ? (
    <article className="loading-wrapper"></article>
  ) : (
    <>
      <article className="single-article">
        <ul className="single-article--breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/${article.topic}`}>{article.topic}</Link>
          </li>
        </ul>
        {!isLoading ? (
          <p className="single-article--article-info--date">{readableDate}</p>
        ) : null}
        <h2>{article.title}</h2>
        <div className="single-article--article-info">
          <p>By {article.author}</p>
          <p className="single-article--article-info--likes">
            {article.votes} <span>Recommendations</span>
          </p>
          <p className="single-article--article-info--comments">
            <a href="#comments">
              {article.comment_count} <span>Comments</span>
            </a>
          </p>
        </div>
        <p className="single-article--body">{article.body}</p>

        <div className="single-article--voteButtons">
          {!voted ? (
            <>
              <p>Recommend this article?</p>
              <button
                onClick={handleVote}
                id="single-article--voteButtons--up"
                value={"up"}
              ></button>
              <button
                onClick={handleVote}
                id="single-article--voteButtons--down"
                value={"down"}
              ></button>{" "}
            </>
          ) : (
            <p className="single-article--vote-confirmation">
              Thank you for your vote
            </p>
          )}
        </div>
      </article>

      <Comments article_id={article_id} user={user} />
    </>
  );
}
