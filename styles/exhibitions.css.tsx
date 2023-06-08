import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) => {
  return createStyles({
    banner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(0),
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
      },
    },
    headerDiv: {
      flex: "1 0 0", // Fill available space, but don't shrink or grow
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing(4),
      [theme.breakpoints.up("md")]: {
        alignItems: "flex-start",
        marginBottom: 0,
      },
    },
    headerTypo: {
      fontWeight: 600,
      marginBottom: theme.spacing(2),
      color: "var(--secondary-color)",
    },
    subHeaderTypo: {
      marginBottom: theme.spacing(3),
      color: "var(--text-color)",
    },
    welcomeText: {
      marginBottom: theme.spacing(3),
      fontStyle: "italic",
      color: "var(--text-color)",
    },
    image: {
      flex: "1 0 0", // Fill available space, but don't shrink or grow
      objectFit: "cover",
      borderRadius: "1%",
      display: "block",
      alignSelf: "center",
      [theme.breakpoints.up("sm")]: {
        maxWidth: "100%",
      },
      [theme.breakpoints.up("smPlus")]: {
        maxWidth: "50%",
      },
    },
    divider: {
      width: "100%",
      borderTop: "2px solid var(--primary-color)",
      margin: `${theme.spacing(0)}px 0`,
    },
  });
});
