import API from "../api/axiosClient";

export const getUsers = () => API.get("/users");