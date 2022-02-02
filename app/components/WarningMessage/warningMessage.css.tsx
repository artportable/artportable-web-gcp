import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    information: {
      border: "0.5px solid var(--primary-color)",
      borderRadius: "10px",
      display: 'flex',
      margin: theme.spacing(2, 0),

      // backgroundColor: 'var(--ion-color-primary-contrast)',
    },
    errorOutlineIcon: {
      margin: theme.spacing(1),
    },
    informationText: {
      margin: theme.spacing(1, 1, 1, 0),
    },
  }),
);

export default styles;