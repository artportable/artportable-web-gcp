import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    imgClass: {
      width: "300px",
      heigh: "auto",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "300px",
      [theme.breakpoints.up("md")]: {
        alignItems: "flex-start",
      },
    },
    profilePicBtn: {
      marginTop: "20px",
      color: "black",
      fontWeight: "bold",
      padding: "0 15px",
      border: "1px solid black",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#FDF9F7",
      // border: 'none',
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        boxShadow: "5px 5px 10px #e5e6e4",
      },
    },
    aboutTextProfilePic: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-around",
      },
    },
    bioContainer: {
      width: "100%",

      [theme.breakpoints.up("md")]: {
        marginLeft: "10px",
      },
    },

    ChangeProfilePicture: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "10px",
    },
    noProfilePic: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    noPicBox: {
      display: "flex",
      justifyContent: "center",
      margin: "10px",
      border: "1px solid gr",
      width: "200px",
      height: "200px",
      borderRadius: "20px",
      textAlign: "center",
      alignItems: "center",
      boxShadow: "5px 5px 10px #e5e6e4",
      fontSize: "15px",
    },
    bioText: {
      display: "inline-block",
      overflowWrap: "break-word",
      wordBreak: "break-word",
      [theme.breakpoints.up("md")]: {
        maxWidth: "35vw",
      },
    },
  })
);
