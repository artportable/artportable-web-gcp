import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      cursor: 'pointer',
      display: 'inline-block'
    },
    imageContainer: {
      borderRadius: '2px',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
      '& img': {
        display: 'block'
      },
      '&:hover > div': {
        visibility: 'visible'
      }
    },
    editOverlay: {
      position: 'absolute',
      top: 0,
      visibility: 'hidden',
      '@media (hover: none)': {
        visibility: 'visible',
      },
      width: '100%',
      boxShadow: `${theme.palette.common.black} 0px 0px 40px 25px`,
    },
    topActions: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: theme.spacing(1),
    },
    titleAndLike: {
      display: 'flex',
      height: '50px',
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
    info: {
      flexGrow: 1,
      width: 0,
      padding: theme.spacing(0.4, 0, 0, 0),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    title: {
      fontSize: '0.95rem',
      height: '1.3rem',
    },
    price: {
      fontSize: '0.8rem',
      lineHeight: '0.8rem',
      fontWeight: theme.typography.fontWeightRegular,
    },
    size: {
      fontSize: '0.8rem',
      lineHeight: '0.8rem',
      fontWeight: theme.typography.fontWeightRegular,
      fontStyle: "italic",
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