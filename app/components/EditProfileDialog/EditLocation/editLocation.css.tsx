import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    selectInfo: {
      MozAppearance: "none",
      WebkitAppearance: "none",
      appearance: "none",
      height: "35px",
      fontWeight: "lighter",
      width: "100%",
      border: "none",
      borderBottom: "1px solid gray",
      backgroundImage:
        "linear-gradient(45deg, transparent 50%, #333 50%), linear-gradient(135deg, #333 50%, transparent 50%)",
      backgroundPosition:
        "calc(100% - 18px) calc(1em + 2px), calc(100% - 13px) calc(1em + 2px)",
      backgroundSize: "5px 5px",
      backgroundRepeat: "no-repeat",
      color: "#8d8d8d",
      fontFamily: "inherit",
      fontSize: "14px",
      backgroundColor: "transparent",
      background: "transparent",
      "&:focus": {
        outline: "none",
        borderColor: "transparent",
        boxShadow: "0 0 0 0.2rem rgba(38,143,255,.25)",
      },
      "& option": {
        MozAppearance: "none",
        WebkitAppearance: "none",
        appearance: "none",
        height: "30px",
        padding: "5px",
        width: "100px",
        border: "none",
        background: "transparent",
        color: "#000000de",

        fontFamily: "inherit",
      },
    },

    optionStyle: {},
  })
);
