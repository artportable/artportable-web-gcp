import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex'
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    yearsRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    icon: {
      overflow: "visible",
      marginRight: "5px",
    },
    years: {
      marginBottom: "2px",
      fontStyle: "italic",
      color: "grey"
    },
    displayNone: {
      display: 'none'
    }
  }),
);
