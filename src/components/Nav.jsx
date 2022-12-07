import { useState, useEffect } from "react";
import { getTopics } from "../api";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export default function Nav({ setTopic }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState();

  useEffect(() => {
    getTopics().then((res) => {
      setTopics(res);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return width < 700 ? (
    <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
      <Link to={`/`}>Home</Link>
      {topics.map((topic) => {
        return (
          <Link
            key={topic.slug}
            to={`/${topic.slug}`}
            onClick={() => setTopic(topic.slug)}
          >
            {topic.slug}
          </Link>
        );
      })}
    </Menu>
  ) : (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>

        {topics.map((topic) => {
          return (
            <li key={topic.slug} onClick={() => setTopic(topic.slug)}>
              <Link to={`/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
