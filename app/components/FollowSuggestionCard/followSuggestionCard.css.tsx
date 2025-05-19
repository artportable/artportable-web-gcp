import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    nothing: {
      fontStyle: "italic",
      textAlign: "center",
    },
    flexCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textTransform: "uppercase",
      "& .MuiCardHeader-root": {
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        padding: "16px 28px",
      },
      "& .MuiTypography-subtitle1": {
        fontWeight: 500,
        fontSize: "14px",
        textAlign: "center",
      },
    },
    divInviteButton: {
      display: "flex",
      justifyContent: "center",
    },

    [theme.breakpoints.up("smPlus")]: {
      flexCard: {
        "& .MuiTypography-subtitle1": {
          fontSize: "12px",
        },
      },
    },

    [theme.breakpoints.up("md")]: {
      flexCard: {
        "& .MuiCardHeader-root": {
          padding: "16px 30px 10px",
        },
      },
    },
  })
);
