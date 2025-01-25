import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  form_wrapper: {
    backgroundColor: "black",
    color: "rgba(255, 196, 0, 0.976)",
    height:"95vh"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: { 
    margin: theme.spacing(1),
    backgroundColor: "black",
  },
  submit: {
    margin: theme.spacing(4, 5, 10),
  },
  submit_text: {
    fontWeight: "bold",
  },
  sign_in: {
    fontWeight: "bold",
    marginBottom: "5%",
  },
}));