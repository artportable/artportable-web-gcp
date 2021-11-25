import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
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

  }),
);
