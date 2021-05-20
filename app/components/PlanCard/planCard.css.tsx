import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      maxWidth: '325px',
      paddingTop: '32px'
    },
    cardRoot: {
      minHeight: '450px',
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
      }
    },
  }),
);
