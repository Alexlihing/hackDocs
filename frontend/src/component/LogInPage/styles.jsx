import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    component_wrapper: {
        backgroundColor: "black",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        height: "312px"
    },
    btn: {
        color: "black",
        backgroundColor: "rgba(255, 196, 0, 0.976)",
        fontWeight: "bold",
        "&:hover": {
            color: "white",
            textDecoration: "none"
          },
        alignSelf: "center"
    }
}))