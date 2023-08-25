import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { max } from "date-fns/esm";
import { rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    pagecontainer: {
      display: "flex",
      flexDirection: "column",
    },
    alphabetcontainer: {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      justifyContent: "space-between",
      right: 8,
      height: "50%",
      alignItems: "center",
    },
    searchBar: {
      marginBottom: "20px",
      left: 30,
      color: "black",
      width: "80%",
      fontSize: "16px",
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        left: 0,
        fontSize: "20px",
      },
    },
    highlight: {
      backgroundColor: "#AC606B",
      color: "#AC606B",
    },
    letter: {
      fontSize: "2rem", // Increased the size slightly
      fontWeight: 700, // Not too bold
      margin: "0.5rem 0",
      color: "#333", // Dark color for visibility
    },
    letterList: {
      fontWeight: 600,
    },
    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
    },
    groupDiv: {
      columns: "1 auto",
      width: "50%",
    },
    artistName: {
      fontSize: "0.975rem",
      marginBottom: "10px",
      transition: "transform 0.3s ease",
      "&:hover": {
        color: "var(--primary-color)",
        transform: "scale(1.075)",
      },
    },

    [theme.breakpoints.up("smPlus")]: {
      groupDiv: {
        columns: "2 auto",
        width: "100%",
      },
      pagecontainer: {
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        flexDirection: "row",
        marginTop: "70px",
      },
      alphabetcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        position: "fixed",
        width: "100%",
        backgroundColor: "#FDF9F7",
        top: "70px",
        height: "var(--header-height, 70px)",
      },
      alphabeticTypo: {
        fontweight: 600,
      },
      artistName: {
        fontSize: "0.925rem",
        marginBottom: "0%",
      },
      [theme.breakpoints.up("md")]: {
        groupDiv: {
          columns: "2 auto",
        },
        [theme.breakpoints.up("mdPlus")]: {
          groupDiv: {
            columns: "3 auto",
          },
          [theme.breakpoints.up("lg")]: {
            groupDiv: {
              columns: "3 auto",
            },
            [theme.breakpoints.up("lgPlus")]: {
              groupDiv: {
                columns: "4 auto",
              },
              [theme.breakpoints.up("xl")]: {
                groupDiv: {
                  columns: "4 auto",
                  width: "100%",
                },
              },
            },
          },
        },
      },
    },
  })
);
