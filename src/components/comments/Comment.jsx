import { bubble } from "react-burger-menu";
import { getArticleById } from "../../api";

export default function Comment(comment) {
  return (
    <li>
      <p className="single-article--comments--comment-body">
        {comment.comment.body}
      </p>
      <div>
        <h4>
          <span>from</span> {comment.comment.author}
        </h4>

        <p className="single-article--comments--votes">
          {comment.comment.votes} Recommendations
        </p>
      </div>
    </li>
  );
}
