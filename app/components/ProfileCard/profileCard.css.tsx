import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    secondaryColor: {
      backgroundColor: theme.palette.secondary.main,
    },
    avatar: {
      backgroundColor: "transparent",
      border: `0.15rem solid ${theme.palette.common.white}`,
      width: 120,
      height: 120,
      [theme.breakpoints.up("smPlus")]: {
        width: 90,
        height: 90,
      },
    },
    badgeIcon: {
      backgroundColor: "white",
      borderRadius: "50%",

      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.dark,
      },
    },
    counterBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: "16px",
      "& > *": {
        width: "33.3%",
      },
      "& .MuiButton-label": {
        display: "flex",
        flexDirection: "row",
      },
      "& .MuiTypography-body2": {
        marginRight: "10px",
        fontWeight: 500,
        fontSize: "14px",
      },
      "& .MuiTypography-caption": {
        fontSize: "14px",
      },
    },

    fullName: {
      fontWeight: 600,
    },
    title: {
      lineHeight: 1.5,
      fontWeight: 400,
    },
    username: {
      lineHeight: 1.5,
    },
    noPictureIcon: {
      fontSize: "160px",
      backgroundColor: theme.palette.background.default,
    },
    followersButton: {
      display: "block",
      padding: 0,
    },
    cardContainer: {
      height: "300px",
      [theme.breakpoints.up("smPlus")]: {
        height: "250px",
      },
    },
    uploadArtButton: {
      borderRadius: "30px",
      fontWeight: 400,
      fontFamily: "Roboto",
      fontSize: "16px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "180px",
      height: "40px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },

    profileBox: {
      display: "flex",
      flexDirection: "row",
      padding: "0",
    },
    profileData: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      "& .MuiTypography-body1": {
        fontSize: "14px",
        display: "flex",
        alignItems: "end",
      },
    },
    uploadButtons: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "0 auto",
      marginTop: "30px",
      justifyContent: "center",
      "& a": {},
    },
    hovs: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      maxWidth: "160px",
    },
    rocketButton: {
      marginTop: "12px",
      textTransform: "uppercase",
      width: "100%",
      maxWidth: "400px",
      padding: "8px",
      "& .MuiButton-label": {
        fontSize: "12px",
      },
      backgroundColor: "#E0AC08",
      color: "#fff",
      "&:hover": {
        background: "#f4d880",
      },
    },
    headerButtonRocket: {
      fontFamily: "Gotham",
      fontWeight: 500,
      paddingLeft: "10px",
    },
    rocketIcon: {
      paddingLeft: "4px",
      maxWidth: "20px",
      width: "100%",
    },
    upgradeButton: {
      marginTop: "12px",
      textTransform: "uppercase",
      width: "100%",
      maxWidth: "400px",
      padding: "10px",
      "& .MuiButton-label": {
        fontSize: "12px",
      },
      backgroundColor: "#000000",
      color: "#fff",
      "&:hover": {
        background: "theme.palette.secondary.main",
        color: "#000000",
      },
    },
    headerButtonUpgrade: {
      fontSize: "12px",
      fontWeight: 500,
    },
    buyButtons: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    rocketButtonPremium: {
      marginTop: "12px",
      textTransform: "uppercase",
      width: "100%",
      padding: "8px",
      "& .MuiButton-label": {
        fontSize: "12px",
      },
      backgroundColor: "#E0AC08",
      color: "#fff",
      "&:hover": {
        background: "#f4d880",
      },
    },
    hovsPremium: {},

    [theme.breakpoints.up("sm")]: {
      followersButton: {
        "& .MuiButton-label": {
          justifyContent: "flex-end",
        },
      },
      uploadButtons: {
        alignItems: "center",
        margin: "0 auto",
      },
      uploadArtButton: {
        marginTop: "28px",
        padding: "10px",
      },
      counterBox: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        "& .MuiTypography-body2": {
          fontSize: "14px",
        },
        "& .MuiTypography-caption": {
          fontSize: "14px",
        },
      },
      hovs: {
        maxWidth: "126px",
      },
    },

    [theme.breakpoints.up("smPlus")]: {
      uploadArtButton: {
        marginBottom: 0,
        marginTop: "18px",
        padding: "8px",
      },
      profileBox: {
        width: "100%",
      },
      uploadButtons: {
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
      },
      counterBox: {
        alignItems: "center",
        flexDirection: "row !important",
        width: "100%",
        justifyContent: "space-between",
        "& .MuiTypography-body2": {
          marginRight: "5px",
        },
      },
      followersButton: {
        width: "100%",
        "& .MuiButton-label": {
          justifyContent: "center",
        },
      },
      profileData: {
        marginLeft: "10px",
      },
      locationData: {
        justifyContent: "start",
      },
      noPictureIcon: {
        fontSize: "120px",
        background: "none",
      },
      hovs: {
        maxWidth: "145px",
      },
      headerButtonRocket: {
        fontSize: "12px",
      },
      upgradeButton: {
        padding: "8px",
      },
      rocketButton: {
        padding: "8px",
      },
    },
  })
);
