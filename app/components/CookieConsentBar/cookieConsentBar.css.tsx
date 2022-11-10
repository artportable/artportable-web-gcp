import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cookieConsentBarContainer: {
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box',
        padding: '15px 50px 25px',
        position: 'fixed',
        width: '100%',
        height: 'auto',
        border: '1px solid rgba(0.5,0,0,0.2)',
        boxShadow: '2px 2px 4px 4px rgba(2, 4, 4, 0.25)',
        zIndex: 8000,
        [theme.breakpoints.down('sm')]: {
          display: 'grid',
          justifyContent: 'center',
          alignItem: 'center',
          justifyItems: 'center'
          },

    },
    cookieConsentBarContent: {
        margin: '15px',
        '& h2': {
          height: 'auto',
          fontFamily: 'Gotham',
          fontWeight: 'bold',
        }, 
        '& h4': {
          height: 'auto',
          fontFamily: 'Gotham',
          fontWeight: 'normal',
        }, 
        '& a': {
          height: 'auto',
          fontWeight: 'bold',
          textDecoration: 'underline'
        },
  
    },
    cookieConsentBarButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: '1px solid',
        boxShadow: 'none',
        alignItems: 'center',
        cursor: 'pointer',
        margin: '10px',
        borderRadius: '5px',
        padding: '5px 10px',
        width: '250px',
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
           [theme.breakpoints.down('sm')]: {
          display: 'grid',
          justifyContent: 'center',
          alignItem: 'center',
          gap: '8px',
          width: '300px',
          padding: '10px 10px'

          },
    },
      
  }),
);