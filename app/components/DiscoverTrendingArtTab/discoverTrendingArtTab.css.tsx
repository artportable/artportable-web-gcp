import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      '& > *': {
        marginBottom: theme.spacing(1.25)
      },
      display: 'flex',
      justifyContent: 'center',
    },
    textField: {
      width: '100px',

      '& .MuiSelect-select:focus': {
        backgroundColor: "var(--background-color)",
      },
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiOutlinedInput-root': {
        height: "35px",
        borderRadius: '16px',

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
