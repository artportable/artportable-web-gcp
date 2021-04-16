import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    tagsContainer: {
      display: 'flex',
      gap: theme.spacing(1)
    }
  }),
);
