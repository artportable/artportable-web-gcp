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
      alignItems: "flex-end",
      marginBottom: "10px",
      justifyContent:'center'
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
      justifyContent:'center',
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