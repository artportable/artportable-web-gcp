import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
    },
    imageContainer: {
      position: 'relative',
      height: 'calc(100% - 18px)'
    },
    titleAndLike: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }),
);