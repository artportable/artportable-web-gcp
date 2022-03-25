import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    articleContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    image: {
      maxWidth: '100%',
    },

    header: {
      marginTop: '20px',
      marginBottom: '10px',
      fontWeight: 600,
    },
    textFirst: {
      margin: '20px 0 0 0',
    },
    textFieldDiv: {
      display: 'flex',
      flexDirection: 'column',
    },
    textSecond: {
      fontWeight: 500,
      marginBottom: '20px',
    },
    textThird: {
      marginBottom: '5px',
    },
    textFourth: {
      fontStyle: 'italic',
      fontSize: '0.8rem'
    },
    textFifth: {
      marginTop: '20px'
    },
    buttonDiv: {
      display: 'flex',
      justifyContent: 'right'
    },
    textField: {
      minHeight: '76px',
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused & fieldset': {
          // borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          border: '1px solid black',
        },
      },
    },
    [theme.breakpoints.up('lg')]: {
      articleContainer: {
        flexDirection: 'row',
        marginTop: '100px'
      },
      image: {
        width: '600px',
      },
      contentDiv: {
        marginLeft: '40px'
      },
      header: {
        marginTop: 0,
      },
    }
  }),
);