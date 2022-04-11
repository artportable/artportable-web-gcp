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
      '& .MuiTab-root': {
        minWidth: 0,
      },
      '& .MuiTabScrollButton-root': {
        width: 'unset',
        opacity: '0.8',
      },
      justifyContent: "center",
      width: '100%',
    },
    text: {
      minWidth: 0,
    },

    [theme.breakpoints.up('mdPlus')]: {
      tabs: {
        '& .MuiTabScrollButton-root': {
          display: 'none',
        },
        text: {
          marginRight: theme.spacing(2),
          marginLeft: theme.spacing(2),
        },
      },
    },
  }),
);
