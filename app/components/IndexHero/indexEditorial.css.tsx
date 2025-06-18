import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      [theme.breakpoints.up("smPlus")]: {
        height: "100%",
        flexDirection: "row",
      },
      [theme.breakpoints.up("lg")]: {
        height: "100%",
        flexDirection: "row",
      },
      [theme.breakpoints.up("lg")]: {
        height: "100%",
        flexDirection: "row",
      },
    },
    wrapper: {
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        width: "75%%",
      },
      [theme.breakpoints.up("md")]: {
        width: "85%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "100%",
      },
    },

    wrapperGrid: {
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        width: "50%",
      },
    },

    titles: {
      marginBottom: "20px",
      fontSize: "12px",
      [theme.breakpoints.up("smPlus")]: {
        width: "80%",
      },
    },

    title: {
      fontFamily: "Roboto",
      color: "black",
      fontSize: "20px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "2px",
      },
    },
    titleTwo: {
      fontFamily: "Roboto",
      color: "black",
      fontSize: "20px",
      fontWeight: 600,
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "22px",
      },
    },
    titleGrid: {
      fontFamily: "Roboto",
      color: "black",
      fontSize: "12px",
      fontWeight: 600,
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },
    imageText: {
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        width: "250px",
      },
    },
    wrapperTwo: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      width: "100%",
      gap: "10px",
      [theme.breakpoints.up("smPlus")]: {
        gridTemplateColumns: "repeat(2, 1fr)", // Two items per row on larger screens
        width: "100%",
        gap: "0px",
      },
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)", // Two items per row on larger screens
        width: "50%",
        gap: "20px",
      },
    },
  })
);
