import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      backgroundColor: 'var(--background-color)',
      display: 'grid',
      alignItems: 'flex-start',
      gap: '16px',
      gridTemplate: (
      '\"left feed right\" auto' +
      '/ minmax(0, 4fr) 8fr minmax(0, 4fr)'),
    },
    colLeft: {
      gridArea: 'left',
      display: 'grid',
      position: 'sticky',
      top: 'calc(var(--header-height) + var(--header-box-shadow-padding))',
      alignItems: 'start',
      rowGap: theme.spacing(2)
    },
    colFeed: {
      gridArea: 'feed',
    },
    colRight: {
      gridArea: 'right',
      position: 'sticky',
      top: 'calc(var(--header-height) + var(--header-box-shadow-padding))',
    },
    uploadArtButton: {
      width: '100%',
      height: '3rem'
    }
  }),
);