import { Link } from "react-router-dom";

export default function Nav({ user, handleLogout }) {
  return (
    <nav className="main-nav">
      <ul>
        <li id="main-nav--home-link">
          <Link to={`/`}>Home</Link>
        </li>
        <li className="logged-id">
          {user ? null : <Link to={"/login"}>Login</Link>}
        </li>
      </ul>
    </nav>
  );
}
