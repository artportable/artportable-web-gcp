import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      margin: 'auto',
      marginTop: theme.spacing(4)
    },
    discoverContainer: {
      paddingTop: theme.spacing(4)
    },
    tabs: {
      '& .MuiTabs-scroller': {
        display: 'flex',
        justifyContent: 'center'
      },
      '& .MuiTab-root': {
        minWidth: '54px'
      }
    },
    text: {
      fontSize: '0.785rem !important',
    },
    [theme.breakpoints.up('sm')]: {
      text: {
        fontSize: 'initial !important',
      },
    },
  }),
);