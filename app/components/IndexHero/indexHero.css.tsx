import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      position: 'absolute',
      background: theme.palette.grey[200],
      height: '760px',
      width: '100vw',
      [theme.breakpoints.up('md')]: {
        height: '440px',
      }
    },
    container: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(5, 0),
      [theme.breakpoints.up('md')]: {
        paddingTop: 0
      }
    },
    flexContainer: {
      position: 'relative',
      display: 'flex',
      gap: theme.spacing(4),
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'nowrap',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      }      
    },
    left: {
      flexBasis: '100%',
      flexGrow: 2,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',   
      gap: theme.spacing(1),
    },
    headline: {
      fontWeight: 400,
      fontFamily: 'LyonDisplay',
      fontSize: '3.1rem'
    },
    description: {
      [theme.breakpoints.up('md')]: {
        marginRight: '10%',
      },
    },
    right: {
      flexBasis: '100%',
      alignItems: 'flex-end',
      [theme.breakpoints.up('md')]: {
        marginTop: '40px',
      },
      
    },
    paintingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      alignItems: 'flex-end',
      gap: theme.spacing(1)
    },
    boosted: {
      display: 'block',
      objectFit: 'contain',
      maxHeight: '300px',
      
    },
    createdBy: {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      margin: theme.spacing(1, 0),
    },
    chipAvatar: {
      marginLeft: '2px',
      borderRadius: '50%'
    },
    chip: {
      backgroundColor: theme.palette.common.white
    },
    signupButtonContainer: {
      marginTop: theme.spacing(1)
    },
    buttonLabel: {
      margin: theme.spacing(0, 2)
    }
  })
);
