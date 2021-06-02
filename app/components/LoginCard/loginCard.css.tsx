import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    forgotCredentials: {
      marginTop: "15px",
      fontStyle: "italic",
      color: "gray"
    },
    rememberCredentials: {
      marginTop: "35px"
    }
  }),
);
