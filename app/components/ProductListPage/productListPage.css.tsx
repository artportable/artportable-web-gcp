import { Hidden } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      fontSize: '40px',
      fontWeight: 600,
    },

    container:{
      width: '100%',
      marginBottom: '10px'
    },

    topDescription: {
      marginTop: '10px',
    },

    description: {
      marginTop: '-30px'
    },

    button: {
      marginTop: '20px',
    },
    accordion:{
      backgroundColor: 'var(--background-color)'
    },
    
    [theme.breakpoints.up('md')]:{
      accordionSummary:{
        width: '65%'
      },
    }
  }),
);
