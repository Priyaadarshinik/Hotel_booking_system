import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const handleSubmit = async(e)=>{
  e.preventDefault();

  try{

   const res = await login({
    username: username,
    password: password
   });

   // store token
   localStorage.setItem("token", res.data.token);

   // TEMP role logic
   if (username === "admin") {
     localStorage.setItem("role", "ADMIN");
   } else {
     localStorage.setItem("role", "USER");
   }

   navigate("/dashboard");

  }catch(err){
   alert("Login failed");
  }
 }

 return(

  <div>

   <h2>Login</h2>

   <form onSubmit={handleSubmit}>

    <input
     placeholder="Username"
     value={username}
     onChange={(e)=>setUsername(e.target.value)}
    />

    <input
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button type="submit">Login</button>

   </form>

   <p>
     Don't have an account? 
     <Link to="/register"> Register here</Link>
   </p>

  </div>

 );
}