import { Avatar, Grid, TextField, Typography, Button } from "@material-ui/core";
import app from "./firebase-config";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch } from "react-redux";
import { setUserId } from "../../slices/authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import FormLayout from "../../Layouts/FormLayout";
import { useSelector } from "react-redux";
import { setUser } from "../../slices/authSlice";
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "./firebase-config";

const auth = getAuth(app);

const Register = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, user } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignInSubmit = () => {
    onCaptchaVerify();
    const phoneNumber = phone;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("OTP Sent Successfully.");
        setVerifyOtp(true);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };

  const onCaptchaVerify = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      },
      auth
    );
  };

  const verifyCode = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        dispatch(setUserId(user.uid));
        localStorage.setItem("userId", user.uid);
        alert("Verification Successfull.");
        setVerify(true);
        // ...
      })
      .catch((error) => {
        alert("Invalid OTP");
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const fetchData = async () => {
    setIsSubmitting(true);
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        userId: userId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (!res.ok) {
      setErrorText("account doesn't exists, please sign up.");
      return;
    } else {
      setErrorText("");
      dispatch(setUser(data.user))
      console.log(user);
    }

    setIsSubmitting(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const q = query(collection(db, "users"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot) {
      const data = querySnapshot.docs.map(u => ({...u.data()}))
      dispatch(setUser(data[0]))
      console.log(user)
      navigate('/home');
      return;
    }

    if (!verify && !querySnapshot) {
      setErrorText("Please verify Mobile Number first");
      return;
    }
    setErrorText("");

    fetchData();
    localStorage.setItem('bloodGroup', user?.bloodGroup)
    navigate('/home');
  };

  if (isSubmitting)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  return (
    <Grid>
      <FormLayout height="80vh">
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#d20536" }}>
            <LockIcon />
          </Avatar>
          <h2 style={{ margin: "10px" }}>Sign In</h2>
          <Typography variant="caption">
            Please fill this form to sign in.
          </Typography>
          <div id="recaptcha-container"></div>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            type="tel"
            label="Phone Number (with +91)"
            placeholder="Please enter your phone number"
            required
            fullWidth
            name="phone"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          {phone.length === 13 && (
            <input
              type="button"
              value="Send OTP"
              onClick={onSignInSubmit}
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
          )}

          {verifyOtp && (
            <input
              as={TextField}
              type="number"
              label="OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              placeholder="Enter OTP"
              // required
              fullWidth
              name="otp"
              style={{
                width: "80%",
                margin: "15px 0",
                padding: "0.7rem 1.3rem",
                border: "none",
                borderRadius: "0.4rem",
              }}
            />
          )}
          {verifyOtp && (
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
          )}
          {errorText && (
            <Typography style={{ fontSize: "15px", color: "red" }}>
              {errorText}
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                name="termCondition"
                sx={{
                  color: "#d20536",
                  "&.Mui-checked": {
                    color: "#d20536",
                  },
                }}
              />
            }
            label="Remember Me"
          />
          <Button
            type="submit"
            style={{
              color: "#fff",
              backgroundColor: "#d20536",
              margin: "15px 0",
            }}
            variant="contained"
            fullWidth
          >
            SIGN IN
          </Button>
          {/* </> */}
        </form>

        <Typography>
          Don't have an account ?
          <Link to="/register" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
      </FormLayout>
    </Grid>
  );
};

export default Register;
