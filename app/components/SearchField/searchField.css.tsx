import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    inputContainer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      height: "38px",
      borderRadius: "20px",
      width: "100px",
      marginTop: "10px",
      margin: "0 auto",
      marginBottom: "5px",

      [theme.breakpoints.up("smPlus")]: {
        marginBottom: "20px",
        width: "500px",
      },
    },
    chip: {},
    selectedChip: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid #a35d5d",
    },
    noTags: {},
    searchIcon: {
      margin: theme.spacing(0, 0.4, 0, 1),
    },
    input: {
      height: "100%",
      width: "100%",
      fontSize: "8px",
      fontWeight: 400,
      fontFamily: "Roboto",
      border: "none",
      autoFocus: "false",
      backgroundColor: "transparent",
      borderBottom: " 1px solid #0000004f",
      "&:focus": {
        border: "none",
      },
      "&:focus-visible": {
        outline: "none",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
    },
    tagsContainer: {},
    categoryTags: {
      display: "flex",
      gap: theme.spacing(1),
      paddingInlineStart: 0,
      fontWeight: 500,
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
