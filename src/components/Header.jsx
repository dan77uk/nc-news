import Nav from "./Nav";
import { UserContext } from "../context/User";
import { useContext } from "react";

export default function Header() {
  const { user, handleLogout } = useContext(UserContext);

  return (
    <header>
      {user ? (
        <section className="user-header-banner">
          <article>
            <p>Welcome {user}</p>
            <button onClick={handleLogout}>Logout</button>
          </article>
        </section>
      ) : null}
      <section className="header-main">
        <h1>ncNews</h1>
        <Nav user={user} handleLogout={handleLogout} />
      </section>
    </header>
  );
}
