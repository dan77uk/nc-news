import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, patchArticleVote } from "../api";
import Comments from "./comments/Comments";
import { format } from "date-fns";
import ErrorPage from "./ErrorPage";

export default function Article({ user }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    getArticleById(article_id)
      .then((res) => {
        setArticle(res);
        setIsLoading(false);
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

  if (error) {
    return <ErrorPage />;
  }

  return isLoading ? (
    <article className="loading-wrapper">
      <p>... loading</p>
    </article>
  ) : (
    <>
      <article className="single-article">
        <ul className="single-article--breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link to={`/${article.topic}`}>{article.topic}</Link>
          </li>
        </ul>
        <h2>{article.title}</h2>
        <div className="single-article--article-info">
          <p>By {article.author}</p>
          <p className="single-article--article-info--likes">
            {article.votes} Likes
          </p>
          <p>{article.comment_count} Comments</p>
        </div>
        <p className="single-article--body">{article.body}</p>
        {!voted ? (
          <div className="single-article--voteButtons">
            <button onClick={handleVote} value={"up"}>
              Yay?
            </button>
            <button onClick={handleVote} value={"down"}>
              Nay?
            </button>
          </div>
        ) : (
          <p className="single-article--vote-confirmation">
            Thank you for your vote
          </p>
        )}
      </article>

      <Comments article_id={article_id} user={user} />
    </>
  );
}
