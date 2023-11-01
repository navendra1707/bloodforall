import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const EmailOtp = (props) => {
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);

  const [randomNumber, setRandomNumber] = useState(Math.floor(1000 + Math.random() * 9000));

  const templateParams = {
    from_name: "BloodForAll",
    name: "BloodForAll",
    to_email: props.email,
    message: `Your OTP for BloodForAll email verification is ${randomNumber}.`,
  };

  const verifyCode = () => {
    if(otp == randomNumber){
        alert("Email Verified Successfully.");
    }else{
        alert("Incorrect OTP")
    }
  }

  const sendOtp = () => {
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
          setSent(true);
          alert("OTP sent.")
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <React.Fragment>
      {props.email && <input
        type="button"
        value="Send OTP"
        onClick={sendOtp}
        style={{
          width: "100%",
          color: "#fff",
          backgroundColor: "#d20536",
          margin: "15px 0",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "0.4rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      />}
      {sent && <React.Fragment>
        <TextField
          type="text"
          label="OTP"
          placeholder="Please enter OTP sent on your mail id"
          required
          fullWidth
          name="emailOtp"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
        <input
          type="button"
          value="Verify"
          onClick={verifyCode}
          style={{
            width: "100%",
            color: "#fff",
            backgroundColor: "#d20536",
            margin: "15px 0",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.4rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        />
      </React.Fragment>}
    </React.Fragment>
  );
};

export default EmailOtp;
