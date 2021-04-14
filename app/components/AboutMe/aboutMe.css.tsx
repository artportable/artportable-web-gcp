import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      gap: '16px',
      gridTemplate: 
      '\"mainCard      rightCol\" auto' +
      '/  r minmax(0, 2fr) minmax(0, 2fr)',
    },
  }),
);