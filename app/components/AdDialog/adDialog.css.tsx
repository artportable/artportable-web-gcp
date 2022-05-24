import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      '& .MuiDialog-paper': {
        maxWidth: 'unset',
        overflowY: 'unset',
        backgroundColor: 'transparent',
        boxShadow: 'none'
      },
      '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: '#ffffff',
    },
    adImage: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      [theme.breakpoints.up('md')]: {
        maxWidth: '60vw',
      maxHeight: '60vh',
      }
    },
    videoFrame: {
      width: '300px',
      height: '168.75px',
      [theme.breakpoints.up('sm')]: {
        width: '400px',
        height: '225px',
      },
      [theme.breakpoints.up('smPlus')]: {
        width: '500px',
        height: '281.25px',
      },
      [theme.breakpoints.up('md')]: {
        width: '600px',
        height: '337.5px',
      },
    },
  }),
);