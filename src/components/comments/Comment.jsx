export default function Comment(comment) {
  return (
    <li>
      <p className="single-article--comments--comment-body">
        {comment.comment.body}
      </p>
      <h4>
        <span>from</span> {comment.comment.author}
      </h4>
      <p className="single-article--comments--votes">
        {comment.comment.votes} Votes
      </p>
    </li>
  );
}
