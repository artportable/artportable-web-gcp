import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      backgroundColor: theme.palette.background.default,
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
      backgroundColor: 'rgba(var(--background-color-rgb), 0.3)'
    },
    
    logo: {
      gridArea: 'logo'
    },
    
    navigation: {
      gridArea: 'navigation',
      display: 'flex',
      justifyContent: 'space-between',
      '& *:not(:last-child)': {
        margin: '0 16px 0 0',
      }
    },
    
    login: {
      gridArea: 'login',
      '& *:not(:last-child)': {
          margin: '0 16px'
      }
    },
    
    language: {
      gridArea: 'language',
      color: 'var(--text-color-accent)'
    }
  }),
);