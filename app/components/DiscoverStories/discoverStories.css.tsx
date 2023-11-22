import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexBasis: 'auto', 
      marginRight: '1.5rem',
    },
    lastGrid: { //prob not needed
      flexBasis: 'auto',
    }

  }),
);