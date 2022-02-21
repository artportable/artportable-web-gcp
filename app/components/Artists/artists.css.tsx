import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { max } from 'date-fns/esm';
import { rowGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    alphabeticTable: {
      display: 'flex',
      backgroundColor: 'red',
      flexDirection: 'column',
      width: '100%'
    },
    group1: {
      display: 'flex',
      backgroundColor: 'yellow',
      maxwidth: '100%',
      columnFill: 'balance'
    },
    group1Div: {
      width: '25%',
    },
    artileDiv: {
      maxwidth: '25%',
      textAlign: 'center',
      justifyContent: 'center',
    },
    p: {
      display: 'flex',
      flexDirection: 'row',
      maxwidth: '25%',
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      margin: '10'
    }
  }),
);