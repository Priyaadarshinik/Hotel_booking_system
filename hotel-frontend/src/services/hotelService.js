import API from "./api";

// GET ALL HOTELS
export const getHotels = () =>
  API.get("/hotels");

// CREATE HOTEL
export const createHotel = (data) =>
  API.post("/hotels", data);

// ✅ GET HOTEL BY ID (THIS FIXES YOUR ERROR)
export const getHotelById = (id) =>
  API.get(`/hotels/${id}`);