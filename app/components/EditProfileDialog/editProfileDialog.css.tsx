import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    tagsContainer: {
      display: 'flex',
      ...rowGap(8),
      flexWrap: 'wrap'
    },
    buttonPosition: {
      marginTop: theme.spacing(1),
    },
    editButtonText: {
      display: 'none',
    },
    editProfileButton: {
      marginLeft: "20px", 
     
      border: "1px solid black"
    },
    editProfileIcon: {
      position: 'relative',
      right: '-5px',
     

    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: 'clamp(10px, 100vw - 88px, 660px)',
      ...columnGap(16),
      '& > :last-child': {
        marginBottom: theme.spacing(2)
      }
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
      width: 'clamp(10px, 100vw - 88px, 660px)',
      ...columnGap(16),
    },
    [theme.breakpoints.up('sm')]: {
      editProfileButton: {
      },
      editButtonText: {
        display: 'none',
      },
      editProfileIcon: {
        right: '0px',
      },
    }
  }),
);
