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
        color: "#A70301",
        transition: "color 0.9s ease",
      },
    },
  })
);
