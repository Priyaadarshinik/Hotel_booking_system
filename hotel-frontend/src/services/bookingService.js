import API from "../api/axiosClient";

export const getBookings = () => API.get("/bookings");

export const createBooking = (data) =>
  API.post("/bookings", data);

export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);