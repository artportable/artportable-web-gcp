import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    inputContainer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: theme.palette.common.white,
      height: "48px",
      border: "1px solid",
      borderRadius: "48px",
      "&:hover": {
        border: "1px solid #a35d5d",
      },
      "&:focus-within": {
        borderWidth: "2px",
        margin: "0 -1px",
      },
    },
    chip: {
      border: "1px solid #a35d5d",
      color: "#a35d5d",
      "&:hover": {
        border: "1px solid #ff8383",
      },
    },
    selectedChip: {
      backgroundColor: "#a35d5d",
      color: "white",
      border: "1px solid #a35d5d",
    },
    noTags: {
      paddingRight: theme.spacing(2.4),
    },
    searchIcon: {
      margin: theme.spacing(0, 0.4, 0, 1),
    },
    input: {
      height: "100%",
      width: "75%",
      fontSize: "12px",
      fontWeight: theme.typography.fontWeightMedium,
      fontFamily: "GT-America-Standard",
      border: "none",
      "&:focus": {
        border: "none",
      },
      "&:focus-visible": {
        outline: "none",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "21px",
      },
    },
    tagsContainer: {
      display: "flex",
      alignItems: "center",
      height: "100%",

      padding: theme.spacing(0, 1),
      borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
      "& ul": {
        margin: 0,
      },
    },
    categoryTags: {
      display: "flex",
      gap: theme.spacing(1),
      paddingInlineStart: 0,
      fontWeight: theme.typography.fontWeightMedium,
      listStyleType: "none",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "& .MuiChip-colorPrimary": {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    selectFormControl: {
      position: "absolute",
      width: "100%",
      top: "1px",
      right: 0,
    },
    selectElement: {
      position: "absolute",
      width: "100%",
      top: 0,
      right: 0,
      "&.MuiInputBase-root:hover::before": {
        border: "none",
      },
      "&.MuiInputBase-root::before": {
        border: "none",
      },
      "&.MuiInputBase-root.MuiFocused::after": {
        border: "none",
      },
      "&.MuiInput-underline.MuiFocused::after": {
        border: "none",
      },
      "&.MuiInput-underline:after": {
        border: "none",
      },
      "& .MuiSelect-select:focus": {
        background: "none",
      },
    },
    moreLiElement: {
      position: "relative",
    },
    moreChip: {
      paddingRight: theme.spacing(1.4),
      border: "transparent",
      borderRadius: "0px",
      color: "#a35d5d",
      [theme.breakpoints.up("md")]: {
        border: "1px solid #ff8383",
        borderRadius: "50px ",
      },
    },
  })
);
