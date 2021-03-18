import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    post: {
      marginBottom: "25px"
    },
    topBar: {
      margin: "5px 0px",
      display: "flex",
      flexDirection: "row"
    },
    userInfo: {
      flexDirection: "column",
      marginLeft: "15px"
    },
    username: {
      fontWeight: 500
    },
    locationAndPublishedInfo: {
      display: "flex",
      flexDirection: "row",
    },
    published: {
      fontStyle: "italic",
      marginLeft: "5px"
    },
    media: {
      display: "grid",
      gridTemplate: ('\"primary primary\" 300px ' +
                      '\"secondary tertiary\" 150px ' +
                      '/ 1fr 1fr'),
      gap: "2px",
      position: "relative"
    },
    primaryImage: {
      gridArea: "primary",
      position: "relative"
    },
    secondaryImage: {
      gridArea: "secondary",
      position: "relative"
    },
    tertiaryImage: {
      gridArea: "tertiary",
      position: "relative"
    }
  }),
);
