import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../app/utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: '1000px',
      padding: '20px',
      justifySelf: 'center',
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
    description: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: '1.4rem'
    },
    div: {
      maxWidth: '100%',
      justifySelf: 'center',
      marginTop: '7%'
    },
    div2: {
      maxWidth: '100%',
    },
    articleImages: {
      '& figure': {
        textAlign: 'center',
      },
      '& img': {
        maxWidth: '100%',
        height: '100%',
      },
      '& p': {
        fontSize: '1rem',
      },
      '& h3': {
        fontWeight: 500,
      },
      '& a': {
        textDecoration: 'underline',
      },
      width: 'fit-content',
    },

    headingDiv: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...columnGap(16),
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
    findArt: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '27px',
      alignItems: "center",
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
    },
    artportable_logo: {
      margin: '8px 0 0 0',
      [theme.breakpoints.up('sm')]: {
        margin: '2px 0 0 10px',
      },
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