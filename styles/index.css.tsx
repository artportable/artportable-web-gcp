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
        flexGrow: "0"
      },
      justifyContent: "center",
      minWidth: '54px',
      width: '100%'
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