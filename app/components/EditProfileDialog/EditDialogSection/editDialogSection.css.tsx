import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      '& .MuiTypography-root': {
        lineHeight: 2.5
      }
    },
    fieldsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    }
  }),
);
