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
      '/ 3fr 6fr 3fr'),
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