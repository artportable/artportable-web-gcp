import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "grid",
      gridAutoRows: "min-content",
      gridTemplateColumns: `${theme.spacing(2)}px calc(100% - ${theme.spacing(
        4
      )}px) ${theme.spacing(2)}px`,
      paddingTop: "calc(35px + var(--header-height))",
      minHeight: "calc(100vh - 141px)",
      paddingBottom: "2rem",
      "& > *": {
        gridColumn: "1/3",
      },
    },

    [theme.breakpoints.up("sm")]: {
      container: {
        gridTemplateColumns: `1fr ${theme.breakpointMainWidths.sm.regular}px 1fr`,
        [theme.breakpoints.up("smPlus")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.smPlus.regular}px 1fr`,
        },
        [theme.breakpoints.up("md")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.md.regular}px 1fr`,
        },
        [theme.breakpoints.up("mdPlus")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.mdPlus.regular}px 1fr`,
        },
        [theme.breakpoints.up("lg")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.lg.regular}px 1fr`,
        },
        [theme.breakpoints.up("lgPlus")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.lgPlus.regular}px 1fr`,
        },
        [theme.breakpoints.up("xl")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.xl.regular}px 1fr`,
        },
      },
      wide: {
        [theme.breakpoints.up("sm")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.sm.wide}px 1fr`,
        },
        [theme.breakpoints.up("smPlus")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.smPlus.wide}px 1fr`,
        },
        [theme.breakpoints.up("md")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.md.wide}px 1fr`,
        },
        [theme.breakpoints.up("mdPlus")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.mdPlus.wide}px 1fr`,
        },
        [theme.breakpoints.up("lg")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.lg.wide}px 1fr`,
        },
        [theme.breakpoints.up("lgPlus")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.lgPlus.wide}px 1fr`,
        },
        [theme.breakpoints.up("xl")]: {
          gridTemplateColumns: `1fr ${theme.breakpointMainWidths.xl.wide}px 1fr`,
        },
      },
    },
    fullWidth: {
      "& > *": {
        gridColumn: "1/4",
      },
    },
    noHeaderPadding: {
      paddingTop: "var(--header-height)",
    },
    paddingForTrialBanner: {
      paddingTop: "calc(25px + var(--header-height))",
    },
    fullWidthBlock: {
      gridColumn: "1/4",
    },
  })
);
