//import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {useStyles } from "./styles";

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar_wrapper}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.home}>
          <Link to="/" className={classes.home}>
            HackDocs
          </Link>
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/profile" className={classes.link}>
            Login
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
