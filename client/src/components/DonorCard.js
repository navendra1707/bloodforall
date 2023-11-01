import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "@mui/material";
import React, {useState} from "react";
import emailjs from "@emailjs/browser";
import CallIcon from "@mui/icons-material/Call";
import ReplyIcon from "@mui/icons-material/Reply";

const DonorCard = (props) => {
  const message = `
  Dear ${props.name},

  I hope this message finds you well. We are reaching out to you with an urgent request that could potentially save a life. A patient, ${props.user.name}, is currently in need of a blood donation, and you are one of the nearest potential donors.
  
  ${props.user.name} is currently ${props.distance} away from your location and requires your support in this critical time. Your willingness to donate blood can make a significant difference in their recovery process.
  
  Patient Details:
  
  Name: ${props.user.name}
  Contact Number: ${props.user.phone}
  Email Address: ${props.user.email}

  Your kindness and compassion can make a world of difference, and we thank you in advance for your consideration of this urgent request.
  
  Best regards,
  
  BloodForAll
    `

  const templateParams = {
    from_name:props.user.name,
    name: props.name,
    to_email: props.email,
    message: message,
  };
  const [sent, setSent] = useState(false)

  const sendEmail = () => {
    emailjs
      .send(
        "service_b0yxsj8",
        "template_eo6b8i5",
        templateParams,
        "N0qjUDWadbP1A76IP"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          setSent(true)
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <Card elevation={3}>
      <CardContent sx={{ width: "250px", height: "230px" }}>
        <Typography variant="h5" sx={{ fontSize: "20px" }}>
          {props.name}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d20536" }}>
          {props.bloodGroup}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {props.distance} away.
        </Typography>
        <Button
          startIcon={<CallIcon style={{color:'#fff'}} />}
          sx={{
            margin: 0,
            textTransform: "none",
            bgcolor: "#12a621",
            marginTop: 1,
            "&:hover": {
              bgcolor: "#1fc22f",
            },
            "&:focus": {
              bgcolor: "#18cd2a",
            },
          }}
          fullWidth
        >
          <Link
            href={`tel:${props.phone}`}
            underline="none"
            style={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Call The Donor
          </Link>
        </Button>
        <Button
          startIcon={<ReplyIcon />}
          sx={{
            margin: 0,
            textTransform: "none",
            bgcolor: "#12a621",
            marginTop: 1,
            fontSize: "15px",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              bgcolor: "#1fc22f",
            },
            "&:focus": {
              bgcolor: "#18cd2a",
            },
          }}
          onClick={sendEmail}
          fullWidth
        >
          {!sent ? "Send Request" : "Request Sent"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DonorCard;
