import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    profileCoverPhoto: {
      "& .MuiButtonBase-root": {
        justifyContent: "flex-start",
      },
    },

    iconColor: {
      color: "black",
    },
  })
);

export default styles;
