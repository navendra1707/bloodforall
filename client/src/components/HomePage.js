import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import slogans from "./slogans/slogans";
import { Box, Paper, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AboutCard from "./AboutCard";
import { Stack } from "@mui/system";
import DonorsForFriend from "./DonorsForFriend";
import RecentDonors from "./RecentDonors";
import ChatBot from "./ChatBot";

const HomePage = (props) => {
  const navigate = useNavigate();
  const [donorForFriend, setDonorForFriend] = useState(false)
  const findUser = localStorage.getItem("userId");
  if (!findUser) {
    navigate("/");
  }

  const quote = slogans[Math.floor(Math.random() * 6)];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          margin: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            margin: "1rem",
            fontFamily: "Mukta, sans-serif",
            textAlign: "center",
          }}
        >
          {quote}
        </Typography>
        <Stack
          flexWrap="wrap"
          direction="row"
          gap={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
          width={{xs: '100%', md: '90%' }}
        >
          <AboutCard
            picture="blood_drop"
            title="What We Do?"
            message="We bridge the gap between the donors and the recepients without any intermediate source such as blood banks."
          />
          <AboutCard
            picture="blood_bag"
            title="Immediate Actions"
            message="We provide immediate access to blood donors in case of emergencies."
          />
          <AboutCard
            picture="hospital"
            title="Sending Request"
            message="Send requests to donor through the help of emails using the send request button in the donors page."
          />
          <AboutCard
            picture="call"
            title="Call the Donor"
            message="Directly call the Donors by using the 'Call the Donor' button."
          />
        </Stack>
        <Stack direction='row' gap={1} flexWrap='wrap' alignItems='center' justifyContent='center' sx={{marginTop: '20px'}}>
          <Button
            style={{
              color: "#fff",
              backgroundColor: "#d20536",
              margin: "15px 0",
              fontWeight: "bold",
            }}
            onClick={() => {
              navigate("/donors");
            }}
          >
            Search for donors
          </Button>
          <Button
            style={{
              color: "#fff",
              backgroundColor: "#d20536",
              margin: "15px 0",
              fontWeight: "bold",
            }}
            onClick={() => {
              setDonorForFriend(prev => (!prev))
            }}
          >
            Search donors for a Friend
          </Button>
        </Stack>
        {donorForFriend && <Paper elevation={3} style={{padding: '20px', width: {xs: '280px', md: '700px'}}}>
          <DonorsForFriend />
        </Paper>}
        <RecentDonors />
        <ChatBot />
      </Box>
      
    </>
  );
};

export default HomePage;
