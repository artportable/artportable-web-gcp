import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // display: 'grid',
      // gridTemplateColumns: '[first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end]',
      // gridTemplateRows: '[row1-start] 25% [row1-end] 100px [third-line] auto [last-line]',
      // gap: '20px'
    },
    // container: {
    //   position: 'relative',
    // },
    coverImage: {
      // gridColumnStart: 'col-start 1',
      // width: '100%',

    },
    paper: {
      // gridColumnStart: 'col-start 1',
      // width: '90%',
    },
  }),
);