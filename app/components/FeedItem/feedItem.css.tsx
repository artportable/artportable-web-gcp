import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    post: {
      marginBottom: "25px"
    },
    postContainer: {
      margin: "10px"
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
      // @ts-ignore: It IS valid!
      fontWeight: "500"
    },
    locationAndPublishedInfo: {
      display: "flex",
      flexDirection: "row",
    },
    published: {
      fontStyle: "italic",
      color: "gray",
      marginLeft: "5px"
    },
    images: {
      margin: "10px 0px"
    },
    imageContainer: {
      margin: "3px",
    },
    bottomImages: {
      display: "flex",
      flexDirection: "row"
    },
    bottomBar: {
      margin: "5px 0px",
      display: "flex",
      flexDirection: "row"
    },
    likeText: {
      marginLeft: "5px",
    }
  }),
);
