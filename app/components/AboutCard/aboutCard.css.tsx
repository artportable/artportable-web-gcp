import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr', // Single column layout by default
      gap: '2vw',
      marginTop: '6vh',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '2fr 4fr',
        gap: '3vw',
        marginTop: '4vh'
      }
    },
    imgAndTextWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {}
    },
    imgClass: {
      width: '300px',
      heigh: 'auto'
    },
    profilePicture: {
      display: 'flex',
      maxHeight: '100%',
      maxWidth: '100%'
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '300px',
      [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start'
      }
    },

    profilePicBtn: {
      marginTop: '20px',
      color: 'black',
      fontWeight: 'bold',
      padding: '0 15px',
      border: '1px solid black',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#FDF9F7',
      // border: 'none',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'white',
        boxShadow: '5px 5px 10px #e5e6e4'
      }
    },
    aboutTextProfilePic: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'flex-start'
      }
    },

    ChangeProfilePicture: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px'
    },
    noProfilePic: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    bioText: {
      overflowWrap: 'break-word',
      [theme.breakpoints.up('md')]: {
        maxWidth: '35vw'
      }
    }
  })
)
