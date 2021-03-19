import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    loginContainer: {
      backgroundColor: 'var(--background-color)',
      display: 'grid',
      gap: '16px',
      gridTemplate: (
      '\"left feed right\" auto' +
      '/ 4fr 6fr 4fr'),
    }
  }),
);