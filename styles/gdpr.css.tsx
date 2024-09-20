import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    gdprContainer: {
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
      // justifySelf: 'center',
      width: "100%",
      maxWidth: "1080px",

      "& p": {
        marginBottom: theme.spacing(2),
      },
    },
    title: {
      textAlign: "center",
    },
    text: {
      textAlign: "left",
    },
  })
);
