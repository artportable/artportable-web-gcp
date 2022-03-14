import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    plansRootContainer: {
      height: '100vh',
      paddingTop: 'var(--header-plus-box-shadow-padding)',
      backgroundColor: 'var(--background-color)',
      display: 'grid',
      gap: '16px 0',
      gridTemplate: (
      '\". . .\" 1fr' +
      '\". header .\" auto' +
      '\". planSelector .\" auto' +
      '\". . .\" 2fr' +
      '/ 1fr auto 1fr')
    },
    headerDiv: {
      gridArea: 'header',
      marginBottom: '3rem'
    },
    header: {
      fontWeight: 600,
    },
    planSelector: {
      gridArea: 'planSelector',
      paddingBottom: theme.spacing(6)
    }
  }),
);