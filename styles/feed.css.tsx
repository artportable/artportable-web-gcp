import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      backgroundColor: 'var(--background-color)',
      display: 'grid',
      gap: '16px',
      gridTemplate: (
      '\"left feed right\" auto' +
      '/ 4fr 6fr 4fr'),
    },
    colLeft: {
      gridArea: 'left',
      display: 'grid',
      alignItems: 'start',
      rowGap: theme.spacing(2)
    },
    colFeed: {
      gridArea: 'feed'
    },
    colRight: {
      gridArea: 'right'
    },
    uploadArtButton: {
      width: '100%',
      height: '3rem'
    }
  }),
);