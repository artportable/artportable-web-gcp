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
    counterBox: {
      display: 'flex',
      justifyContent: 'space-between',
      width: "50%",
      margin: "0 auto",
      paddingTop: theme.spacing(1),
      '& > *': {
        width: '33.3%'
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "50%",
      },
      [theme.breakpoints.up("md")]: {
        width: "10%",
        justifyContent: 'flex-start',
        
      },
    },
    fullName: {
      fontWeight: 600,
      fontSize: "30px",
      letterSpacing: "8px"
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
