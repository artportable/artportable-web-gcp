import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { max } from 'date-fns/esm';
import { rowGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
    createStyles({
      pagecontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'center',
        width: '100%'
      },
      alphabetcontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '53%',
        width: '100%'
      },
      letter: {
        fontSize: '300%',
        fontWeight: 600
      },
      letterList: {
        fontSize: '160%',
        margin: '2%'
      },
      container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
      },
      groupDiv: {
        columns: '1 auto',
        width: '100%'
      },
      [theme.breakpoints.up('smPlus')]: {
        groupDiv: {
        columns: '2 auto',
      }, 
      [theme.breakpoints.up('md')]: {
        groupDiv: {
        columns: '2 auto',
      }, 
      [theme.breakpoints.up('mdPlus')]: {
        groupDiv: {
        columns: '3 auto',
      }, 
       [theme.breakpoints.up('lg')]: {
        groupDiv: {
        columns: '3 auto',
      },
       [theme.breakpoints.up('lgPlus')]: {
        groupDiv: {
        columns: '4 auto',
      },
       [theme.breakpoints.up('xl')]: {
        groupDiv: {
        columns: '4 auto',
        width: '100%'
      },
    }}}}}
    },    
  }),
);