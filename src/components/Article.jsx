import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleVote,
} from "../api";
import Comments from "./Comments";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((res) => {
      setArticle(res);
      getCommentsByArticleId(article_id).then((res) => {
        setComments(res);
        setIsLoading(false);
      });
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
        <div className="single-article--voteButtons">
          <button onClick={handleVote} value={"up"}>
            Vote Up
          </button>
          <button onClick={handleVote} value={"down"}>
            Vote Down
          </button>
        </div>
      </article>
      <section className="single-article--comments">
        {comments.length === 0 ? (
          <h3>No comments yet</h3>
        ) : (
          <>
            <h3>Comments</h3>
            <ul>
              {comments.map((comment) => {
                return <Comments key={comment.comment_id} comment={comment} />;
              })}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
