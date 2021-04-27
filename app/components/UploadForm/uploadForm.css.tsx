import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    titleText: {
      gridArea: 'rightCol',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
    tags: {
      marginTop: '20px',
      textAlign: 'center'
    },
    tagTitle: {
      textAlign:'left',
      marginBottom: '10px'
    }
  }),
);
