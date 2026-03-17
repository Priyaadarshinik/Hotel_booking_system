import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getRoomsByHotel, createRoom } from "../services/roomService";
import { getHotelById } from "../services/hotelService";
import { createBooking } from "../services/bookingService";

export default function Rooms(){

 const { hotelId } = useParams();

 const [rooms,setRooms] = useState([]);
 const [hotel,setHotel] = useState(null);
 const [showForm,setShowForm] = useState(false);

 const [form,setForm] = useState({
  roomNumber:"",
  roomType:"",
  maxGuest:"",
  price:"",
  availabilityStatus:"AVAILABLE"
 });

 const role = localStorage.getItem("role");

 useEffect(()=>{
  loadData();
 },[hotelId]);

 const loadData = async()=>{
  try{
    const roomRes = await getRoomsByHotel(hotelId);
    const hotelRes = await getHotelById(hotelId);

    setRooms(roomRes.data);
    setHotel(hotelRes.data);

  }catch(err){
    console.error(err);
  }
 };

 const handleChange = (e)=>{
  setForm({
   ...form,
   [e.target.name]: e.target.value
  });
 };

 // ✅ ADD ROOM (ADMIN)
 const handleAddRoom = async(e)=>{
  e.preventDefault();

  const payload = {
   ...form,
   hotel: { hotelId }
  };

  try{
    await createRoom(payload);
    setShowForm(false);
    loadData();
  }catch(err){
    alert("Failed to create room");
  }
 };

 // ✅ BOOK ROOM
 const handleBook = async(roomId)=>{
  try{
    await createBooking({
      room: { roomId },
      hotel: { hotelId }
    });

    alert("Room booked successfully");

  }catch(err){
    alert("Booking failed");
  }
 };

 // 🔒 Prevent crash before data loads
 if (!hotel) {
  return <div>Loading...</div>;
 }

 return(

  <div>

   <Navbar/>

   <h2>Rooms - {hotel.name}</h2>

   {/* ADMIN BUTTON */}
   {role === "ADMIN" && (
     <button onClick={()=>setShowForm(!showForm)}>
       Add Room
     </button>
   )}

   {/* FORM */}
   {showForm && (
    <form onSubmit={handleAddRoom} style={{ marginTop: "10px" }}>

     <input
      name="roomNumber"
      placeholder="Room Number"
      onChange={handleChange}
     />

     <input
      name="roomType"
      placeholder="Room Type"
      onChange={handleChange}
     />

     <input
      name="maxGuest"
      placeholder="Max Guests"
      type="number"
      onChange={handleChange}
     />

     <input
      name="price"
      placeholder="Price"
      type="number"
      onChange={handleChange}
     />

     <select name="availabilityStatus" onChange={handleChange}>
       <option value="AVAILABLE">AVAILABLE</option>
       <option value="BOOKED">BOOKED</option>
     </select>

     <button type="submit">Create Room</button>

    </form>
   )}

   {/* ROOM CARDS */}
   <div style={{
     display: "flex",
     flexWrap: "wrap",
     gap: "20px",
     marginTop: "20px"
   }}>

   {rooms.map(r=>(
    <div
     key={r.roomId}
     style={{
      width: "280px",
      padding: "16px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      background: r.availabilityStatus === "AVAILABLE" ? "#fff" : "#f8f8f8"
     }}
    >

      <h3 style={{ margin: "0 0 8px" }}>
        Room {r.roomNumber}
      </h3>

      <p style={{ margin: "0 0 6px", color: "#666" }}>
        {r.roomType}
      </p>

      <p style={{ margin: "0 0 6px" }}>
        👥 Max Guests: {r.maxGuest}
      </p>

      <p style={{ margin: "0 0 6px" }}>
        💰 ₹{r.price}
      </p>

      <p style={{
        margin: "0 0 10px",
        color: r.availabilityStatus === "AVAILABLE" ? "green" : "red",
        fontWeight: "bold"
      }}>
        {r.availabilityStatus}
      </p>

      {/* ACTION */}
      {r.availabilityStatus === "AVAILABLE" ? (
        <button onClick={()=>handleBook(r.roomId)}>
          Book Room
        </button>
      ) : (
        <button disabled style={{ background: "#ccc" }}>
          Not Available
        </button>
      )}

    </div>
   ))}

   </div>

  </div>

 );
}