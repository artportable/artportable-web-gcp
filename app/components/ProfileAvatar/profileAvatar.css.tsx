import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    iconBackground: {
      position: 'absolute',
      backgroundColor: theme.palette.background.default,
      borderRadius: '50%',
    }
  })
);