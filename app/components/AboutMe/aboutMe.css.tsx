import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gap: '16px',
      gridTemplate: 
      '\"mainCard   rightCol\" auto' +
      '/  7fr         3fr',
    },
    mainCard: {
      gridArea: 'mainCard',
    },
    mainCardContent: {
      display: 'flex',
      gap: theme.spacing(2),
    },
    rightCol: {
      gridArea: 'rightCol',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    }
  }),
);