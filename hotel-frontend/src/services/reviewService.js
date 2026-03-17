import API from "../api/axiosClient";

export const getReviews = () => API.get("/reviews");

export const createReview = (data) =>
  API.post("/reviews", data);