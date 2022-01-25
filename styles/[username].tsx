import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../app/utils/styleUtils';

export const profileStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileGrid: {
      display: 'grid',
      gap: '16px',
      gridTemplate: (
        '\"      .              .         .        .              .\"       185px' +
        '\"      .              .      profile     .              .\"       50px' +
        '\"      .              .      profile     .              actions\"       auto' +
        '\"   divider        divider   divider   divider       divider\"       auto' +
        '\"      .         priceSpan  priceSpan  priceSpan        .\"       auto' +
        '\"     tabs           tabs      tabs     tabs           tabs\"       1fr' +
        '\"   divider2       divider2  divider2  divider2      divider2\"       auto' +
        '\"   portfolio      portfolio portfolio portfolio    portfolio\"       auto' +
        '/ minmax(0, 2fr) minmax(0, 2fr) minmax(200px, 2fr) minmax(0, 2fr) minmax(0, 2fr)'),
    },
    profileSummary: {
      gridArea: 'profile'
    },
    editActions: {
      paddingTop: theme.spacing(0.5),
      gridArea: 'actions',
      display: 'flex', 
      flexDirection : 'column',
      gap: theme.spacing(1),
      justifySelf: 'flex-end',
    },
    followButton: {
      marginTop: '10px',
      maxHeight: '27px',
      '& .MuiButton-startIcon': {
        margin: '0 0',
      },
    },

    messageButtonText: {
      display: 'none'
    },
    tabsContainer: {
      gridArea: 'tabs'
    },
    catalogued: {
      gridRow: '3/4',
      gridColumn: '4/5',
      display: 'flex',
      justifyContent: 'center',
      margin: '50px 0 0 0',
    },
    emblem: {
      width: '60px',
      height: '60px',
      color: '#FFD700',
      marginLeft: '20px',
      marginTop: '50px',
    },
    divider: {
      gridArea: 'divider'
    },
    portfolioContainer: {
      display: 'flex',
      flexDirection: 'column',
      ...columnGap(16)
    },
    portfolioRow: {
      display: 'flex',
      ...rowGap(16),
      justifyContent: 'flex-start',
      overflow: 'hidden'
    },
    uploadButton: {
      width: '130px',
      display: 'none',
    },
    secondDivider: {
      gridArea: 'divider2'
    },
    similarPortfolios: {
      gridArea: 'portfolio',
      marginBottom: '100px'
    },
    editButton: {
      width: '38px',
      minWidth: '36px',
      '& .MuiButton-startIcon': {
        margin: '0 0',
      },
    },
    [theme.breakpoints.up('sm')]: {
      emblem: {
        width: '80px',
        height: '80px',
        marginLeft: '45px',
        marginTop: '50px',
      },
      followButton: {
        maxHeight: '27px',
        '& .MuiButton-startIcon': {
          margin: '0 8px 0 -4px',
        },
      },
      messageButtonText: {
        display: 'initial'
      },
    },
    [theme.breakpoints.up('smPlus')]: {
      emblem: {
        width: '80px',
      },
    },
    [theme.breakpoints.up('md')]: {
      uploadButton: {
        display: 'flex',
      },
      catalogued: {
        position: 'relative',
        left: '120px',
        justifySelf: 'flex-end',
        gridRow: '3/4',
        gridColumn: '5/6',
        marginTop: '10px',
      },
      emblem: {
        marginLeft: '0',
        marginRight: '30px',
        marginTop: '0',

      },
    },
    [theme.breakpoints.up('mdPlus')]: {
      emblem: {
        
      },
    },
  }),
);