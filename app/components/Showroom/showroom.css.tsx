import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) => {
  return createStyles({
    fullContainer: {
      width: "85%",
      margin: "0 auto",
      marginTop: "30px",
    },
    flexContainer: {
      margin: "0 auto",
      position: "relative",
      width: "100%",
      height: "40vh",

      backgroundImage: `url('/images/showroom.jpg')`,
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      [theme.breakpoints.up("sm")]: {
        width: "100%",
        height: "80vh",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        height: "50vh",
        alignItems: "center",
      },
      [theme.breakpoints.up("md")]: {},
    },

    wrapper: {},

    textContainer: {
      fontWeight: 600,
      color: "white",
      textAlign: "center",
      width: "80%",

      padding: "20px",
      [theme.breakpoints.up("sm")]: {
        width: "80%",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "60%",
      },
      [theme.breakpoints.up("md")]: {},
    },

    cafeWrapper: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#FAF3EE",
      padding: "10px",
      borderRadius: "2px",
    },

    title: {
      marginTop: "10px",
      fontSize: "1.2rem",
      textAlign: "center",
      fontWeight: 600,
      color: "var(--background-color)",

      [theme.breakpoints.up("sm")]: {
        fontSize: "1.8rem",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "center",
      },
    },

    titleUserExhibition: {
      marginTop: "10px",
      fontSize: "1.1rem",

      fontWeight: 600,
      color: "black",

      [theme.breakpoints.up("sm")]: {
        fontSize: "1.4rem",
      },
    },

    news: {
      display: "flex",
      justifyContent: "center",
      fontSize: "1.8rem",
      margin: "20px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "2.4em",
      },
    },

    artist: {
      marginTop: "10px",
      fontSize: "1.2rem",
      textAlign: "center",
      fontWeight: 600,
      color: "var(--text-color)",

      [theme.breakpoints.up("sm")]: {
        fontSize: "1.8rem",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "center",
      },
    },

    exhibitionsWrapperDiv: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "10px",
      gridTemplateRows: "auto",
    },

    artistTwo: {
      marginTop: "10px",
      fontSize: "0.8rem",
      textAlign: "center",
      fontWeight: 300,
      color: "var(--text-color)",

      [theme.breakpoints.up("smPlus")]: {
        fontSize: "1.2rem",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "center",
      },
    },

    description: {
      fontSize: "0.6rem",
      fontWeight: 200,
      lineHeight: "1.38",
      textAlign: "center",
      color: "#faf3ee",
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.0rem",
      },
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.up("mdPlus")]: {},
    },
    welcomeText: {
      fontSize: "10px",
      fontStyle: "italic",
      color: "#faf3ee",
      textAlign: "center",
      [theme.breakpoints.up("mdPlus")]: {
        textAlign: "center",
        fontSize: "14px",
      },
    },
    card: {
      width: "40vw",
      height: "20vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
      [theme.breakpoints.up("mdPlus")]: {
        width: "30vw",
        height: "50vh",
      },
    },
    period: {
      marginTop: "20px",
      fontSize: "24px",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.up("smPlus")]: {
        justifyContent: "flex-start",
      },
    },
    periodArtist: {
      display: "flex",
      flexDirection: "column",
    },

    flexImage: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: "20vh",

      [theme.breakpoints.up("mdPlus")]: {
        height: "20vh",
        justifyContent: "flex-start",
      },
    },

    img: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
      [theme.breakpoints.up("smPlus")]: {
        width: "150px",
        height: "150px",
      },
    },

    imgAndName: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    },
    right: {
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      alignItems: "flex-end",
      height: "50%",
      [theme.breakpoints.up("md")]: {
        marginTop: "25px",
        height: "50%",
      },
    },

    exhibitionsWrapper: {
      display: "flex",
      flexDirection: "row",
      width: "auto",
      justifyContent: "center",
      [theme.breakpoints.up("smPlus")]: {
        display: "flex",
        margin: "50px",
        justifyContent: "center",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
    },
    dateArtist: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      marginLeft: "0px",

      marginTop: "20px",
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        alignItems: "flex-start",
      },
      [theme.breakpoints.up("md")]: {
        width: "50%",
        marginLeft: "70px",
        alignItems: "flex-start",
      },
    },

    image: {
      width: "60%",
      height: "60%",
      marginTop: "0px",
      marginBottom: "0px",
      borderStyle: "solid",
      background: "#F5F5F5",
      borderColor: "#faf3ee",
      borderWidth: "5px",
      [theme.breakpoints.up("smPlus")]: {
        borderWidth: "5px",
      },

      filter: "drop-shadow(3px 8px 8px rgba(0, 0, 0, 0.4))",
      maxWidth: "100%",
    },

    frame: {
      width: "100%",
      height: "100%",
      marginTop: "0px",
      marginBottom: "0px",
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {},
      filter: "drop-shadow(3px 8px 8px rgba(0, 0, 0, 0.4))",
    },
    divider: {
      width: "100%",
      borderTop: "2px solid var(--text-color)",
      marginTop: "60px",
      margin: `${theme.spacing(4)}px 0`,
    },
  });
});
