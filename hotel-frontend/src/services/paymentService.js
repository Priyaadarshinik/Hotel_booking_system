import API from "../api/axiosClient";

export const getPayments = () => API.get("/payments");

export const createPayment = (data) =>
  API.post("/payments", data);