import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';



export const styles = makeStyles((theme: Theme) =>
  createStyles({
    secondaryColor: {
      backgroundColor: theme.palette.secondary.main
    },
    avatar: {
      backgroundColor: 'transparent',
      border: `0.15rem solid ${theme.palette.common.white}`,
      width: 120,
      height: 120
    },
    badgeIcon: {
      backgroundColor: 'white',
      borderRadius: '50%',
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.dark,
      }
    },
    followFollowersArtworks: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    counterBox: {
      display: 'flex',
     
      paddingTop: theme.spacing(1),
      '& > *': {
        width: '33.3%'
      },
      [theme.breakpoints.up("smPlus")]: {

      },
      [theme.breakpoints.up("md")]: {
        alignItems: "center"
      },
    },

    chatFollowWrapper: {
      display: "flex",
      flexDirection: "row",
      marginTop: "10px",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "flex-end",  
        margin: "0",  
        width: "25%"
      },
    },
    followButton: {
      maxHeight: "27px",
      width: "40%",
      margin: "0 auto",
      marginBottom: "10px",
      backgroundColor: "#fadf87",
      border: "1px solid #fadf87",
      color: "black",
      [theme.breakpoints.up("md")]: {
        width: "45%",
      },
      "&:hover": {
        backgroundColor: "#fadf87",
        color: "white",
      },
    },
    following: {
      maxHeight: "27px",
      width: "40%",
      margin: "0 auto",
      marginBottom: "10px",
      backgroundColor: "#49cc90",
      border: "1px solid #49cc90",
      color: "white",
      [theme.breakpoints.up("md")]: {
        width: "45%",
      },
      "&:hover": {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    chatButton: {
      maxHeight: "27px",
      width: "40%",
      margin: "0 auto",
      marginBottom: "20px",
      backgroundColor: "transparent",
      border: "1px solid black",
      color: "black",
      [theme.breakpoints.up("md")]: {
        width: "40%",
      },
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
    },
    fullNameCounter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between", 
      width: "100% !important",
      [theme.breakpoints.up("smPlus")]: {
        
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "flex-end"
    
      },
    },

    fullName: {
      disaply: "flex",
      textAlign: 'center', // centers text horizontally
      fontWeight: 600,
      fontSize: '25px',
      letterSpacing: '6px',

      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
        textAlign: 'flex-start',
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "30px",
      },
    },


    title: {
      lineHeight: 1.5,
      fontWeight: 400
    },
    username: {
      lineHeight: 1.5,
    },
    noPictureIcon: {
      fontSize: '160px',
      backgroundColor: theme.palette.background.default,
    },
    followersButton: {
      display: 'block',
      padding: 0,
    },
    followeesButton: {
      display: 'block',
      padding: 0,
    }
  }),
);
