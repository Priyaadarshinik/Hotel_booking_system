import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import { getPayments } from "../services/paymentService";

export default function Payments(){

 const [payments,setPayments] = useState([]);

 useEffect(()=>{
  loadPayments();
 },[]);

 const loadPayments = async()=>{
  const res = await getPayments();
  setPayments(res.data);
 };

 return(

  <div>

   <Navbar/>

   <h2>Payments</h2>

   <table border="1">

    <thead>
     <tr>
      <th>ID</th>
      <th>Total Price</th>
      <th>Method</th>
      <th>Status</th>
      <th>Date</th>
     </tr>
    </thead>

    <tbody>

    {payments.map(p=>(
     <tr key={p.payment_Id}>

      <td>{p.payment_Id}</td>
      <td>{p.totalPrice}</td>
      <td>{p.paymentMethod}</td>
      <td>{p.paymentStatus}</td>
      <td>{p.paymentDate}</td>

     </tr>
    ))}

    </tbody>

   </table>

  </div>

 );
}