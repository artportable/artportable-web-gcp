import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    upgradeDesktopDiv: {
      whiteSpace: 'nowrap'
    },
    dialogHeight: {
      '&.MuiDialog-paperScrollPaper': {
      height: '1000px'
      },
    },
    upgradeButton: {
      display: 'none'
  },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    header: {
      fontWeight: 600,
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(1)
    },
    spacingBottom: {
      paddingBottom: theme.spacing(5),
     },
     [theme.breakpoints.up('sm')]: {
      upgradeButton: {
        whiteSpace: 'nowrap',
        display: 'initial'
      },
    },

  }),
);
