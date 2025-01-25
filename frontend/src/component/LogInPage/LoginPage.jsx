//import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useStyles } from "./styles";
import {
  Avatar,
  CssBaseline,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import NavBar from "../NavBar/NavBar";

const LoginPage = () => {
    const classes = useStyles();
    //const navigate = useNavigate();

    const handleClick = () => {
        //navigate("/auth");
    }

    return (
        <div>
            <NavBar />
            <div className={classes.component_wrapper}> 
                <LockOutlinedIcon />
                <Button
                className={classes.btn}
                onClick={handleClick}
                >
                    Please sign in!
                </Button>
        </div>
        </div>
    );
}

export default LoginPage;