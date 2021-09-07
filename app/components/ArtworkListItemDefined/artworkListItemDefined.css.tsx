import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      cursor: 'pointer',
      display: 'inline-block'
    },
    imageContainer: {
      borderRadius: '2px',
      overflow: 'hidden',
      textAlign: 'center',
      '& img': {
        display: 'block'
      }
    },
    titleAndLike: {
      display: 'flex',
      height: '30px',
      marginTop: theme.spacing(0.4),
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.h6.fontSize
    },
    likeInline: {
      display: 'inline-block',
      float: 'right',
      height: '30px',
    },
    likeContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary
    },
    title: {
      flexGrow: 1,
      fontSize: '0.95rem',
      width: 0,
      padding: theme.spacing(0.4, 0, 0, 0),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    likeCounter: {
      padding: theme.spacing(0.3, 0, 0, 0)
    },
    likeButton: {
      padding: theme.spacing(0.4, 0, 0, 1),
      fontSize: '0.5rem',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    deleteGrid: {
      position: "relative"
    },
    deleteButton: {
      margin: theme.spacing(0.5),
      padding: 0,
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1)
    }
  }),
);