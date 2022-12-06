import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dp-api.cyclic.app",
});

export const getArticles = () => {
  return newsApi.get("/api/articles").then((res) => {
    return res.data.articles;
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
