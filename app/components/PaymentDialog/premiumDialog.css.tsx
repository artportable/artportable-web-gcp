import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      '& .MuiDialog-paper': {
        maxWidth: 'unset',
        maxHeight: '100%',
        width: '100%',
        height: '100%',
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('sm')]: {
          margin: 'initial',
          width: '90%',
          height: 'initial',
          maxHeight: '90%',
        },
        [theme.breakpoints.up('md')]: {
          width: '780px'
        }
      },
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(0),
      top: theme.spacing(0),
      color: theme.palette.grey[800],
    },
  }),
);