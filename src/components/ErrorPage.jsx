import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="error-container">
      <h2>Something went wrong...</h2>
      <h3>It probably isn't anything serious.</h3>
      <h4>Probably.</h4>
      <p>
        You'd better make your way back to our <Link to="/">Home</Link> just to
        be sure. The problem could be bears. Which is terrifying if you stop to
        think about it.
      </p>
    </section>
  );
}
