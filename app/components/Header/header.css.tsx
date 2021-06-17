import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NONAME } from 'node:dns';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      width: 'calc(100% + 10px)',
      backgroundColor: theme.palette.background.default,
      boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
      height: 'var(--header-height, 70px)',
      padding: '0 16px',
      gap: '0 16px',
      alignItems: 'center',
      justifyItems: 'start',
      gridTemplate: (
      '\"logo navigation login language\" auto' +
      '/ auto 1fr auto auto'
      ),
    },
    
    isSignUp: {
      backgroundColor: 'transparent',
      boxShadow: 'none'
    },
    
    logo: {
      gridArea: 'logo'
    },
    
    navigation: {
      gridArea: 'navigation',
      marginLeft: '20px',
    },
    navButton: {
      textTransform: 'none'
    },
    text: {
      fontSize: '18px',
    },
    login: {
      gridArea: 'login',
      '& .MuiButton-root .MuiButton-label': {
          margin: theme.spacing(0, 2)
      },
      '& > *': {
        margin: theme.spacing(0, 1)
      },
      '& > .MuiIconButton-root': {
        padding: theme.spacing(0.5)
      }
    },
    avatar: {
      width: 33,
      height: 33
    },
    language: {
      gridArea: 'language'
    },
    iconButtons: {
      display: 'inline'
    }
  }),
);