import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() =>
  createStyles({
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    icon: {
      marginRight: "5px"
    },
    sitename: {
      display: "block",
      whiteSpace: "nowrap",
      width: "15em",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }),
);
