import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    zendeskForm: {
      marginTop: theme.spacing(4),
      width: "100%",
    },
    paddingWidth: {
      [theme.breakpoints.up("lg")]: {
        padding: "0 100px 0 100px",
      },
    },
    flexPaper: {
      display: "flex",
      flexDirection: "column",
      ...columnGap(20),
      justifyContent: "center",
      [theme.breakpoints.up("mdPlus")]: {
        flexDirection: "row",
        ...rowGap(20),
      },
    },
    paperLeft: {
      padding: "0 20px",
      width: "100%",
      backgroundColor: "transparent",
      [theme.breakpoints.up("mdPlus")]: {
        width: "100%",
      },
    },
    paperRight: {
      padding: "30px 20px 20px 20px",
      [theme.breakpoints.up("mdPlus")]: {
        height: "50%",
      },
    },
    headerTypo: {
      fontWeight: 600,

      margin: "10px",
      textAlign: "center",
    },
    textBlock: {
      margin: "30px 0 30px 0",
    },
    textBlockWidth: {
      [theme.breakpoints.up("mdPlus")]: {
        width: "70%",
      },
    },
    textBlockRight: {
      margin: "15px 0 15px 0",
    },
    typoBold: {
      fontWeight: 500,
    },
    icon: {
      marginRight: "10px",
      fontSize: "40px",
    },
    iconTextFlex: {
      display: "flex",
      alignItems: "center",
      ...columnGap(20),
    },
    linkText: {
      fontWeight: 500,
      fontSize: "1.1rem",
    },
    bold: {
      fontWeight: 500,
    },
    logo: {
      width: "200px",
      marginBottom: "20px",
    },
  })
);
