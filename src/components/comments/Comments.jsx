import { useEffect, useState } from "react";
import Comment from "./Comment";
import { getCommentsByArticleId } from "../../api";
import CommentModal from "./CommentModal";
import Button from "react-bootstrap/Button";

export default function Comments({ article_id, user }) {
  const [articleComments, setArticleComments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((res) => {
      setArticleComments(res);
    });
  }, [article_id, modalShow]);

  if (successMessage) {
    setTimeout(() => {
      setSuccessMessage(false);
    }, 5000);
  }
  if (deleteConfirmation) {
    setTimeout(() => {
      setDeleteConfirmation(false);
    }, 3000);
  }
  return (
    <>
      {deleteConfirmation ? (
        <div className="confirm-delete">
          <p>Comment deleted</p>
        </div>
      ) : null}
      <section className="single-article--comments">
        {articleComments.length === 0 ? (
          <div className="single-article--comments--title">
            <h3>No comments yet</h3>
          </div>
        ) : (
          <>
            <div className="single-article--comments--title">
              <h3>Comments</h3>
              {user ? (
                <button onClick={() => setModalShow(true)}>
                  Add a comment
                </button>
              ) : (
                <button>Login to comment</button>
              )}
            </div>
            {successMessage ? (
              <p className="single-article--comments--confirm-comment-post">
                You're comment has been successfully posted
              </p>
            ) : null}
            <ul>
              {articleComments.map((comment) => {
                return (
                  <Comment
                    key={comment.comment_id}
                    comment={comment}
                    user={user}
                    setArticleComments={setArticleComments}
                    setDeleteConfirmation={setDeleteConfirmation}
                  />
                );
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
        setComments={setArticleComments}
        onHide={() => setModalShow(false)}
        setSuccessMessage={setSuccessMessage}
      />
      ;
    </>
  );
}
