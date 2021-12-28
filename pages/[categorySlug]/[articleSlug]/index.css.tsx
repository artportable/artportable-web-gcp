import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../../../app/utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // display: 'grid',
      // gridTemplateColumns: '[first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end]',
      // gridTemplateRows: '[row1-start] 25% [row1-end] 100px [third-line] auto [last-line]',
      // gap: '20px'
    },
    // container: {
    //   position: 'relative',
    // },
    coverImage: {
      // gridColumnStart: 'col-start 1',
      // width: '100%',

    },
    paper: {
      padding: '100px'
      // '*': {
      //   magrginLeft: '10px'
      // }
      // gridColumnStart: 'col-start 1',
      // width: '90%',
    },
    line: {
      height: '2px',
      backgroundColor: 'var(--ion-color-primary)',
      margin: '32px 0',
    },
    imagar: {
      '& img': {
        width: '50%',
        innerHeight: '50%',
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
  }),
);