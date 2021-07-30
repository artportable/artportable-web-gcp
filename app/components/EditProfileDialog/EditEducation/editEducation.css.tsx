import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    educationContainer: {
      display: 'flex',
      gap: theme.spacing(1),
      flexDirection: 'column',
      flexBasis: '100%',
      border: '1px solid ' + theme.palette.divider,
      padding: theme.spacing(1.5),
      borderRadius: theme.spacing(1),
      '& > *': {
        minHeight: '67px'
      }
    },
    badgeRoot: {
      width: `calc(100% - ${theme.spacing(2)}px)`
    },
    fromToContainer: {
      display: 'flex',
      gap: theme.spacing(2),
      '& > *': {
        flexBasis: '100%'
      }
    }
  }),
);
