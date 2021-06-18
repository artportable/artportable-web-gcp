import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const profileStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileCoverPhoto: {
      position: 'absolute',
      top: 'var(--header-height)',
      width: '100vw',
      maxWidth: '100%',
      height: '300px',
      objectFit: 'cover'
    },
    profileGrid: {
      display: 'grid',
      gap: '16px',
      gridTemplate: (
      '\"      .              .         .        .              .\"       185px' +
      '\"      .              .      profile     .              .\"       auto' +
      '\"   divider        divider   divider   divider       divider\"       auto' +
      '\"     tabs           tabs      tabs     tabs           tabs\"       1fr' +
      '\"   divider2       divider2  divider2  divider2      divider2\"       auto' +
      '\"   portfolio      portfolio portfolio portfolio    portfolio\"       auto' +
      '/ minmax(0, 2fr) minmax(0, 2fr) minmax(200px, 2fr) minmax(0, 2fr) minmax(0, 2fr)'),
    },
    profileSummary: {
      gridArea: 'profile'
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