import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginBottom: theme.spacing(4),
      '& > *': {
        marginBottom: theme.spacing(2),
      }
    },
    deleteContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }),
);
