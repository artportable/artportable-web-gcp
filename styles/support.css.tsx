import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    zendeskForm: {
      marginTop: theme.spacing(4)
    },
    flexPaper: {
      display: 'flex',
      justifyContent: 'center'
    },
    paper: {
      padding: '0 20px',
      width: '550px',
    },
    headline: {

      fontWeight: 500,
      marginTop: theme.spacing(4)
    }
  }),
);