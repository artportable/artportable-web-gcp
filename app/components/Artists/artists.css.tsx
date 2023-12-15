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
      marginBottom: "20px",
      color: "black",
      minWidth: "100%",
      fontSize: "14px",
      display: "flex",
      flexDirection: "row",
      overflowX: "auto", // Enable horizontal scrolling
      maxWidth: "100%",
      margin: "0 auto",
      zIndex: 10,
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        left: 0,
        fontSize: "20px",
      },
    },

    searchBar: {
      marginBottom: "20px",
      left: 30,
      color: "black",
      width: "100%",
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
      fontWeight: 700,
      margin: "0.5rem 0",
      color: "#333",

      "&:hover": {
        color: "var(--primary-color)",
        transform: "scale(1.095)",
      },
    },
    letterList: {
      fontWeight: 600,
      margin: "2px",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        margin: "2px",
        alignItems: "center",
      },
    },
    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      minWidth: "100%",
    },
    groupDiv: {
      columns: "1 auto",
      width: "50%",
    },
    artistName: {
      fontSize: "0.975rem",
      color: "var(--dark-hover)",
      "&:hover": {
        color: "var(--black-absolute)",
        fontSize: "1.095rem",
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
        minWidth: "100%",
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
