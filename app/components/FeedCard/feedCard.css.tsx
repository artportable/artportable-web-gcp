import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      padding: '12px',
      alignItems: 'center',
    },
    cardActions: {
      paddingLeft: '16px',
    },
    /*
    published: {
      fontStyle: "italic",
      marginLeft: "5px",
    },*/
    likeCountContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginRight: '12px',
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
    likeInline: {
      display: "inline-block",
      float: "right",
      height: "30px",
      marginLeft: 0,
      padding: '8px 4px',
      fontWeight: 500,
    },
    likeButton: {
      width: '100%',
      maxWidth: '30px',
      minWidth: '30px !important',
      paddingLeft: '10px',
      '& .MuiButton-startIcon': {
        marginRight: 0,
      },
      '& .MuiButton-iconSizeMedium': {
        fontSize: '22px',
      },
      /*'& .MuiButton-root': {
        minWidth: '30px !important',
      }*/
    },
  })
);
