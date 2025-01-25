import { Button } from "@material-ui/core";
import { useStyles } from "./styles";
import { Avatar, CssBaseline, Paper, Typography, Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import NavBar from "../NavBar/NavBar";

const LoginPage = () => {
    const classes = useStyles();
    //const { updateAccessToken, updateIdToken, login, firstLogin } = useAuth();
  
    //Requires extra sign in event to get access token
    const accessTokenRetriever = useGoogleLogin({
      onSuccess: (response) => {
        console.log(response);
        //updateAccessToken(response.access_token, response.expires_in);
      },
      onFailure: () => console.log("Login attempt failed"),
    });
  
    //Retrieve, process the JWT ID token + handle user's data
    const handleSignInSuccess = (idToken) => {
      var decoded_claims = jwtDecode(idToken.credential);
      console.log(decoded_claims);
  
      accessTokenRetriever();
  
      //updateIdToken(decoded_claims);
  
      const userID = decoded_claims.sub;
      const userData = {
        name: decoded_claims.name,
        email: decoded_claims.email,

      };
    };
  
    const handleSignInFailure = () => {
      console.log("Login attempt failed");
    };
  
    return (

      <Grid container component="main" className={classes.root}>
        <NavBar />
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
