import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../api";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((res) => {
      setArticle(res);
      getCommentsByArticleId(article_id).then((res) => {
        setComments(res);
        setIsLoading(false);
      });
    });
  }, [article_id]);

  return isLoading ? (
    <p className="loading-message">...loading</p>
  ) : (
    <>
      <article className="single-article">
        <p className="single-article--topic">{article.topic}</p>
        <h2>{article.title}</h2>
        <h3>By {article.author}</h3>
        <div className="article-list--article-info--interactions">
          <p>
            <span>{article.votes}</span> Votes
          </p>
          <p>
            <span>{article.comment_count}</span> Comments
          </p>
        </div>
        <p className="single-article--body">{article.body}</p>
      </article>
      <section className="single-article--comments">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <p>{comment.body}</p>
                <h4>
                  <span>from</span> {comment.author}
                </h4>
                <button>{comment.votes}</button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
