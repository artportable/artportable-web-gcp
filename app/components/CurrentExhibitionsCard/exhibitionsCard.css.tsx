import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() =>
  createStyles({
    exhibition: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px"
    },
    datesRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end"
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
    title: {
      marginTop: "0px",
      marginLeft: "29px"
    },
    location: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: "27px"
    },
    locationText: {
      fontStyle: "italic"
    }
  }),
);
