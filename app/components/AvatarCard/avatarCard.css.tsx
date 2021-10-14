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
      margin: '0 10px',
      width: '45px',
    },
    text: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "30px"
    },
    username: {
      fontWeight: 600
    },
    [theme.breakpoints.up('sm')]: {
      emblem: {
        margin: '0 20px',
        width: '60px'
      },
    },
  }),
);
