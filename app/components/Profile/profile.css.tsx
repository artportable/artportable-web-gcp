import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    followFollowersArtworks: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    counterBox: {
      display: "flex",

      paddingTop: theme.spacing(1),
      "& > *": {
        width: "33.3%",
      },
      [theme.breakpoints.up("smPlus")]: {},
      [theme.breakpoints.up("md")]: {
        alignItems: "center",
      },
    },

    chatFollowWrapper: {
      display: "flex",
      flexDirection: "row",
      marginTop: "10px",
      margin: "4px",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: "0",
        width: "25%",
      },
    },

    modal: {
      position: "absolute" as "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "2px solid #000",
      backgroundColor: "white",
      width: "80%",
      padding: "20px",
      borderRadius: "20px",
      borderColor: "transparent",
      [theme.breakpoints.up("md")]: {
        width: "45%",
      },
    },

    followButton: {
      maxHeight: "27px",
      width: "40%",
      margin: "0 auto",
      marginBottom: "10px",
      marginRight: "6px",
      backgroundColor: "#fadf87",
      border: "1px solid #fadf87",
      color: "black",
      [theme.breakpoints.up("md")]: {
        width: "45%",
      },
      "&:hover": {
        backgroundColor: "#fadf87",
        color: "white",
      },
    },
    following: {
      maxHeight: "27px",
      width: "40%",
      margin: "0 auto",
      marginBottom: "10px",
      backgroundColor: "#49cc90",
      border: "1px solid #49cc90",
      color: "white",
      [theme.breakpoints.up("md")]: {
        width: "45%",
      },
      "&:hover": {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    buyBottom: {
      maxHeight: "27px",
      width: "80%",
      margin: "0 auto",
      marginBottom: "10px",
      backgroundColor: "#49cc90",
      color: "black",
      border: "#49cc90",
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
      "&:hover": {
        backgroundColor: "black",
        color: "white",
        border: "#49cc90",
      },
    },
    fullNameCounter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100% !important",
      [theme.breakpoints.up("smPlus")]: {},
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "flex-end",
      },
    },
    fullName: {
      disaply: "flex",
      textAlign: "center",
      fontWeight: 600,
      fontSize: "25px",
      letterSpacing: "6px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
        textAlign: "left",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "30px",
      },
    },

    headline: {
      disaply: "flex",
      textAlign: "center",
      fontWeight: 400,
      fontSize: "14px",
      letterSpacing: "2px",
      fontStyle: "italic",
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
        textAlign: "left",
        width: "70%",
      },
    },
    expandButton: {
      marginTop: "4px",
      textAlign: "right",
      border: "none",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "8px",
      letterSpacing: "1px",
    },

    readMore: {
      marginTop: "10px",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },

    followersButton: {
      display: "block",
      padding: 0,
    },
    followeesButton: {
      display: "block",
      padding: 0,
    },
    editActions: {
      paddingTop: theme.spacing(0.5),
      gridArea: "actions",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1),
      justifySelf: "flex-end",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: "0",
      },
    },
    editUploadButtons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
      marginBottom: "10px",
      [theme.breakpoints.up("md")]: {
        marginBottom: "0px",
        flexDirection: "column",
      },
    },
    uploadButton: {
      marginTop: "20px",
      backgroundColor: "#FFD700",
      display: "flex",
      margin: "0 auto",
      padding: "7px",

      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      "&:hover": {
        backgroundColor: "#D6A407",
      },
    },
    friends: {
      gridArea: "friends",
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
      marginBottom: "10px",
      [theme.breakpoints.up("smPlus")]: {
        display: "none",
      },
    },
    hovs: {
      "& :hover": {
        backgroundColor: "#D6A407",
      },
      display: "flex",
      justifyContent: "space-evenly",
      [theme.breakpoints.up("smPlus")]: {
        justifyContent: "center",
      },
    },
    upgradeGoldDiv: {
      gridArea: "hej",
      display: "flex",
      justifyContent: "center",
    },
    monthlyArtistButton: {
      marginTop: "4px",
      width: "150px",
      height: "45px",
      backgroundColor: "#E0AC08",
      color: "#fff",
    },
    offersButton: {
      marginRight: "4px",
      marginTop: "4px",
      width: "150px",
      height: "45px",
      backgroundColor: "#000000",
      color: "#fff",
    },
    headerButtonRocket: {
      fontFamily: "Gotham",
      fontWeight: 500,
      paddingLeft: "20px",
      height: "100%",
    },
    headerButtonOffers: {
      fontFamily: "Gotham",
      fontWeight: 500,
      height: "100%",
    },
    rocketIcon: {
      padding: "10px",
      maxWidth: "40px",
      width: "100%",
    },
    modalContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      position: "relative",
    },
    modalOffers: {
      position: "absolute" as "absolute",
      overflowY: "scroll",
      border: "2px solid #000",
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      padding: "20px",
      borderRadius: "20px",
      borderColor: "transparent",
      [theme.breakpoints.up("md")]: {
        width: "50%",
        height: "60%",
      },

      offersButton: {
        backgroundColor: "red",
        margin: "20px",
      },
    },
  })
);
