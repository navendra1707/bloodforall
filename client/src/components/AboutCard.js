import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import blood_drop from "./images/blood_drop.png";
import blood_bag from "./images/blood_bag.png";
import hospital from "./images/hospital.png";
import call from "./images/call.jpg";

const AboutCard = (props) => {
  let photo;
  switch (props.picture) {
    case "blood_drop":
      photo = blood_drop;
      break;

    case "blood_bag":
      photo = blood_bag;
      break;

    case "hospital":
      photo = hospital;
      break;

    case "call":
      photo = call
      break;

    default:
      photo = null;
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      elevation={3}
    >
      <CardMedia
        image={photo}
        alt="blood"
        sx={{ width: "100px", height: "100px" }}
      />
      <CardContent sx={{ width: "300px", height: "150px" }}>
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            margin: "1rem",
            fontFamily: "Mukta, sans-serif",
            textAlign: "center",
            fontSize: { xs: "8px", md: "12px" },
          }}
        >
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          style={{ fontSize: { xs: "5px", md: "12px" } }}
        >
          {props.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AboutCard;
