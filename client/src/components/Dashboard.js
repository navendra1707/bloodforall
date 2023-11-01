import React, { useEffect, useState } from "react";
import { db } from "./auth/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Box } from "@mui/system";
import LoadingSpinner from "./auth/LoadingSpinner";
import { Paper, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";
import { IconButton, Input } from "@mui/material";
import { Search } from "@mui/icons-material";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-all-users`, {
        method: 'GET'
      });
      const data = await res.json();

      setShowUsers(data.users);
      setUsers(data.users);
      setLoading(false);
    };
    getUsers();
  }, []);

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
  ];

  const searchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setShowUsers(users.filter(user => user.name.toLowerCase().startsWith(value)));
  };
  console.log(showUsers);

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
    <Box>
      <Box
        elevation={2}
        sx={{
          fontSize: "1.2rem",
          textAlign: "center",
          height: "7vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          margin: "0 auto",
          marginTop: "1rem",
        }}
      >
        <Typography
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            paddingTop: "5px",
          }}
        >
          Dashboard
        </Typography>
        <Paper
          component='form'
          sx={{
            borderRadius: 10,
            border: "1px solid #000",
            pl: 2,
            boxShadow: "none",
            height: "40px",
            mr: { md: 1 },
          }}
        >
          <Input
            disableUnderline
            placeholder='Search...'
            onChange={searchChange}
          />
          <IconButton
            type='submit'
            className='icon-btn'
            sx={{ color: "cornflowerblue" }}
          >
            <Search />
          </IconButton>
        </Paper>
      </Box>
      <Paper
        elevation={3}
        sx={{ width: "90%", margin: "0.5rem auto", borderRadius: "0.5rem" }}
      >
        <TableContainer sx={{ overflow: "hidden", borderRadius: "0.5rem" }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{
                      minWidth: 100,
                      backgroundColor: "#d20536",
                      overflow: "hidden",
                    }}
                  >
                    {
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "15px",
                          inlineSize: "-0.24",
                          color: "#fff",
                        }}
                      >
                        {column.label}
                      </Typography>
                    }
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {showUsers?.map((user, index) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    component={RouterLink}
                    to={user?.userId}
                    key={user?.userId}
                    sx={{
                      textDecoration: "none",
                      backgroundColor: index % 2 === 0 && "#e3eaf6",
                    }}
                  >
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
                          value = "-";
                      }
                      if (column.id === "bloodGroup") {
                        return (
                          <TableCell key={column.label} align='center'>
                            <Box
                              display='block'
                              white-space='nowrap'
                              overflow='hidden'
                              text-overflow='ellipsis'
                              sx={{ fontWeight: 600, color: "#d20536" }}
                            >
                              {user?.bloodGroup}
                            </Box>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.label} align='center'>
                          <Box
                            display='block'
                            white-space='nowrap'
                            overflow='hidden'
                            text-overflow='ellipsis'
                            sx={{ fontWeight: 500 }}
                          >
                            {value}
                          </Box>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;
