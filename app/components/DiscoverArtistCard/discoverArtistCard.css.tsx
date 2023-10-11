import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { relative } from 'node:path';
import { rowGap, columnGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: "30px"
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "10px"
    },
    button: {
      height: "25px",
      backgroundColor: "var(--yellow-darker)",
      color: "black",
      "&:hover": {
        transform: "scale(1.095)",
        color: "white",
        backgroundColor: "var(--yellow-darker)"
      },
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
      ...rowGap(8),
      '& *': {
        flexShrink: '0'
      },
      scrollSnapAlign: 'center'
    },
    scrollContainer: {
      position: 'relative',
      display: "flex",
    },
    scroll: {
      overflow: 'auto',
      scrollSnapType: 'none',
      scrollbarColor: 'transparent transparent',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    },
    imagePaper: {
      width: "100%",
      height: '200px',
      overflow: 'hidden',
      scrollSnapAlign: 'end',
      border: "7px solid black",
      padding: "0px 5px 5px 5px",
      
    },
    chevron: {
      fontSize: '2.5rem',
      borderRadius: '50%',
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
     
      
    },
    leftButton: {
      display: 'none',
      position: 'absolute',
      left: '0px',
      top: '120px',
     
    },
    rightButton: {
      display: 'none',
      position: 'absolute',
      right: '0px',
      top: '120px'
    },
    image:{
      height: '220px'
    },
    [theme.breakpoints.up('smPlus')]: {
      row:{
        height: '320px'
      },
      imagePaper:{
        height: '300px'
      },
      image:{
        height: '300px'
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