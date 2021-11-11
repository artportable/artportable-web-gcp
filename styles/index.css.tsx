import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { rowGap } from '../app/utils/styleUtils';

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
        flexGrow: "0",
      },
      justifyContent: "center",
      width: '100%',
    },
    text: {
      minWidth: 0,
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
    },

    [theme.breakpoints.up('mdPlus')]: {
      tabs: {
        '& .MuiTabScrollButton-root': {
          display: 'none',
      },
    },
    },
  }),
);