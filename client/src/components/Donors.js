import { Stack, Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DonorCard from "./DonorCard";
import Navbar from "./Navbar";
import { db } from "./auth/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import LoadingSpinner from "./auth/LoadingSpinner";
import { Button } from "@material-ui/core";

const Donors = () => {
  const location = {
    lng: 73.8275755,
    lat: 18.4664812
  };
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [distance, setDistance] = useState(5);

  const coordinates = [location.lng, location.lat];

  const bloodDonorPatterns = {
    "O+": ["O+", "O-"],
    "O-": ["O-"],
    "A+": ["A+", "O+", "A-", "O-"],
    "A-": ["A-", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],
    "AB+": ["AB+", "AB-", "O+", "O-", "A+", "A-", "B+", "B-"],
    "AB-": ["AB-", "A-", "B-", "O-"],
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const getUser = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserData(data.user);
      setLoading(false);
    };
    getUser();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-donors`, {
      method: "POST",
      body: JSON.stringify({
        coordinates: coordinates,
        donationArray: bloodDonorPatterns[userData?.bloodGroup],
        distance: distance,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [userData]);

  return (
    <div>
      <Navbar />
      <Typography
        variant="h5"
        style={{
          fontWeight: "bold",
          margin: "1rem",
          fontFamily: "Mukta, sans-serif",
          textAlign: "center",
        }}
      >
        Donors near you
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <Stack
          direction="row"
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          flexWrap={"wrap"}
          sx={{
            margin: "1rem auto",
          }}
        >
          <Typography
            style={{
              fontFamily: "Mukta, sans-serif",
              textAlign: "center",
            }}
          >
            Showing donors in the range of:
          </Typography>
          <TextField
            inputProps={{
              style: {
                width: "20vw",
                height: "1vh",
                color: "#000",
                fontSize: "1.2rem",
              },
            }}
            value={distance}
            onChange={(e) => {
              setDistance(e.target.value)
            }}
            type="number"
          />
          <Typography
            style={{
              fontFamily: "Mukta, sans-serif",
              textAlign: "center",
            }}
          >
            KM
          </Typography>
          <Button
            type="submit"
            style={{
              color: "#fff",
              backgroundColor: "#d20536",
            }}
            variant="contained"
            onClick={() => {
              getUsers()
            }}
          >
            Search
          </Button>
        </Stack>
        {loading ? (
          <Box
            sx={{ minHeight: "100vh" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <LoadingSpinner />
          </Box>
        ) : (
          <Stack
            direction="row"
            gap={2}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            {users?.map((donor) => {
              return (
                <DonorCard
                  key={donor.key}
                  name={donor.name}
                  bloodGroup={donor.bloodGroup}
                  distance={donor.distance}
                  phone={donor.phone}
                  user={userData}
                  email={donor.email}
                />
              );
            })}
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default Donors;
