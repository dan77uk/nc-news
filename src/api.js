import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dp-api.cyclic.app",
});

export const getArticles = (topic, author) => {
  return newsApi
    .get("/api/articles", { params: { topic, author } })
    .then((res) => {
      return res.data.articles;
    });
};

export const getTopics = () => {
  return newsApi
    .get("/api/topics")
    .then((res) => {
      return res.data.topics;
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getArticleById = (id) => {
  return newsApi.get(`/api/articles/${id}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsByArticleId = (id) => {
  return newsApi.get(`/api/articles/${id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchArticleVote = (id, vote) => {
  const body = {
    inc_votes: vote,
  };
  return newsApi
    .patch(`/api/articles/${id}`, body)
    .then((res) => {
      return res.data.article;
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const postComment = (id, user, comment) => {
  const body = {
    username: user,
    body: comment,
  };
  return newsApi
    .post(`api/articles/${id}/comments`, body)
    .then((res) => {
      return res.data.comment;
    })
    .catch((err) => {
      console.log(err.response);
    });
};
