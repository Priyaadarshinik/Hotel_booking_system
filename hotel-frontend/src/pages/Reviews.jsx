import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import { getReviews } from "../services/reviewService";

export default function Reviews(){

 const [reviews,setReviews] = useState([]);

 useEffect(()=>{
  loadReviews();
 },[]);

 const loadReviews = async()=>{
  const res = await getReviews();
  setReviews(res.data);
 };

 return(

  <div>

   <Navbar/>

   <h2>Reviews</h2>

   <table border="1">

    <thead>
     <tr>
      <th>ID</th>
      <th>Hotel</th>
      <th>User</th>
      <th>Rating</th>
      <th>Review</th>
      <th>Date</th>
     </tr>
    </thead>

    <tbody>

    {reviews.map(r=>(
     <tr key={r.reviewId}>

      <td>{r.reviewId}</td>
      <td>{r.hotel?.name}</td>
      <td>{r.user?.username}</td>
      <td>{r.ratings}</td>
      <td>{r.review}</td>
      <td>{r.reviewDate}</td>

     </tr>
    ))}

    </tbody>

   </table>

  </div>

 );
}