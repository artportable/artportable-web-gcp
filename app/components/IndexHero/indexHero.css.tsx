import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridColumn: '1/4',
      padding: theme.spacing(1, 1, 0, 1),
      background: theme.palette.grey[200],
      backgroundColor: 'var(--background-color-darker)'
    },
    flexContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column-reverse',
      marginLeft: 'auto',
      marginRight: 'auto',
      ...columnGap(theme.spacing(4)),
      alignItems: 'center',
      flexWrap: 'nowrap',
      padding: '0, 5px',
      
      [theme.breakpoints.up('mdPlus')]: {
        padding: '0',
        flexDirection: 'row',
        ...columnGap(0),
      }      
    },
    left: {
      textAlign: 'left',
      flexBasis: '100%',
      flexGrow: 2,
      width: '90&',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      ...columnGap(
        theme.spacing(1),
      ),
      marginRight: '16px',
      marginLeft: '16px',
      margin: theme.spacing(0, 0, 4, 0),

      [theme.breakpoints.up('smPlus')]: {
        margin: theme.spacing(0, 0, 2, 0),
        width: '567px',
      },
      [theme.breakpoints.up('md')]: {
        textAlign: 'initial',
        margin: theme.spacing(0, 0, 4, 4),
        placeItems: 'center',
      },
      [theme.breakpoints.up('mdPlus')]: {
        textAlign: 'initial',
        margin: theme.spacing(0, 0, 4, 4),
        placeItems: 'flex-start',
      }
    },
    headline: {
      fontWeight: 600,
      fontSize: '1.9rem',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        fontSize: '2.9rem',

    },
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
  },
    subHeadline: {
      '& span': {
        fontSize: '1.3rem',
      },
      fontWeight: 500,
      margin: theme.spacing(0, 2, 0, 1),
      textAlign: 'left',
      fontSize: '1rem',
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(0, 2, 1, 1),
        fontWeight: 600,
      },
    },
    
    description: {
      margin: theme.spacing(1, 0,),
      marginBottom: theme.spacing(2),
      fontSize: '12pt',
      lineHeight: '1.38',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.3rem',
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
      },
      [theme.breakpoints.up('mdPlus')]: {
        textAlign: 'left',
      }, 
  },
    right: {
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '100%',
      alignItems: 'flex-end',
      [theme.breakpoints.up('md')]: {
        marginTop: '20px',
      },
      
    },
    flexheaderButton: {
      display: 'flex',
      ...rowGap(
        theme.spacing(3)),
      flexDirection: 'column',
      marginTop: '-20px',
      
      [theme.breakpoints.up('smPlus')]: {
        flexDirection: 'row',
        marginTop: '0',
      },
    },
    headerButtonArtlover: {
      display: 'flex',
      alignContent: 'flex-start',
      alignItems: 'left',
      marginBottom: theme.spacing(2),
    },
    headerButtonArtist: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      marginTop: '10px',
      [theme.breakpoints.up('smPlus')]: {
        marginTop: '0',
      },
    },
    
    paintingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      alignItems: 'flex-end',
      margin: '0 20px',
      [theme.breakpoints.up('sm')]: {

      },
    },
    frame: {
      listStyle: 'none',
      listStyleType: 'none',
      margin: '0px',
      textAlign: 'center',
      display: 'inline-block',
      padding: '15px 15px 10px 15px',
      borderWidth: '10px',
      borderStyle: 'solid',
      borderColor: '#1F1E1E #292828 #292828 #272626',
      background: '#F5F5F5',
      [theme.breakpoints.up('smPlus')]: {
        borderWidth: '15px',
        padding: '30px 30px 25px 30px',
      },
      backgroundImage: 'linear-gradient(#FFFEF8, #F3F3F1)',
      filter: 'drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.4))',
      position: 'relative',
      overflow: 'hidden',
      '& :before': {
        content: '""',
        position: 'absolute',
        top: '-175px',
        right: '-20%',
        width: '400px',
        height: '400px',
        transform: 'rotateZ(-40deg)',
        backgroundImage: 'linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,0))',
      },
    },
    image: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#BBBAB4 #C7C7BF #E5E4DF #C7C7BF',
      boxShadow: '0 -1px 1px rgba(0,0,0,.1), 0 1px 1px 1px rgba(255,255,255,.7)',
      maxWidth: '100%',
    },
    boosted: {
      display: 'block',
      objectFit: 'contain',
      maxWidth: '100%',
      filter: 'drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.4))'
    },
    createdBy: {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      margin: theme.spacing(1, 0, 0, 0 ),
      [theme.breakpoints.up('smPlus')]: {
        margin: theme.spacing(1, 0, 2, 0 ),
      },
    },
    chipAvatar: {
      marginLeft: '2px',
      borderRadius: '50%'
    },
    chip: {
      backgroundColor: theme.palette.common.white
    },
    sofaImage: {
      display: 'block',
      width: '100%',
    },
    signupButtonContainer: {
      marginTop: theme.spacing(1)
    },
    videoDiv: {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(5),

      [theme.breakpoints.up('smPlus')]: {
        marginBottom: theme.spacing(2),
        },
    },
    playText: {
      fontWeight: 500,
      marginLeft: '5px',
    },
    buttonLabel: {
      fontSize: '0.9rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: 'initial',
        margin: theme.spacing(0, 1),
      },
      [theme.breakpoints.up('smPlus')]: {
        fontSize: 'initial',
        margin: theme.spacing(0, 2),
      },
    },
    becomeMemberButton: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
      },
    },
    accordion: {
      backgroundColor: 'var(--header-color)',
      width: '100%',
    },
    accordionDiv: {
      paddingRight: theme.spacing(0),
      margin: '0 0',
      marginLeft: '-15px',
    },
    textDiv: {
      display: 'flex',
      placeContent: 'center',
      marginBottom: '20px',
    },
    buttonDiv: {
      justifyContent: 'center',
    },
    button: {
      marginTop: '-38px',
      [theme.breakpoints.up('sm')]: {
        marginTop: '-5px',
        },
    },
    accDescription: {
      fontFamily: 'Gotham !important',
      marginTop: '10px',
      marginBottom: '10px',
    },
    heading: {
      fontWeight: 600,
      lineHeight: '32px',
      fontFamily: 'Gotham !important',
    },
    detailsText: {
      ...columnGap(theme.spacing(1)),
      margin: '20px 0',
      marginTop: '-20px',
      fontFamily: 'Gotham !important',
      fontSizeAdjust: 0.5,
    },
    adContent: {
      ...columnGap(theme.spacing(1)),
      margin: '20px 0',
      marginTop: '-20px',
      fontFamily: 'Gotham !important',
      fontSizeAdjust: 0.5,
      borderBottom: '1px solid grey',
      width: '200px',
      height: '200px',
      padding: '20px',
      [theme.breakpoints.up('md')]: {
        width: '400px',
        },
    },
    adContent2: {
      width: '200px',
      padding: '20px',
      borderBottom: '1px solid grey',
      [theme.breakpoints.up('md')]: {
        width: '400px',
        },
    },
    imageAd: {
      height: '150px',
    },
    headingAd: {
      padding: '10px',
      fontSize: '12px',
      marginLeft: '10px',
      marginTop: '10px',
      color: 'gray'
    },
    [theme.breakpoints.up('sm')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.sm.wide
      },
    },
    [theme.breakpoints.up('smPlus')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.smPlus.wide,
      },
    },
    [theme.breakpoints.up('md')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.md.wide,
      },
    },
    [theme.breakpoints.up('mdPlus')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.mdPlus.wide,
      },
    },
    [theme.breakpoints.up('lg')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.lg.wide,
      },
      paintingContainer: {
        width: '600px',
      },
    }, 
  })
);