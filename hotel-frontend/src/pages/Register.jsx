import { useState } from "react";
import { register, login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register(){

 const [form,setForm] = useState({
  username:"",
  email:"",
  password:"",
  phone_no:"",
  role:"USER"
 });

 const navigate = useNavigate();

 const handleChange = (e)=>{
  setForm({
   ...form,
   [e.target.name]: e.target.value
  });
 };

 const handleSubmit = async(e)=>{
  e.preventDefault();

  try{

   await register(form);

   const res = await login({
    username: form.username,
    password: form.password
   });

   localStorage.setItem("token", res.data.token);

   navigate("/dashboard");

  }catch(err){
   alert("Registration failed");
  }
 };

 return(

  <div>

   <h2>Register</h2>

   <form onSubmit={handleSubmit}>

    <input name="username" placeholder="Username" onChange={handleChange}/>

    <input name="email" placeholder="Email" onChange={handleChange}/>

    <input name="phone_no" placeholder="Phone Number" onChange={handleChange}/>

    <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

    <select name="role" onChange={handleChange}>

      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>

    </select>

    <button type="submit">Register</button>

   </form>

   <p>
     Already have an account?
     <Link to="/"> Login here</Link>
   </p>

  </div>

 );
}