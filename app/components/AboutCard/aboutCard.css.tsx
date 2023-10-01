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
      alignItems: "center",
      [theme.breakpoints.up('md')]: {}
    },
    imgContainer: {
      width: "300px",
      height: "300px",
      textAlign: 'center',
    },
    profilePicture: {
      display: "flex",
      maxHeight: "100%",
      maxWidth: '100%',
 
    },
    textContainer: {

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up('md')]: {
        alignItems: "flex-start",
      }

    },
    aboutText: {
    
      [theme.breakpoints.up('md')]: {
       
       
      }
      
    },

    aboutTextProfilePic: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up('md')]: {
        flexDirection: "row",
        alignItems: "flex-start"
       
      }
    },

    ChangeProfilePicture: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "10px",
    },
    noProfilePic: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up('md')]: {
        flexDirection: "column",
        alignItems: "flex-start"
       
      }
    },
    bioText: {
     
      [theme.breakpoints.up('md')]: {
   
       
      }
    }
  })
)
