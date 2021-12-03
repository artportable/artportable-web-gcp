import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
    },
    buttonLabel: {
      color: 'white'
    },
    cardRoot: {
      border: '3px solid #FB7A83',
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
    },
  }),
);
