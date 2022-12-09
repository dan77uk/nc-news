import { deleteComment } from "../../api";

export default function Comment({
  comment,
  user,
  setArticleComments,
  setDeleteConfirmation,
}) {
  const handleDelete = () => {
    setArticleComments((currentComments) => {
      const newComments = currentComments.reduce((acc, curr) => {
        if (curr.comment_id !== comment.comment_id) {
          acc.push(curr);
        }
        return acc;
      }, []);
      return [...newComments];
    });
    deleteComment(comment.comment_id).then(() => {
      setDeleteConfirmation(true);
    });
  };
  return (
    <li>
      <p className="single-article--comments--comment-body">"{comment.body}"</p>
      <div className="single-article--comments--comment-info">
        <div>
          <h4>
            <span>by</span> {comment.author}
          </h4>
          {comment.author === user ? (
            <button
              className="single-article--comments--delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          ) : null}
        </div>

        <p className="single-article--comments--votes">
          {comment.votes} Recommendations
        </p>
      </div>
    </li>
  );
}
