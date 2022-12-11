import { Link } from "react-router-dom";
import { UserContext } from "../context/User";
import { useContext } from "react";

export default function Nav() {
  const { user, handleLogout } = useContext(UserContext);

  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li className="logged-id">
          {user ? (
            <>
              <p>Welcome {user}</p>
              <button onClick={handleLogout} id="logged-id--logout">
                Logout
              </button>
            </>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
