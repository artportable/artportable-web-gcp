import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) => {
  return createStyles({
    containerHeader: {
      backgroundColor: "#FCF7EC",
      height: "220px",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        height: "320px",
      },
    },

    containerWrapper: {
      padding: "20px 20px 20px 20px",
    },

    titleHeader: {
      fontSize: "32px",
      marginBottom: "15px",
      fontWeight: 300,
      alignItems: "center",
      [theme.breakpoints.up("mdPlus")]: {
        width: "50%",
        marginLeft: "95px",
        fontSize: "35px",
      },
    },

    textHeader: {
      fontSize: "14px",
      fontFamily: "Joan",
      [theme.breakpoints.up("md")]: {
        width: "50%",
        marginLeft: "95px",
        fontSize: "16px",
      },
    },

    containerCard: {
      width: "90vw",
      margin: "0 auto",
      marginTop: "30px",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
    },

    wrapperCard: {
      width: "330px",
      backgroundColor: "white",
      margin: "0 auto",
      marginTop: "10px",
      padding: "15px",
    },

    image: {
      width: "300px",
      height: "200px",
    },
    adress: {
      fontSize: "12px",
      fontStyle: "italic",
      fontWeight: 200,
    },
  });
});
