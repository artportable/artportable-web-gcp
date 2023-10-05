import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { rowGap, columnGap } from '../app/utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    backBtnContainer: {
      alignSelf: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.up('mdPlus')]: {
        marginTop: '3vh'
      }
    },
    imageInfoContainer: {
      [theme.breakpoints.up('mdPlus')]: {
        display: 'flex',
        flexDirection: 'row',
        // maxWidth: '80%'
      }
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
      maxWidth: '100%'
    },
    paper: {
      maxWidth: '100%',
      [theme.breakpoints.up('mdPlus')]: {
        display: 'flex',
        flexDirection: 'column'
      }
    },

    artistName: {
      [theme.breakpoints.up('mdPlus')]: {
        fontSize: '22.4px',
        marginBottom: '1.8vh'
      }
    },

    followButton: {
      maxHeight: '30px',
      width:'75px',
      margin: '10px',
      backgroundColor: '#fadf87',
      border: '1px solid #fadf87',
      color: 'black',
      padding: '5px',
      '&:hover': {
        backgroundColor: '#fadf87',
        color: 'white'
      }
    },

    following: {
      maxHeight: '30px',
      margin: '10px',
      backgroundColor: '#49cc90',
      border: '1px solid #49cc90',
      color: 'white',
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'black'
      }
    },

    linkName: {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      textDecoration: 'underline',
      margin: '2vh',
      [theme.breakpoints.up('mdPlus')]: {
        fontWeight: '500',
        marginTop: '3vh'
      },
      '&:hover': {
        opacity: '70%'
      }
    },

    imageContainer: {
      position: 'relative',
      maxWidth: '100%',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      textAlign: 'center'
    },
    primaryImage: {
      minWidth: '100%',
      width: '100%',
      maxWidth: 'calc(100vw - 36px)',
      maxHeight: 'calc(100vh - var(--header-plus-box-shadow-padding) - 16px)',
      objectFit: 'contain',
      [theme.breakpoints.up('mdPlus')]: {
        maxWidth: 'calc(80vw)',
      }
    },
    infoBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginLeft: theme.spacing(1.6),
      marginRight: theme.spacing(1.6),
      [theme.breakpoints.up('mdPlus')]: {
        alignItems: 'center',
        textAlign: 'center',
        minWidth:'20vw',
        maxWidth:'25vw',
      }
    },
    infoContainer: {
      fontSize: '0.95rem',
      overflow: 'hidden',
      flexGrow: 1,
      textOverflow: 'ellipsis'
    },

    titleSpace: {
      marginBottom: '5px',
      [theme.breakpoints.up('mdPlus')]: {
        marginBottom: '2vh',
        fontSize: '1.4rem'
      }
    },

    textSpace: {
      marginBottom: '5px',
      overflowWrap: 'break-word',
      [theme.breakpoints.up('mdPlus')]: {
        marginBottom: '2vh',
      }
    },
    titleAndSizeContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    priceContainer: {
      fontWeight: theme.typography.fontWeightMedium,
      paddingBottom: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('mdPlus')]: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1vh 0'
      }
    },
    purchaseRequestButton: {
      backgroundColor: '#fadf87',
      color: 'black',
      '&.MuiButton-root .MuiButton-startIcon ': {
        margin: theme.spacing(0, 0.4, 0, 0)
      },
      [theme.breakpoints.up('mdPlus')]: {
        marginTop: '3vh'
      },
      '&:hover': {
        backgroundColor: '#fee19c',
        color: 'black',
        boxShadow: '5px 5px 10px #e5e6e4'
      }
    },
    flexMessageLike: {
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
    },

    likeCounter: {
      marginLeft: '4px',
      marginRight: '0',

      fontWeight: 500,
      color: '#000000'
    },
    likeButton: {
      padding: theme.spacing(0.2, 0, 0.4, 0.5),
      fontSize: '0.5rem',

      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    shareButton: {
      padding: theme.spacing(0, 0.1, 0.2, 0.5),
      fontSize: '0.9rem',
      color: '#000000',
      [theme.breakpoints.up('mdPlus')]: {
        marginRight: '15px',
        marginLeft: '15px'
      },
      '&:hover': {
        backgroundColor: 'transparent'
      },
      position: 'relative',
      textDecoration: 'none',
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 0,
        height: '1px',
        backgroundColor: '#000',
        transition: 'width 0.3s ease'
      },
      '&:hover::before': {
        width: '100%',
        left: 0,
        right: 'auto'
      }
    },
    text: {
      marginLeft: '10px',
      marginRight: '10px',
      paddingBottom: '10px'
    },
    extraImages: {
      //flexBasis:'100%',
      // display: 'flex',
      // flexFlow: 'row wrap',
      // justifyContent: 'space-around',
      // alignItems: 'center',
      // '& :not(:first-child)': {
      //   marginLeft: theme.spacing(2)
      // }
    },
    extraImage: {
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: '50vh'
      // width: '100%'
    },
    tagsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      [theme.breakpoints.up('mdPlus')]: {
        margin: '1vh'
      }
    },
    chip: {
      marginRight: '5px'
    },
    soldMark: {
      background: '#C67777',
      borderRadius: '50%',
      width: '15px',
      height: '15px',
      marginRight: '5px'
    },
    purchaseAndRoom: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    roomDiv: {
      [theme.breakpoints.up('smPlus')]: {
        marginTop: '20px'
      }
    },
    roomButton: {
      border: '1px solid black',
      color: 'black',
      marginTop: '1vh',
      padding: '4px 15px'
    },

    flexPurchaseRoom: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },

    imageDivider: {

    },
    // [theme.breakpoints.up('smPlus')]: {
    //   titleAndSizeContainer: {
    //     flexDirection: 'column'
    //   }
    // }
  })
)
