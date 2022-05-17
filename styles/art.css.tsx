import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../app/utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    backBtnContainer: {
      alignSelf: 'flex-start'
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifySelf: 'center',
      maxWidth: '100%',
    },
    paper: {
      maxWidth: '100%'
    },
    avatar: {
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    followButton: {
      maxHeight: '30px'
    },
    imageContainer: {
      position: 'relative',
      maxWidth: '100%',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      textAlign: 'center',
    },
    primaryImage: {
      minWidth: '100%',
      width: '100%',
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: 'calc(100vh - var(--header-plus-box-shadow-padding) - 16px)',
      objectFit:  'contain'
    },
    infoBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginLeft: theme.spacing(1.6),
      marginRight: theme.spacing(1.6),
    },
    infoContainer: {
      fontSize: '0.95rem',
      overflow: 'hidden',
      flexGrow: 1,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    titleAndSizeContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(0, 0, 0, 0.4),
      padding: theme.spacing(0.75, 0, 0, 0)
    },
    priceContainer: {
      margin: theme.spacing(0, 0, 0, 0.4),
      fontWeight: theme.typography.fontWeightMedium,
      paddingBottom: theme.spacing(1),
      display: 'flex',
      alignItems: "center"
    },
    purchaseRequestButton: {
      '&.MuiButton-root .MuiButton-startIcon ': {
        margin: theme.spacing(0, 0.4, 0 ,0)
      }
    },
    flexLikeRoom: {
      display: 'flex',
      flexDirection: 'column',
      ...columnGap(23),
      [theme.breakpoints.up('smPlus')]: {
        ...columnGap(1),
      }
    },
    likeContainer: {
      float: 'right',
      display: 'inline-block',
      '& button' : {
        paddingBottom: 0,
      }
    },
    
    text: {
      marginLeft: '10px',
      marginRight: '10px',
      paddingBottom: '10px'
    },
    extraImages: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      '& :not(:first-child)': {
        marginLeft: theme.spacing(2),
      }
    },
    extraImage: {
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: '50vh',
      width: '100%'
    },
    tagsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: '10px'
    },
    chip: {
      marginRight: '5px'
    },
    soldMark: {
      background: "#C67777",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      marginRight: '5px',
    },
    roomDiv: {
      placeSelf: 'flex-end',
      marginRight: '18px'
      // marginTop: '73px',
      // [theme.breakpoints.up('smPlus')]: {
      //   marginTop: '51px',
      // }
    },
    roomButton: {
      marginTop: '5px',
      fontWeight: theme.typography.fontWeightMedium,
      border: '1px solid black',
      color: 'black',
    },
    flexPurchaseRoom: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    badgeNew: {
      '& span': {
        '&.MuiBadge-anchorOriginTopRightRectangle': {
          top: '6px',
          right: '-10px',
          backgroundColor: 'none',
          color: 'black'
        },
      },
    },
    [theme.breakpoints.up('smPlus')]: {
      titleAndSizeContainer: {
        flexDirection: 'row'
      },
    },
  }),
);