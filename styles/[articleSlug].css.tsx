import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../app/utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '20px',
      zIndex: 1,
      [theme.breakpoints.up('md')]: {
        padding: '100px',
        marginTop: '100px',
      },
    },
    line: {
      height: '2px',
      backgroundColor: 'var(--ion-color-primary)',
      margin: '32px 0',
    },
    articleImages: {
      '& img': {
        width: '100%',
        height: '100%',
      },
      width: 'fit-content',
    },

    headingDiv: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...columnGap(16),
    },
    headingText: {
      textDecoration: 'underline',
      textDecorationThickness: '3px',
    },
    authorDiv: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '32px',
    },
    authorAvatar: {
    width: '70px',
    height: '70px',
    marginBottom: '15px'
    },
    authorText: {
      fontWeight: 500,
    },
    tagDiv: {
      display: 'flex',
      justifyContent: 'center',
      ...rowGap(16),
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }
  }),
);