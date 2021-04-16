import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() =>
  createStyles({
    yearsRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline"
    },
    icon: {
      overflow: "visible",
      marginRight: "5px"
    },
    years: {
      marginBottom: "2px",
      fontStyle: "italic",
      color: "grey"
    },
    title: {
      marginTop: "0px"
    }
  }),
);
