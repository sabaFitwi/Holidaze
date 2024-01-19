import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import Home from "./pages/UnRegisteredUser/Home";
import Register from "./pages/Register";
import AllVenues from "./pages/AllVenues";
import Layout from "./components/Layout";
import Login from "./pages/Login";

import VenueDescription from "./pages/VenueDescription";
//import VenuePostForm from "./pages/RegisteredUser/CreateVenue";
//import BookingCalendar from "./pages/RegisteredUser/Booking";
import PageNotFound from "./pages/PageNotFound";
import CustomProgressBar from "./components/utils/ProgressBar.jsx";
import Profile from "./pages/Profile";
import CreateVenueForm from "./pages/CreateVenue";

import UpdateBooking from "./pages/Updates/UpdateBooking";
import UpdateVenue from "./pages/Updates/UpdateVenue";
import Tabs from "./components/Ui/Tabs";

function App() {
  return (
    <div>
      <CustomProgressBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="venues" element={<AllVenues />} />
          <Route path="/venue/:id" element={<VenueDescription />} />
          <Route path="create" element={<CreateVenueForm />} />
          <Route path="/update/:id" element={<UpdateVenue />} />
          <Route path="/updatebooking/:id" element={<UpdateBooking />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/profile/mybooking" element={<Tabs defaultTab="mybooking" />} />
          <Route path="/profile/myvenue" element={<Tabs defaultTab="myvenue" />} />
          {/* <Route path="book" element={<BookingCalendar />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
