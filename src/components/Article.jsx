import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticleVote } from "../api";
import Comments from "./comments/Comments";
import Button from "react-bootstrap/Button";

export default function Article({ user }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    getArticleById(article_id).then((res) => {
      setArticle(res);
      setIsLoading(false);
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

  return isLoading ? (
    <p className="loading-message">...loading</p>
  ) : (
    <>
      <article className="single-article">
        <p className="single-article--topic">{article.topic}</p>
        <h2>{article.title}</h2>
        <h3>By {article.author}</h3>
        <div className="article-list--article-info--interactions">
          <p>
            <span>{article.votes}</span> Votes
          </p>
          <p>
            <span>{article.comment_count}</span> Comments
          </p>
        </div>
        <p className="single-article--body">{article.body}</p>
        {!voted ? (
          <div className="single-article--voteButtons">
            <Button variant="primary" onClick={handleVote} value={"up"}>
              Vote Up
            </Button>
            <Button variant="secondary" onClick={handleVote} value={"down"}>
              Vote Down
            </Button>
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
