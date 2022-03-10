import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paymentOptions: {
      gridArea: 'paymentOptions',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      MuiTabs: {
        indicator: {
          backgroundColor: '#fff'
        }
      },
    },
    planCards: {
      display: 'grid',
      gridAutoFlow: 'row',
      margin: theme.spacing(4, 2, 0, 2),
      gap: theme.spacing(4),
      justifyContent: 'center',
      alignItems: 'stretch',
      [theme.breakpoints.up('md')]: {
        gridAutoFlow: 'column',
      },
    },
    joinCommunityButton: {
      margin: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
      '& button': {
        flexGrow: 1,
        maxWidth: '280px',
      },
      tabs: {
        '& .PrivateTabIndicator': {
          backgroundColor: '#fff'
        }
      }
    }
  }),
);
