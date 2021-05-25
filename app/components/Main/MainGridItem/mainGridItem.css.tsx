import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      gridArea: 'content',
    },
    fullWidth: {
      gridColumn: '1/4'
    },
    center: {
      gridColumn: '2/3'
    }
  }),
);
