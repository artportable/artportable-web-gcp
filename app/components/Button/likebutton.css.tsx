import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// Define the type for the props that will be passed to the styles function
interface LikeButtonStylesProps {
  isLiked: boolean;
}

export const styles = makeStyles<Theme, LikeButtonStylesProps>((theme: Theme) =>
  createStyles({
    likeButton: {
      position: "relative",
      "& svg": {
        color: (props) => (props.isLiked ? "#ff8383" : "#ff8383"), // Apply #ff8383 color when not liked (outlined)
        "&:hover": {
          color: "#ff8383",
        },
      },
    },
  })
);
