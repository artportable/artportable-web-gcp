import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { relative } from 'node:path';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: "30px"
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px"
    },
    button: {
      height: "30px",
    },
    navButtons: {
      backgroundColor: theme.palette.primary.main,
      width: "28px",
      height: "28px",
    },
    row: {
      height: '220px',
    },
    rowFlex: {
      display: 'flex',
      gap: theme.spacing(2),
      '& *': {
        flexShrink: '0'
      },
      scrollSnapAlign: 'center'
    },
    scrollContainer: {
      position: 'relative',
    },
    scroll: {
      overflow: 'auto',
      scrollSnapType: 'x mandatory',
      scrollbarColor: 'transparent transparent',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    },
    imagePaper: {
      height: '200px',
      overflow: 'hidden',
      scrollSnapAlign: 'end',
    },
    chevron: {
      fontSize: '3rem',
      borderRadius: '50%',
      backgroundColor: 'var( --background-color)',
      color: theme.palette.common.black,
      border: 'solid #c0bbb7 1px',
      
    },
    leftButton: {
      display: 'none',
      position: 'absolute',
      left: '-44px',
      top: '168px'
    },
    rightButton: {
      display: 'none',
      position: 'absolute',
      right: '-44px',
      top: '168px'
    },
    image:{
      height: '220px'
    },
    [theme.breakpoints.up('smPlus')]: {
      row:{
        height: '420px'
      },
      imagePaper:{
        height: '400px'
      },
      image:{
        height: '400px'
      }
      },
    [theme.breakpoints.up('md')]: {
      leftButton: {
        display: 'initial',
      },
      rightButton: {
        display: 'initial',
      }
    }
  }),
);
