import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import { useDispatch } from "react-redux";
import { setLocation } from "./slices/locationSlice";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Donors from "./components/Donors";
import FriendsDonors from "./components/FriendsDonors";
import Dashboard from "./components/Dashboard";
import IndividualUser from "./components/IndividualUser";
import EditDetails from "./components/EditDetails";

const App = () => {
  const dispatch = useDispatch();
  // const {data} = useSelector(state=>state.data)
  // console.log(data)

  navigator.geolocation.getCurrentPosition(function (position) {
    dispatch(setLocation(position.coords));
  });

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}  />
        <Route path="/register" element={<Register />}  />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/donors-for-friend" element={<FriendsDonors />} />
        <Route path="/admin" element={<Dashboard />} /> 
        <Route path="/admin/:userId" element={<IndividualUser />} />
        <Route path="/admin/:userId/edit-details" element={<EditDetails />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
