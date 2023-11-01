import { Avatar, Grid, TextField, Typography, Button } from "@material-ui/core";
import app from "./firebase-config";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch } from "react-redux";
import { setUserId } from "../../slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  FormLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import FormLayout from "../../Layouts/FormLayout";
import { useSelector } from "react-redux";
import { setUser } from "../../slices/authSlice";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import EmailOtp from "./EmailOtp";

const auth = getAuth(app);

const Register = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { location } = useSelector((state) => state.location);

  const [phone, setPhone] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [hasInfection, setHasInfection] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [infectionValue, setInfectionValue] = useState("");
  const [tattoo, setTattoo] = useState(false);
  const [aids, setAids] = useState(false);
  const [child, setChild] = useState(false);

  const [errorText, setErrorText] = useState('');
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
        dispatch(setUserId(user.uid));
        localStorage.setItem('userId',user.uid)
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

  const postData = async (user) => {
    await addDoc(collection(db, "users"), user)
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const user = {
      userId: userId,
      location: location,
      name: name,
      phone: phone,
      email: email,
      password: password,
      bloodGroup: bloodGroup,
      gender: gender,
      dob: age,
      weight: weight,
      lastDonated: date,
      infection: infectionValue,
      hasTattoo: tattoo,
      hasAids: aids,
      hasChildBirth: child,
    };
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    console.log(data.user);
    dispatch(setUser(data.user));
    if (!verify) {
      setErrorText('Please verify Phone number first.');
      return;
    }
    setErrorText("");

    postData(user);
    dispatch(setUser(user))
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
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={{ margin: "10px" }}>Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account.
          </Typography>
          <div id="recaptcha-container"></div>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            type="text"
            label="Name"
            placeholder="Please enter your name"
            required
            fullWidth
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            type="email"
            label="Email ID"
            placeholder="Please enter your email id"
            required
            fullWidth
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <EmailOtp email = {email} />
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ display: "block", margin: "10px 0" }}
            >
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="gender"
              name="gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              style={{ display: "initial" }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
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
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Please enter your password"
            required
            fullWidth
            name="password"
          />
          <TextField
            type="password"
            label="Confirm Password"
            placeholder="Please confirm your password"
            required
            fullWidth
            name="confirmPassword"
          />
          <FormControl fullWidth required>
            <InputLabel id=" blood-label">Blood Group</InputLabel>
            <Select
              labelId="blood-label"
              id="bloodGroup"
              label="Blood Group"
              value={bloodGroup}
              onChange={(e) => {
                setBloodGroup(e.target.value);
              }}
              name="bloodGroup"
              defaultValue=""
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </Select>
          </FormControl>
          <label htmlFor="lastBloodDonated">
            Date of Birth:
          </label>
          <input
            as={TextField}
            type="date"
            id="dob"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            placeholder="Please enter your Date of Birth"
            fullWidth
            name="dob"
            min="1985-01-01"
            max={new Date().toISOString().split("T")[0]}
            style={{
              width: "90%",
              padding: "0.7rem 1.3rem",
              paddingLeft: "0px",
              fontSize: "15px",
              border: "none",
              borderRadius: "0.4rem",
            }}
          />
          <TextField
            type="number"
            label="Weight(in kg)"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            placeholder="Please enter your weight"
            required
            fullWidth
            name="weight"
            style={{ marginBottom: "15px" }}
          />
          <label htmlFor="lastBloodDonated">
            Last date when you donated blood-
          </label>
          <input
            as={TextField}
            type="date"
            id="lastBloodDonated"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            placeholder="Please enter the last date when you donated blood"
            fullWidth
            name="lastBloodDonated"
            min="1985-01-01"
            max={new Date().toISOString().split("T")[0]}
            style={{
              width: "90%",
              padding: "0.7rem 1.3rem",
              paddingLeft: "0px",
              fontSize: "15px",
              border: "none",
              borderRadius: "0.4rem",
            }}
          />
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ display: "block", margin: "10px 0" }}
            >
              Do you have any Viral Infection ?
            </FormLabel>
            <RadioGroup
              aria-labelledby="Infection"
              name="infection"
              style={{ display: "initial" }}
              value={hasInfection === true ? "yes" : "no"}
              onChange={(e) => {
                setHasInfection(e.target.value === "yes" ? true : false);
              }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {hasInfection && (
            <>
              <TextField
                type="text"
                label="Please specify"
                value={infectionValue}
                onChange={(e) => {
                  setInfectionValue(e.target.value);
                }}
                fullWidth
                name="infection"
              />
            </>
          )}
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ display: "block", margin: "10px 0" }}
            >
              Recently had any tattoo ? (in previous 6 months)
            </FormLabel>
            <RadioGroup
              aria-labelledby="Infection"
              name="tattoo"
              value={tattoo ? "yes" : "no"}
              onChange={(e) => {
                setTattoo(e.target.value === "yes" ? true : false);
              }}
              style={{ display: "initial" }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ display: "block", margin: "10px 0" }}
            >
              Have you ever been tested +ve for HIV AIDS ?
            </FormLabel>
            <RadioGroup
              aria-labelledby="Infection"
              name="aids"
              value={aids ? "yes" : "no"}
              onChange={(e) => {
                setAids(e.target.value === "yes" ? true : false);
              }}
              style={{ display: "initial" }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {gender === "female" && (
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ display: "block", margin: "10px 0" }}
              >
                Recently had child birth ? (in previous 9 months)
              </FormLabel>
              <RadioGroup
                aria-labelledby="Infection"
                name="childBirth"
                value={child}
                onChange={(e) => {
                  setChild(e.target.value === "yes" ? true : false);
                }}
                style={{ display: "initial" }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
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
            label="I accept the terms and conditions."
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
            SUBMIT
          </Button>
          {/* </> */}
        </form>

        <Typography>
          Already have an account ?
          <Link to="/login" style={{ textDecoration: "none" }}>
            Sign In
          </Link>
        </Typography>
      </FormLayout>
    </Grid>
  );
};

export default Register;
