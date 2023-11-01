import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Box, Input } from "@mui/material";
import { db } from "./auth/firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import LoadingSpinner from "./auth/LoadingSpinner";
import { Card, CardHeader, CardContent } from "@mui/material";
import MultipleStopSharpIcon from "@mui/icons-material/MultipleStopSharp";
import { Stack } from "@mui/system";
import TableCell from "./TableCell";
import dayjs from "dayjs";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

const EditDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [aids, setAids] = useState(user?.hasAids);
  const [tattoo, setTattoo] = useState(false);
  const [lastDonatedDate, setLastDonatedDate] = useState("");
  const [weight, setWeight] = useState("");
  const [infection, setInfection] = useState("");

  const columns = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "bloodGroup",
      label: "Blood Group",
    },
    {
      id: "email",
      label: "Email ID",
    },
    {
      id: "phone",
      label: "Phone Number",
    },
    {
      id: "gender",
      label: "Gender",
    },
    {
      id: "weight",
      label: "Weight (kg)",
    },
    {
      id: "dob",
      label: "Date Of Birth",
    },
    {
      id: "hasAids",
      label: "Has Aids",
    },
    {
      id: "hasTattoo",
      label: "Had Tattoo in previous 6 months",
    },
    {
      id: "infection",
      label: "Infection",
    },
    {
      id: "lastDonated",
      label: "Last Date of Blood Donation",
    },
  ];

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
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
      setUser(data.user)
      setLoading(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    setAids(user?.hasAids);
    setInfection(user?.infection);
    setLastDonatedDate(user?.lastDonated);
    setTattoo(user?.hasTattoo);
    setWeight(user?.weight);
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newFields = {
      hasAids: aids || false,
      infection: infection || "",
      lastDonated: lastDonatedDate || "",
      hasTattoo: tattoo || false,
      weight: weight || "",
    };
    
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-user`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: userId,
        newFields
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    setUser(data.user);

    setLoading(false);
    navigate(`/admin/${userId}`);
  };

  if (loading)
    return (
      <Box
        sx={{ minHeight: "100vh" }}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <LoadingSpinner />
      </Box>
    );

  return (
    <div style={{ width: "95%", margin: "1rem auto" }}>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        <KeyboardBackspaceIcon sx={{ color: "#d20536" }} />
        <Typography sx={{ color: "#d20536" }}>Back</Typography>
      </Button>
      <Card sx={{ width: "100%", height: "90vh" }} elevation={1}>
        <CardHeader
          sx={{ background: "#ece1e4" }}
          title={
            <Box
              gap={2}
              color='#d20536'
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <MultipleStopSharpIcon />
              <Typography fontWeight='bold' fontSize='16px'>
                {userId}
              </Typography>
            </Box>
          }
        />
        <CardContent style={{ textAlign: "center" }}>
          <Stack
            direction='row'
            gap={3}
            sx={{ width: "80%", margin: "2rem auto" }}
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack direction='column' gap={3}>
              {columns.map((column) => {
                let value;
                switch (column.id) {
                  case "name":
                    value = user?.name;
                    break;
                  case "email":
                    value = user?.email;
                    break;
                  case "phone":
                    value = user?.phone;
                    break;
                  case "gender":
                    value = user?.gender;
                    break;
                  case "dob":
                    value = dayjs(new Date(user?.dob)).format("MMMM DD, YYYY");
                    break;
                  default:
                    return "";
                }
                return <TableCell label={column.label} value={value} />;
              })}
            </Stack>
            <Stack direction='column' gap={3}>
              {columns.map((column) => {
                let value;
                switch (column.id) {
                  case "weight":
                    value = (
                      <TextField
                        type='text'
                        value={weight}
                        onChange={(e) => {
                          setWeight(e.target.value);
                        }}
                        name='weight'
                        inputProps={{
                          style: {
                            height: "7px",
                          },
                        }}
                      />
                    );
                    break;
                  case "hasAids":
                    value = (
                      <RadioGroup
                        aria-labelledby='Infection'
                        name='aids'
                        value={aids ? "yes" : "no"}
                        onChange={(e) => {
                          setAids(e.target.value === "yes" ? true : false);
                        }}
                        style={{ display: "initial" }}
                      >
                        <FormControlLabel
                          value='yes'
                          control={<Radio />}
                          label='Yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={<Radio />}
                          label='No'
                        />
                      </RadioGroup>
                    );
                    break;
                  case "hasTattoo":
                    value = (
                      <RadioGroup
                        aria-labelledby='Infection'
                        name='tattoo'
                        value={tattoo ? "yes" : "no"}
                        onChange={(e) => {
                          setTattoo(e.target.value === "yes" ? true : false);
                        }}
                        style={{ display: "initial" }}
                      >
                        <FormControlLabel
                          value='yes'
                          control={<Radio />}
                          label='Yes'
                        />
                        <FormControlLabel
                          value='no'
                          control={<Radio />}
                          label='No'
                        />
                      </RadioGroup>
                    );
                    break;
                  case "infection":
                    value = (
                      <TextField
                        type='text'
                        value={infection}
                        onChange={(e) => {
                          setInfection(e.target.value);
                        }}
                        name='infection'
                        inputProps={{
                          style: {
                            height: "7px",
                          },
                        }}
                      />
                    );
                    break;
                  case "lastDonated":
                    value = (
                      <input
                        as={TextField}
                        type='date'
                        id='lastBloodDonated'
                        value={lastDonatedDate}
                        onChange={(e) => {
                          setLastDonatedDate(e.target.value);
                        }}
                        placeholder='Please enter the last date when you donated blood'
                        fullWidth
                        name='lastBloodDonated'
                        min='1985-01-01'
                        max={new Date().toISOString().split("T")[0]}
                        style={{
                          width: "150px",
                          padding: "0.7rem 1.3rem",
                          paddingLeft: "0px",
                          fontSize: "15px",
                          border: "none",
                          borderRadius: "0.4rem",
                        }}
                      />
                    );
                    break;

                  default:
                    return "";
                }
                return <TableCell label={column.label} value={value} />;
              })}
            </Stack>
          </Stack>
          <Button
            type='submit'
            style={{
              color: "#fff",
              backgroundColor: "#d20536",
              margin: "30px auto",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={onSubmit}
            variant='contained'
          >
            Set Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDetails;
