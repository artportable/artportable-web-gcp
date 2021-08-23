import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      paddingTop: 0,

      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(4),
      }
    },
    cardRoot: {
      boxShadow: '0px 0px 11px 0px rgba(var(--ion-color-primary-rgb),0.75)',
      '& .MuiCardContent-root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiList-root': {
          flexGrow: 1,
        },
        '& a': {
          alignSelf: 'center'
        },
        '& .MuiButton-root': {
          minWidth: '155px'
        }
      },
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(3),
      }
    },
    primaryCard: {
      margin: theme.spacing(0, 0),
    },
    button: {
      margin: 'auto',
      marginTop: theme.spacing(3)
    }
  }),
);
