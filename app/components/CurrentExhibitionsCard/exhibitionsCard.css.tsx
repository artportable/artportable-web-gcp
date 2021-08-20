import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    exhibition: {
      display: "flex",
      marginBottom: "10px"
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(0)
    },
    datesRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    icon: {
      overflow: "visible",
      marginRight: "5px"
    },
    dates: {
      marginBottom: "2px",
      fontStyle: "italic",
      color: "grey"
    },
    location: {
      marginTop: theme.spacing(0.6),
      marginLeft: theme.spacing(-0.2),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    locationText: {
      fontStyle: "italic",
      marginBottom: '1px'
    },
    displayNone: {
      display: 'none'
    }
  }),
);
