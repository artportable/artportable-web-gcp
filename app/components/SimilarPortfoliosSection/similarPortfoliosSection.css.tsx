import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() =>
  createStyles({
    portfolioGrid: {
      display: 'grid',
      gap: '15px',
      gridTemplate: (
      '\"      first     second     third\"       auto' +
      '/        1fr        1fr        1fr'),
    },
  }),
);
