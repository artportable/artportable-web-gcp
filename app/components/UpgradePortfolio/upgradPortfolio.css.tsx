import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    upgradeDesktopDiv: {
      whiteSpace: 'nowrap'
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
    spacing: {
     paddingTop: theme.spacing(8),
     paddingBottom: theme.spacing(1)
    },
    spacingBottom: {
      paddingBottom: theme.spacing(5),
     },
     [theme.breakpoints.up('sm')]: {
      upgradeButton: {
        whiteSpace: 'nowrap',
        width: '130px',
        display: 'initial'
      },
    },

  }),
);
