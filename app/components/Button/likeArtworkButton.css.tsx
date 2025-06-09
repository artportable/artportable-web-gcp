import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
interface LikeButtonStylesProps {
  isLiked: boolean;
}

export const styles = makeStyles<Theme, LikeButtonStylesProps>((theme: Theme) =>
  createStyles({
    likeButtonParent: {
      top: "5px",
      right: "10px",
      fontSize: "0.85rem",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& button": {
        padding: "0px",
        borderRadius: "50%",
        backgroundColor: "transparent",
      },
      "&:hover": {
        "& button": {
          backgroundColor: "transparent",
        },
      },
    },
    likeButton: {
      position: "relative",
      "& svg": {
        color: "#A70301",
        transition: "color 0.9s ease",
        backgroundColor: "transparent",
      },
    },
  })
);
