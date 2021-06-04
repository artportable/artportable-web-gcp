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
    text: {
      position: 'absolute',
      bottom: '100px',
      left: '50px',
      fontSize: '2rem',
      backgroundColor: theme.palette.common.white,
      borderRadius: '4px',
      padding: theme.spacing(1),
      maxWidth: '25vw',
    },
    textHeader: {
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(1)
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
    textBody: {
      fontFamily: 'LyonDisplay',
      color: theme.palette.common.white,
      padding: '12px',
      fontSize: '1.1rem'
    },
  }),
);
