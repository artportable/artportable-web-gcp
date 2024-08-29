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
        color: (props) => (props.isLiked ? "#ff8383" : "black"), // Conditionally apply color based on isLiked
        "&:hover": {
          color: "#ff8383",
        },
      },
    },
  })
);
