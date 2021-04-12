import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const profileStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileCoverPhoto: {
      position: 'absolute',
      top: 'var(--header-height)',
      width: '100vw',
      maxWidth: '100%',
      height: '300px',
    },
    profileGrid: {
      display: 'grid',
      gap: '16px',
      gridTemplate: (
      '\"      .              .         .        .              .\"       185px' +
      '\"      .              .      profile     .              .\"       auto' +
      '\"   divider        divider   divider   divider       divider\"       auto' +
      '\"     tabs           tabs      tabs     tabs           tabs\"       1fr' +
      '/ minmax(0, 2fr) minmax(0, 2fr) 2fr minmax(0, 2fr) minmax(0, 2fr)'),
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
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: theme.spacing(0, 2)
    },
    artWorkListItem: {
      height: '300px',
    }
  }),
);