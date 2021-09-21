import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { relative } from 'node:path';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: "15px"
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
      fontSize: '2rem',
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    leftButton: {
      display: 'none',
      position: 'absolute',
      left: '-30px',
      top: '74px'
    },
    rightButton: {
      display: 'none',
      position: 'absolute',
      right: '-30px',
      top: '74px'
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
