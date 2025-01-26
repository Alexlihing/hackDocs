import { Button } from "@material-ui/core";
import { useStyles } from "./styles";
import { Avatar, CssBaseline, Paper, Typography, Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const accessTokenRetriever = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
    },
    onFailure: () => console.log("Login attempt failed"),
  });

  const handleSignInSuccess = async (idToken) => {
    try {
      const decoded_claims = jwtDecode(idToken.credential);
      console.log("Decoded Claims:", decoded_claims);

      // Retrieve additional access token if needed
      accessTokenRetriever();

      const userData = {
        id: decoded_claims.sub,
        name: decoded_claims.name,
        email: decoded_claims.email,
      };

      const response = await fetch("http://localhost:3011/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User data posted successfully");
        navigate("/"); // Redirect to home page after successful login
      } else {
        console.error("Failed to post user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error handling sign-in success:", error);
    }
  };

  const handleSignInFailure = () => {
    console.log("Login attempt failed");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        className={classes.form_wrapper}
        component={Paper}
        elevation={6}
        square
        style={{ width: "150vh" }}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.sign_in}>
            Sign in
          </Typography>
          <GoogleLogin
            clientId="752242068993-rnj7qsj5rbqo1ogkhj6vm9b710jss3se.apps.googleusercontent.com"
            buttonText="Sign in with Google account"
            onSuccess={handleSignInSuccess}
            onFailure={handleSignInFailure}
            size="large"
            shape="rectangle"
            theme="filled_blue"
            logo_alignment="left"
            className={classes.submit}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
