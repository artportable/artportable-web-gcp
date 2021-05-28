import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    artworks: {
      display: 'flex',
      gap: theme.spacing(2),
      justifyContent: 'center',
      minHeight: '500px'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
      '&:nth-child(2)': {
        paddingTop: '70px',
      },
      '&:nth-child(3)': {
        paddingTop: '140px',
      },
      '&:nth-child(5)': {
        paddingTop: '70px',
      },
      '&:nth-child(6)': {
        paddingTop: '140px',
      },
    }
  }),
);