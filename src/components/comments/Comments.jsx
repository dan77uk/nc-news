import { useEffect, useState } from "react";
import Comment from "./Comment";
import { getCommentsByArticleId } from "../../api";
import CommentModal from "./CommentModal";

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
      <section className="single-article--comments" id="comments">
        {articleComments.length === 0 ? (
          <div className="single-article--comments--title">
            <h3>No comments yet</h3>
          </div>
        ) : (
          <>
            <div className="single-article--comments--title">
              <h3>Comments</h3>
              {user ? (
                <>
                  <button
                    id="main-comment-add"
                    onClick={() => setModalShow(true)}
                  >
                    Add a comment
                  </button>
                  <button
                    id="mobile-comment-add"
                    onClick={() => setModalShow(true)}
                  >
                    Add
                  </button>
                </>
              ) : (
                <button id="login-to-comment">
                  Login <span>to comment</span>
                </button>
              )}
            </div>
            {successMessage ? (
              <p className="single-article--comments--confirm-comment-post">
                You're comment has been successfully posted
              </p>
            ) : null}
            {deleteConfirmation ? (
              <p className="single-article--comments--confirm-comment-post">
                Comment deleted
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
    </>
  );
}
