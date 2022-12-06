import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleVote,
} from "../api";
import Comments from "./Comments";
import CommentModal from "./CommentModal";
import Button from "react-bootstrap/Button";

export default function Article({ user }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getArticleById(article_id).then((res) => {
      setArticle(res);
      setIsLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((res) => {
      setComments(res);
    });
  }, [comments]);

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

      <section className="single-article--comments">
        {comments.length === 0 ? (
          <div className="single-article--comments--title">
            <h3>No comments yet</h3>
          </div>
        ) : (
          <>
            <div className="single-article--comments--title">
              <h3>Comments</h3>
              {user ? (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setModalShow(true)}
                >
                  Add a comment
                </Button>
              ) : (
                <button>Login to comment</button>
              )}
            </div>
            <ul>
              {comments.map((comment) => {
                return <Comments key={comment.comment_id} comment={comment} />;
              })}
            </ul>
          </>
        )}
      </section>
      <CommentModal
        user={user}
        articleid={article_id}
        show={modalShow}
        setShow={setModalShow}
        setComments={setComments}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
