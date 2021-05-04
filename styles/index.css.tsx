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
      gap: "10px",
      gridTemplate: (
        '\". . . . . .\" 1fr' +
        '\". . . . . .\" auto' +
        '\". . . . . .\" 1fr' +
        '\". . . . . .\" 1fr' +
        '\". . . . . .\" 1fr' +
        '/ 1fr 1fr 1fr 1fr 1fr 1fr')
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
