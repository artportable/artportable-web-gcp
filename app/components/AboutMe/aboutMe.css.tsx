import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      alignItems: 'start',
      gap: '16px',
      gridTemplate: 
      '\"mainCard   rightCol\" auto' +
      '/  7fr         3fr',
    },
    rightCol: {
      gridArea: 'rightCol',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    }
  }),
);