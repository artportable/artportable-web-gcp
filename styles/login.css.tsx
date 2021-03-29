import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    loginContainer: {
      height: 'var(--viewport-minus-header-and-padding)',
      display: 'grid',
      gridTemplate: (
      '\". . .\" 1fr' +
      '\". form .\" auto' +
      '\". . .\" 1fr' +
      '\". . .\" 1fr' +
      '\". . .\" 1fr' +
      '/ 1fr auto 170px')
    },
    loginCard: {
      gridArea: 'form',
      width: '500px',
    },
  }),
);