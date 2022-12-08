import { deleteComment } from "../../api";

export default function Comment({ comment, user, setArticleComments }) {
  const handleDelete = () => {
    setArticleComments((currentComments) => {
      currentComments.splice(
        currentComments.findIndex((element) => {
          return element.comment_id === comment.comment_id;
        }),
        1
      );
      return [...currentComments];
    });
    deleteComment(comment.comment_id).then((res) => {
      console.log(res);
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
