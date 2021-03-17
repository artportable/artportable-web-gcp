import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    secondaryColor: {
      backgroundColor: theme.palette.secondary.main
    },
    avatar: {
      backgroundColor: 'transparent',
      width: 120,
      height: 120
    },
    badgeIcon: {
      backgroundColor: 'white',
      borderRadius: '50%',
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.dark,
      }
    },
    editProfileButton: {
      '& .MuiButton-label': {
        color: 'red'
      },
      color: theme.palette.text.primary
    },
    counterBox: {
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: theme.spacing(1),
    }
  }),
);
