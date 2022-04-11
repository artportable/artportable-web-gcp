import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      '& > *': {
        marginBottom: theme.spacing(2.5)
      },
      display: 'flex',
      justifyContent: 'center',
      marginBottom: "20px"

    },
    textField: {

      '&.MuiSelect-select:focus': {
        backgroundColor: "black"
      },
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiOutlinedInput-root': {
        height: "35px",

        '&.Mui-focused fieldset': {
          border: '1px solid black',
        },
      },
    },
    textFieldFlex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
    },
  }),
);
