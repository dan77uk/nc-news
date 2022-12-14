import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dp-api.cyclic.app",
});

export const getArticles = (topic, sort_by, order) => {
  return newsApi
    .get("/api/articles", { params: { topic, sort_by, order } })
    .then((res) => {
      return res.data;
    });
};

export const getTopics = () => {
  return newsApi.get("/api/topics").then((res) => {
    return res.data.topics;
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
  return newsApi.patch(`/api/articles/${id}`, body).then((res) => {
    return res.data.article;
  });
};

export const postComment = (id, user, comment) => {
  const body = {
    username: user,
    body: comment,
  };
  return newsApi.post(`api/articles/${id}/comments`, body).then((res) => {
    return res.data.comment;
  });
};

export const deleteComment = (id) => {
  return newsApi.delete(`/api/comments/${id}`).then((res) => {
    return res.status;
  });
};

export const getUsers = () => {
  return newsApi.get("/api/users").then((res) => {
    return res.data.users;
  });
};
