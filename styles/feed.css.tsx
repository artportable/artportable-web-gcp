import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      backgroundColor: 'var(--background-color)',
      height: 'var(--viewport-minus-header)',
      display: 'grid',
      gap: '16px',
      gridTemplate: (
      '\"left feed right\" auto' +
      '/ 4fr 6fr 4fr'),
    },
    colLeft: {
      gridArea: 'left'
    },
    colFeed: {
      gridArea: 'feed'
    },
    colRight: {
      gridArea: 'right'
    }
  }),
);