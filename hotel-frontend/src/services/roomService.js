import API from "../api/axiosClient";

export const getRooms = () => API.get("/rooms");

export const getRoomsByHotel = (hotelId) =>
  API.get(`/rooms/${hotelId}`);

export const createRoom = (data) =>
  API.post("/rooms", data);

export const deleteRoom = (id) =>
  API.delete(`/rooms/${id}`);