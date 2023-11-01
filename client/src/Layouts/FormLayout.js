import React from "react";
import { Paper } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const FormLayout = (props) => {

  const location = useLocation();
  const path = location.pathname;

  const paperStyle = {
    padding: 20,
    minHeight: props.height || "70vh",
    width: 300,
    margin: path === '/' ? `0px auto` : `20px auto`,
  };

  const elevation = path === '/' ? 0 : 10;
  return <Paper elevation={elevation} style={paperStyle}>{props.children}</Paper>;
};

export default FormLayout;
