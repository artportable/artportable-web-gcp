import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
      [theme.breakpoints.down('sm')]: {
        flexDirection : 'column'
      },
      gap: theme.spacing(1),
      justifySelf: 'flex-end',
    },
    followButton: {
      maxHeight: '30px'
    },
    tabsContainer: {
      gridArea: 'tabs'
    },
    divider: {
      gridArea: 'divider'
    },
    portfolioContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2)
    },
    portfolioRow: {
      display: 'flex',
      gap: theme.spacing(2),
      justifyContent: 'flex-start',
      overflow: 'hidden'

    },
    secondDivider: {
      gridArea: 'divider2'
    },
    similarPortfolios: {
      gridArea: 'portfolio',
      marginBottom: '100px'
    }
  }),
);