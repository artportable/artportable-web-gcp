import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    portfolioGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2)
    },
    [theme.breakpoints.up('mdPlus')]: {
      portfolioGrid: {
        display: 'grid',
        gap: theme.spacing(2),
        gridTemplate: (
        '\"      first     second     third\"       auto' +
        '/        1fr        1fr        1fr'),
      },
    }
  }),
);
