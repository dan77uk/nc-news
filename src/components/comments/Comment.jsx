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
      <p className="single-article--comments--comment-body">{comment.body}</p>
      <div>
        <h4>
          <span>from</span> {comment.author}
        </h4>

        <p className="single-article--comments--votes">
          {comment.votes} Recommendations
        </p>
        {comment.author === user ? (
          <button
            className="single-article--comments--delete"
            onClick={handleDelete}
          >
            Delete Comment
          </button>
        ) : null}
      </div>
    </li>
  );
}
