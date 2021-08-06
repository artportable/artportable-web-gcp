import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '300px'
    },
    imageContainer: {
      borderRadius: '4px',
      overflow: 'hidden',
      textAlign: 'center'
    },
    titleAndLike: {
      display: 'flex',
      gap: theme.spacing(1),
      height:'30px',
      justifyContent: 'space-between',
      padding: theme.spacing(0.6, 1, 0, 1)
    },
  }),
);