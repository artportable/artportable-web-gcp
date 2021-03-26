import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
    }
  }),
);