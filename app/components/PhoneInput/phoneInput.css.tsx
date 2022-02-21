import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);
