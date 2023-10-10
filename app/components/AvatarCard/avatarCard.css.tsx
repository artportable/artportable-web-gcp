import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row"
    },
    avatar: {
      backgroundColor: theme.palette.common.white,
      width: "60px",
      height: "60px",
    },
    emblem: {

      width: '25px',
  
      height: "50px"
    },
    text: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "0px"
    },
    username: {
      fontWeight: 600,
      letterSpacing: "5px",
      fontSize: "18px"
    },
    [theme.breakpoints.up('smPlus')]: {
      fontSize: "26px",
      emblem: {
        margin: '0 20px',
        width: '60px'
      },
    },
  }),
);