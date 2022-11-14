import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cookieConsentBarContainer: {
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box',
        padding: '15px 50px 20px 40px',
        position: 'fixed',
        width: '100%',
        height: 'auto',
        border: '1px solid rgba(0.5,0,0,0.2)',
        boxShadow: '2px 2px 4px 4px rgba(2, 4, 4, 0.25)',
        zIndex: 999,
          [theme.breakpoints.down('sm')]: {
          display: 'grid',
          justifyContent: 'center',
          alignItem: 'center',
          justifyItems: 'center'
          },

    },
    cookieConsentBarContent: {
        margin: 'auto',
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
        padding: '15px 0px 15px 0px',
        width: '250px',
         [theme.breakpoints.down('md')]: {
          width: '270px',
          padding: '15px 15px 15px 15px'
          },
         [theme.breakpoints.down('smPlus')]: {
          width: '270px',
          padding: '15px 15px 15px 15px'
          },
           [theme.breakpoints.down('sm')]: {
          padding: '15px 15px 15px 15px',
          display: 'grid',
          
          },
    },

    cookieHeader: {
       fontWeight: 450,
       fontSize: '32px',
       display: 'flex',
       padding: '0px 15px 0px 15px',
       [theme.breakpoints.down('md')]: {
            fontWeight: 500,
            padding: '0px 15px 0px 15px',
          },
          [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
            fontWeight: 500,
            padding: '0px 15px 0px 0px',
          },

    },
    cookieText: {
       fontWeight: 325,
       fontSize: '16px',
       padding: '0px 15px 0px 15px',
        [theme.breakpoints.down('md')]: {
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0px 15px 0px 0px',
          },
    },
  }),
);