import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { max } from "date-fns/esm";
import { rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      display: "flex",
      width: "100%",
      height: "520px",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: "var(--header-color)",
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "column-reverse",
        alignItems: "center",
      },
    },

    headline: {
      display: "flex",
      fontFamily: "Abel",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "70px",
      alignItems: "center",
      margin: "10px 30px 10px 100px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "58px",
        width: "300px",
        margin: "40px auto",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "58px",
        width: "300px",
        margin: "40px auto",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "58px",
        width: "300px",
        margin: "40px auto",
      },
    },

    artwork: {
      display: "flex",
      width: "600px",
      height: "450px",
      alignItems: "center",
      margin: "0px 50px 10px 0px",
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        alignItems: "center",
        width: "300px",
        height: "250px",
        margin: "0px auto",
      },
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        alignItems: "center",
        width: "350px",
        height: "350px",
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
        width: "550px",
        height: "450px",
      },
    },

    jobContainer: {
      margin: "150px",
      [theme.breakpoints.down("xs")]: {
        margin: "0px 35px 0px 30px",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "0px 35px 0px 30px",
      },
    },

    upperText: {
      marginBottom: "0px",
      fontSize: "24px",
      fontFamily: "Gotham",
      fontWeight: "bold",
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        alignItems: "center",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        alignItems: "center",
        margin: "10px 0px 10px 0px",
      },
    },

    jobs: {
      margin: "-20px 20px 20px 20px",
    },

    jobName: {
      display: "flex",

      textDecoration: "underline",
      color: "black",
    },

    readMore: {
      margin: "-40px 10px 10px 10px",
    },

    more: {
      textAlign: "right",
      margin: "10px 10px 10px 10px",
    },

    apply: {
      display: "flex",
      flexDirection: "row-reverse",
      margin: "10px 18px 10px 10px",
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        alignItems: "center",
        margin: "0px 18px 0px 0px",
        flexDirection: "row-reverse",
      },
    },

    info: {
      backgroundColor: "var(--header-color)",
      height: "100px",
      margin: "0px 0px 0px 0px",
      padding: "0px 0px 10px 0px",
      alignContent: "center",
      border: "0.5px solid white",
      [theme.breakpoints.down("xs")]: {
        padding: "10px 0px 10px 0px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "20px 0px 10px 0px",
      },
    },
  })
);
