import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api";
import { UserContext } from "../context/User";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleLogin } = useContext(UserContext);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <article className="loading-wrapper"></article>
  ) : (
    <section className="login-wrapper">
      <h2>Login</h2>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.username}>
              <h3>{user.username}</h3>
              <img src={user.avatar_url} alt={`Image of ${user.username}`} />
              <button onClick={handleLogin} value={user.username}>
                Login
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
