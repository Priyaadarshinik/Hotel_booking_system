import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Reviews from "./pages/Reviews";

export default function AppRoutes(){

 return(

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/hotels" element={<Hotels/>}/>
    <Route path="/bookings" element={<Bookings/>}/>
    <Route path="/payments" element={<Payments/>}/>
    <Route path="/reviews" element={<Reviews/>}/>
    <Route path="/rooms/:hotelId" element={<Rooms/>}/>

   </Routes>

  </BrowserRouter>

 );

}