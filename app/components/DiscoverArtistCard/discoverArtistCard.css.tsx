import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: "15px"
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px"
    },
    button: {
      height: "30px",
    },
    navButtons: {
      backgroundColor: theme.palette.primary.main,
      width: "28px",
      height: "28px",
    }
  }),
);
