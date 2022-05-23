import { red } from '@material-ui/core/colors';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
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
      marginTop: theme.spacing(0.4),
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.h6.fontSize,
      // placeItems: 'center'
    },
    likeInline: {
      display: 'inline-block',
      float: 'right',
      height: '30px',
    },
    likeContainer: {
      display: 'flex',
      marginLeft: '10px',
      marginBottom: '5px',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary,
      placeItems: 'center'
    },
    info: {
      flexGrow: 1,
      width: 0,
      padding: theme.spacing(0.4, 0, 0, 0),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    name: {
      fontSize: '0.95rem',
      fontWeight: 400
    },
    title: {
      fontStyle: 'italic',
      fontSize: '0.95rem',
      height: '1.3rem',
      marginBottom: '5px',
    },
    price: {
      fontSize: '0.95rem',
      lineHeight: '1rem',
      fontWeight: theme.typography.fontWeightMedium,
      display: 'flex',
    },

    soldMark: {
      background: "#C67777",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      marginRight: '5px',
    },
    size: {
      fontSize: '0.8rem',
      lineHeight: '1rem',
      fontWeight: theme.typography.fontWeightRegular,
    },
    likeCounter: {
      marginLeft: '4px',
      marginRight: "0",

      padding: theme.spacing(0.9, 0, 0, 0),
      fontWeight: 500,
      color: '#000000'
    },
    flexLikeCount: {
      display: 'flex',
    },
    likeButton: {
      padding: theme.spacing(0.4, 0, 0.4, 0.5),
      fontSize: '0.5rem',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    chatButton: {
      padding: theme.spacing(0.4, 0, 0.4, 0.5),
      fontSize: '0.5rem',
      color: '#000000',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    chatDiv: {

    },
    purchaseRequestButtonSv: {
      marginTop: '5px',
      minWidth: '110px',
      maxWidth: '110px',
      whiteSpace: 'nowrap',
      padding: theme.spacing(0, 2, 0, 2),
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid var(--secondary-color)',
      color: 'var(--secondary-color)',
    },

    purchaseRequestButtonEn: {
      marginTop: '5px',
      whiteSpace: 'nowrap',
      padding: theme.spacing(0, 2, 0, 2),
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid var(--secondary-color)',
      color: 'var(--secondary-color)',

    },

    roomButtonSv: {
      marginTop: '5px',
      padding: theme.spacing(0, 0, 0, 0),
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid black',
      color: 'black',
      '&.MuiButton-root': {
        minWidth: '48px',
      },
    },
    roomButtonEn: {
      marginTop: '5px',
      padding: theme.spacing(0, 2, 0, 2),
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid black',
      color: 'black',
      '&.MuiButton-root': {
        minWidth: '48px',
        maxWidth: '58px',
      },
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
    },
    purchaseFrameTool: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    roomDiv: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%'
    },
    badgeNew: {
      '& span': {
        '&.MuiBadge-anchorOriginTopRightRectangle': {
          top: '-4px',
          right: '12px',
          backgroundColor: 'none',
          color: 'black'
        },
      },
    },
  }),
);