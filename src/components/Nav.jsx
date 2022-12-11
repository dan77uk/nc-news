import { Link } from "react-router-dom";

export default function Nav({ setTopic }) {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
      </ul>
    </nav>
  );
}
