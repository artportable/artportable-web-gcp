import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      backgroundColor: 'var(--background-color)',
      display: 'grid',
      alignItems: 'flex-start',
      gap: '16px',
      gridTemplate: (
      '\"feed\" auto' +
      '/ 8fr'),
    },
    colLeft: {
      display: 'none',
      gridArea: 'left',
      position: 'sticky',
      top: 'calc(var(--header-height) + var(--header-box-shadow-padding))',
      rowGap: theme.spacing(2)
    },
    colFeed: {
      gridArea: 'feed',
      display: 'grid',
      rowGap: theme.spacing(2),
    },
    colRight: {
      display: 'none',
      gridArea: 'right',
      position: 'sticky',
      top: 'calc(var(--header-height) + var(--header-box-shadow-padding))',
      rowGap: theme.spacing(2),
    },
    uploadArtButton: {
      width: '100%',
      height: '3rem'
    },

    [theme.breakpoints.up('md')]: {
      feedContainer: {
        backgroundColor: 'var(--background-color)',
        display: 'grid',
        alignItems: 'flex-start',
        gap: '16px',
        gridTemplate: (
        '\"feed right\" auto' +
        '/ 8fr minmax(0, 4fr)'),
      },
      colLeft: {
        display: 'grid',
      },
      colFeed: {
        gridArea: 'feed',
        display: 'grid',
        rowGap: theme.spacing(2),
      },
      colRight: {
        display: 'grid',
      },
    },

    [theme.breakpoints.up('lg')]: {
      feedContainer: {
        gridTemplate: (
        '\"left feed right\" auto' +
        '/ minmax(0, 4fr) 8fr minmax(0, 4fr)'),
      },
    }
  }),
);