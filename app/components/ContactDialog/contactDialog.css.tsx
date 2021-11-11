import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    technicalDiv: {
      whiteSpace: 'nowrap'
    },
    technicalButton: {
      whiteSpace: 'nowrap'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    title: {
      alignSelf: 'center',
      marginTop: theme.spacing(6),
    }
  }),
);
