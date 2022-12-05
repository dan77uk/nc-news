import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dp-api.cyclic.app",
});

export const getArticles = () => {
  return newsApi.get("/api/articles").then((res) => {
    return res.data.articles;
  });
};
