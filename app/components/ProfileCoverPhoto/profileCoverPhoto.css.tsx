import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '300px',
      width: '100%',
      backgroundColor: theme.palette.grey[300],
      overflow: 'hidden',
      position: 'absolute',
      top: 'var(--header-height)',
      display: 'flex',
      justifyContent: 'center'
    },
    profileCoverPhoto: {
      objectFit: 'cover',
      minHeight: '100%',
      minWidth: '100%'
    },
    buttonContainer: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      bottom: 0,
      marginBottom: theme.spacing(1)
    },
    buttonPosition: {
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        right: `calc((100vw - ${theme.breakpointMainWidths.sm.regular}px) / 2)`
      },
      [theme.breakpoints.up('smPlus')]: {
        right: `calc((100vw - ${theme.breakpointMainWidths.smPlus.regular}px) / 2)`
      },
      [theme.breakpoints.up('md')]: {
        right: `calc((100vw - ${theme.breakpointMainWidths.md.regular}px) / 2)`
      },
      [theme.breakpoints.up('mdPlus')]: {
        right: `calc((100vw - ${theme.breakpointMainWidths.mdPlus.regular}px) / 2)`
      },
      [theme.breakpoints.up('lg')]: {
        right: `calc((100vw - ${theme.breakpointMainWidths.lg.regular}px) / 2)`
      },
      [theme.breakpoints.up('lgPlus')]: {
        right: `calc((100vw - ${theme.breakpointMainWidths.lgPlus.regular}px) / 2)`
      },
      [theme.breakpoints.up('xl')]: {
        right: `calc((100vw - ${theme.breakpointMainWidths.xl.regular}px) / 2)`
      },
    }
  }),
);

export default styles;