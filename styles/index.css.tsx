import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    carouselContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    artworks: {
      display: "grid",
      gap: theme.spacing(0, 2),
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridAutoRows: '10px',
      gridAutoFlow: 'row',
    },
    welcomeToContainer: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center'
    },
    welcomeTo: {
      width: '400px'
    },
  }),
);
