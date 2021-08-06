import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    imageContainer: {
      position: 'relative',
      height: '50vh',
      width: '100vw'
    },
    user: {
      position: 'absolute',
      bottom: '50px',
      right: '60px',
    },
    carouselImage: {
      objectFit: 'cover',
      width: '100%',
      height: '100%'
    },
    paperOverride: {
      backgroundColor: `${theme.palette.common.black}99`,
      padding: 0,
      border: `1px solid ${theme.palette.common.white}88`,
      overflow: 'hidden'
    },
  }),
);
