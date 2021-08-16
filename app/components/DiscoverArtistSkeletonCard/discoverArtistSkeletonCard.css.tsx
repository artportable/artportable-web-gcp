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
    avatarContainer: {
      display: "flex",
      flexDirection: "row"
    },
    avatar: {
      backgroundColor: theme.palette.common.white,
      width: "60px",
      height: "60px",
    },
    text: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "30px"
    },
  }),
);
