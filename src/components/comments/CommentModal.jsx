import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { postComment } from "../../api";

export default function CommentModal(props) {
  const [comment, setComment] = useState("");
  const [emptyWarning, setEmptyWarning] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(props.articleid, props.user, comment).then((res) => {
      props.setComments((currentComments) => {
        return [...currentComments, res];
      });
      props.setShow(false);
      props.setSuccessMessage(true);
    });
  };

  const handleCommentInput = (event) => {
    setComment(event.target.value);
    if (comment.length > 15) {
      setEmptyWarning(false);
    } else {
      setEmptyWarning(true);
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add your comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="commentForm">
          <form onSubmit={handleSubmit}>
            <textarea onChange={handleCommentInput}></textarea>
            {!emptyWarning ? (
              <button type="submit">Submit Comment</button>
            ) : (
              <p>Please enter a comment of longer than 15 characters.</p>
            )}
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
