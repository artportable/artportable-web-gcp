import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      // top: 'auto',
      // bottom: 0
      height: 48,
      backgroundColor: "var(--header-color) !important",
      // boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
      // width: 'calc(100% + 10px)',
      [theme.breakpoints.up("md")]: {
        display: "none !important",
      },
    },
    toolbar: {
      // backgroundColor: "var(--header-color)",
      // boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
      // width: 'calc(100% + 10px)',
      overflow: "hidden", // Prevent hover shadow on buttons to go outside the navbar.
      justifyContent: "space-around",
      color: "black",
      "& button": {
        display: "flex",
        flexFlow: "column nowrap",
        "& > div": {
          fontSize: "9px",
        },
      },
    },
    spacer: {
      height: 48,
      [theme.breakpoints.up("md")]: {
        display: "none !important",
      },
    },
  })
);
