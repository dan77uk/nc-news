import { useState, useEffect } from "react";
import { getTopics } from "../api";
import { Link } from "react-router-dom";

export default function Nav({ setTopic }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopics().then((res) => {
      setTopics(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/test`}>Test</Link>
        </li>

        {isLoading ? (
          <li>Loading topics</li>
        ) : (
          topics.map((topic) => {
            return (
              <li key={topic.slug} onClick={() => setTopic(topic.slug)}>
                <Link to={`/${topic.slug}`}>{topic.slug}</Link>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
}
