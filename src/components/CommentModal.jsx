import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { postComment } from "../api";

export default function CommentModal(props) {
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.length < 5) {
      console.log("Cannot be empty");
    } else {
      postComment(props.articleid, props.user, comment).then((res) => {
        props.setComments((currentComments) => {
          return [...currentComments, res];
        });
        props.setShow(false);
      });
    }
  };

  const handleCommentInput = (event) => {
    setComment(event.target.value);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
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
            <Button variant="success" type="submit">
              Submit Comment
            </Button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
