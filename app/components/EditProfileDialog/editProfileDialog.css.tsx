import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    tagsContainer: {
      display: 'flex',
      gap: theme.spacing(1),
      flexWrap: 'wrap'
    },
    buttonPosition: {
      marginTop: theme.spacing(1),
    },
    editButtonText: {
      display: 'none',
    },
    editProfileIcon: {
      position: 'relative',
      right: '-5px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: 'clamp(10px, 100vw - 88px, 660px)',
      gap: theme.spacing(2),
      '& > :last-child': {
        marginBottom: theme.spacing(2)
      }
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
      width: 'clamp(10px, 100vw - 88px, 660px)',
      gap: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      editProfileButton: {
        width: '131px',
        marginBottom: '3px'
      },
      editButtonText: {
        display: 'flex',
      },
      editProfileIcon: {
        right: '0px',
      },
    }
  }),
);
