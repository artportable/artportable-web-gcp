import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      padding: theme.spacing(1),
    },
    cardActions: {
      padding: theme.spacing(1),
    },
    published: {
      fontStyle: "italic",
      marginLeft: "5px",
    },
    media: {
      display: "grid !important;",
      gap: "2px",
      position: "relative",
    },
    image: {
      objectFit: "cover",
      height: "100%",
      width: "100%",
    },
    oneImage: {
      gridTemplate: '"primary" 450px ' + "/ 1fr",
    },
    twoImages: {
      gridTemplate: '"primary" 250px ' + '"secondary" 200px ' + "/ 1fr",
    },
    threeImages: {
      gridTemplate:
        '"primary primary" 300px ' +
        '"secondary tertiary" 150px ' +
        "/ 1fr 1fr",
    },
    primaryImage: {
      gridArea: "primary",
      position: "relative",
    },
    secondaryImage: {
      gridArea: "secondary",
      position: "relative",
    },
    tertiaryImage: {
      gridArea: "tertiary",
      position: "relative",
    },
    likeContainer: {
      display: "flex",
      marginLeft: "10px",
      marginBottom: "5px",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary,
      placeItems: "center",
    },
    likeCounter: {
      marginLeft: "4px",
      marginRight: "0",

      padding: theme.spacing(0.9, 0, 0, 0),
      fontWeight: 500,
      color: "#000000",
    },
    likeInline: {
      display: "inline-block",
      float: "right",
      height: "30px",
    },
    flexLikeCount: {
      display: "flex",
    },
  })
);
