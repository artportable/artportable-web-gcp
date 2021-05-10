import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row"
    },
    avatar: {
      backgroundColor: theme.palette.common.white,
      width: "60px",
      height: "60px",
    },
    text: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "30px"
    },
    username: {
      fontWeight: 600
    }
  }),
);
