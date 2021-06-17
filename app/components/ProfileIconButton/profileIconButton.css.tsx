import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroup: {
      '& .MuiButtonBase-root': {
        justifyContent: 'flex-start'
      }
    }
  }),
);

export default styles;