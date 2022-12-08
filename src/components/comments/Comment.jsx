import { bubble } from "react-burger-menu";
import { getArticleById } from "../../api";

export default function Comment({ comment, user }) {
  const handleDelete = () => {
    console.log("dfkhjsd");
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
          <button onClick={handleDelete}>Delete Comment</button>
        ) : null}
      </div>
    </li>
  );
}
