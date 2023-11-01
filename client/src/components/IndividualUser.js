import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { db } from "./auth/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import LoadingSpinner from "./auth/LoadingSpinner";
import { Card, CardHeader, CardContent } from "@mui/material";
import MultipleStopSharpIcon from "@mui/icons-material/MultipleStopSharp";
import { Stack } from "@mui/system";
import TableCell from "./TableCell";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

const IndividualUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation()

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
      label: "Weight",
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
  }, [userId]);

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
        <CardContent style={{textAlign: 'center'}}>
          <Stack direction='row' gap={3} sx={{ width: "80%", margin: '2rem auto' }} alignItems='center' justifyContent='space-between'>
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
                  case "weight":
                    value = `${user?.weight}`;
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
                  case "dob":
                    value = dayjs(new Date(user?.dob)).format("MMMM DD, YYYY");
                    break;
                  case "hasAids":
                    value = user?.hasAids ? 'Yes' : 'No';
                    break;
                  case "hasTattoo":
                    value = user?.hasTattoo ? 'Yes' : 'No' ;
                    break;
                  case "infection":
                    value = user?.infection || 'No Infection';
                    break;
                  case "lastDonated":
                    value = user?.lastDonated ? dayjs(new Date(user?.lastDonated)).format("MMMM DD, YYYY") : 'N/A';
                    break;

                  default:
                    return "";
                }
                return <TableCell label={column.label} value={value} />;
              })}
            </Stack>
          </Stack>
          <Button
            style={{
              color: "#fff",
              backgroundColor: "#d20536",
              margin: "30px auto",
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
            variant="contained"
            onClick={() => {navigate(`${location.pathname}/edit-details`)}}
          >
            Edit Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndividualUser;
