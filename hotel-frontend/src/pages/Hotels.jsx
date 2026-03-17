import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getHotels, createHotel } from "../services/hotelService";

export default function Hotels(){

 const [hotels,setHotels] = useState([]);
 const [showForm,setShowForm] = useState(false);

 const [form,setForm] = useState({
  name:"",
  description:"",
  address:"",
  city:"",
  country:""
 });

 const role = localStorage.getItem("role");
 const navigate = useNavigate();

 useEffect(()=>{
  loadHotels();
 },[]);

 const loadHotels = async()=>{
  const res = await getHotels();
  setHotels(res.data);
 };

 const handleChange = (e)=>{
  setForm({
   ...form,
   [e.target.name]: e.target.value
  });
 };

 const handleSubmit = async(e)=>{
  e.preventDefault();

  const userId = localStorage.getItem("userId");

  const payload = {
   ...form,
   user: { userId }
  };

  try{
   await createHotel(payload);
   setShowForm(false);
   loadHotels();
  }catch(err){
   alert("Failed to create hotel");
  }
 };

 return(

  <div>

   <Navbar/>

   <h2>Hotels</h2>

   {/* ADMIN BUTTON */}
   {role === "ADMIN" && (
     <button onClick={()=>setShowForm(!showForm)}>
       Add Hotel
     </button>
   )}

   {/* FORM */}
   {showForm && (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>

     <input name="name" placeholder="Name" onChange={handleChange}/>
     <input name="description" placeholder="Description" onChange={handleChange}/>
     <input name="address" placeholder="Address" onChange={handleChange}/>
     <input name="city" placeholder="City" onChange={handleChange}/>
     <input name="country" placeholder="Country" onChange={handleChange}/>

     <button type="submit">Create</button>

    </form>
   )}

   {/* HOTEL CARDS */}
   <div style={{
     display: "flex",
     flexWrap: "wrap",
     gap: "20px",
     marginTop: "20px"
   }}>

   {hotels.map(h=>(
    <div
     key={h.hotelId}
     onClick={() => navigate(`/rooms/${h.hotelId}`)}
     style={{
      width: "280px",
      padding: "16px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      background: "#fff",
      cursor: "pointer",
      transition: "0.2s"
     }}
     onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
     onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >

      <h3 style={{ margin: "0 0 8px" }}>
        {h.name}
      </h3>

      <p style={{ margin: "0 0 10px", color: "#666" }}>
        {h.city}
      </p>

      <p style={{ fontSize: "14px", color: "#444" }}>
        {h.description?.slice(0, 80)}...
      </p>

    </div>
   ))}

   </div>

  </div>

 );
}