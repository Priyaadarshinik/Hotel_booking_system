import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getBookings, deleteBooking } from "../services/bookingService";

export default function Bookings(){

 const [bookings,setBookings] = useState([]);

 useEffect(()=>{
  loadBookings();
 },[]);

 const loadBookings = async()=>{
  const res = await getBookings();
  setBookings(res.data);
 };

 const removeBooking = async(id)=>{
  await deleteBooking(id);
  loadBookings();
 };

 return(

  <div>

   <Navbar/>

   <h2>Bookings</h2>

   <table border="1">

    <thead>
     <tr>
      <th>ID</th>
      <th>User</th>
      <th>Hotel</th>
      <th>Room</th>
      <th>Status</th>
      <th>Check In</th>
      <th>Check Out</th>
      <th>Action</th>
     </tr>
    </thead>

    <tbody>

    {bookings.map(b=>(
     <tr key={b.bookingId}>

      <td>{b.bookingId}</td>
      <td>{b.user?.username}</td>
      <td>{b.hotel?.name}</td>
      <td>{b.room?.roomNumber}</td>
      <td>{b.bookingStatus}</td>
      <td>{b.checkIn}</td>
      <td>{b.checkOut}</td>

      <td>
       <button onClick={()=>removeBooking(b.bookingId)}>
        Delete
       </button>
      </td>

     </tr>
    ))}

    </tbody>

   </table>

  </div>

 );
}