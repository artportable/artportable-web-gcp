import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainCard: {
      gridArea: 'mainCard',
    },
    mainCardContent: {
      display: 'flex',
      gap: theme.spacing(2),
    },
    location: {
      display: 'flex',
      position: 'relative',
      left: '-4px',
      alignItems: "center",
      fontWeight: 500,
      fontFamily: "LyonDisplay" 
    }
  }),
);