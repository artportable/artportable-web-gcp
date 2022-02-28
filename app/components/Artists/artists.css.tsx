import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { max } from 'date-fns/esm';
import { rowGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    pagecontainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    alphabetcontainer: {
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      right: 0,
      top: '26%',
      alignItems: 'center'
    },
    letter: {
      fontSize: '300%',
      fontWeight: 600
    },
    letterList: {
      margin: '2%',
      fontWeight: 600
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
    },
    groupDiv: {
      columns: '1 auto',
      width: '50%'
    },
    [theme.breakpoints.up('smPlus')]: {
      groupDiv: {
        columns: '2 auto',
        width: '100%'
      },
      pagecontainer: {
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        flexDirection: 'row',
        marginTop: '70px'
      },
      alphabetcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        justifyItems: 'center',
        position: 'fixed',
        width: '100%',
        backgroundColor: '#FDF9F7',
        top: '70px',
        height: 'var(--header-height, 70px)',
      },
      alphabeticTypo: {
        fontweight: 600
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
              }
            }
          }
        }
      }
    },
  }),
);