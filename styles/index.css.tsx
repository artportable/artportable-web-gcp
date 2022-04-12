import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { rowGap } from '../app/utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      margin: 'auto',
      marginTop: theme.spacing(4)
    },
    discoverContainer: {
      paddingTop: theme.spacing(4),
    },
    tabContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    textField: {
      width: '110px',
      height: "35px",
      marginBottom: '10px',
      '& .MuiSelect-select:focus': {
        backgroundColor: "var(--background-color)",
      },
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiOutlinedInput-root': {
        height: "35px",
        borderRadius: '16px',

        '&.Mui-focused fieldset': {
          border: '1px solid black',
        },
      },
    },
    textFieldFlex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
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
    prost: {
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
      tabContainer: {
        flexDirection: 'row',
      },
      form: {
        marginTop: '14px',
        alignSelf: 'center',
      },
      textField: {
        marginBottom: '0',
      },
      tabs: {
        marginLeft: '-110px',
        '& .MuiTabScrollButton-root': {
          display: 'none',
        },
      },
      prost: {
        marginLeft: '0',
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
