import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      padding: theme.spacing(1),
    },
    cardActions: {
      padding: "16px",
      paddingTop: "10px",
      justifyContent: "space-between",
    },
    published: {
      fontStyle: "italic",
      marginLeft: "5px",
    },
    media: {
      /*display: "grid !important;",
      gap: "2px",
      position: "relative"*/
    },
    image: {
      //objectFit: 'cover',
      height: "100%",
      width: "100%",
    },
    oneImage: {
      /*gridTemplate: ('\"primary\" 450px ' +
      '/ 1fr'),*/
    },
    twoImages: {
      /*gridTemplate: ('\"primary\" 250px ' +
      '\"secondary\" 200px ' +
      '/ 1fr'),*/
    },
    threeImages: {
      /*gridTemplate: ('\"primary primary\" 300px ' +
      '\"secondary tertiary\" 150px ' +
      '/ 1fr 1fr'),*/
    },
    primaryImage: {
      //gridArea: "primary",
      //position: "relative"
    },
    secondaryImage: {
      //gridArea: "secondary",
      //position: "relative"
    },
    tertiaryImage: {
      //gridArea: "tertiary",
      //position: "relative"
    },
    likeInline: {
      display: "inline-block",
      float: "right",
      height: "30px",
      marginLeft: 0,
      padding: "8px 4px",
      fontWeight: 500,
    },
    likeButton: {
      width: "100%",
      maxWidth: "30px",
      minWidth: "30px !important",
      paddingLeft: "10px",
      "& .MuiButton-startIcon": {
        marginRight: 0,
      },
      "& .MuiButton-iconSizeMedium": {
        fontSize: "22px",
      },
      /*'& .MuiButton-root': {
        minWidth: '30px !important',
      }*/
    },
    pricePurchase: {
      display: "flex",
      flexDirection: "row",
      margin: theme.spacing(0, 0, 0, 0.4),
      fontWeight: 500,
      alignItems: "center",
      '& .MuiButton-root': {
        color: "#a35d5d",
        padding: "0px 16px",
        backgroundColor: "inherit",
        border: "1px solid #a35d5d",
        borderRadius: "20px",
        marginTop: "4px",
        '& .MuiButton-label': {
          width: 'auto',
        }
      }
    },
    priceTag: {
      marginRight: "20px",
      marginTop: "4px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    soldMark: {
      background: "rgb(167, 3, 1)",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      marginRight: "5px",
    },
    priceContainer: {
      margin: theme.spacing(0, 0, 0, 0.4),
      fontWeight: 500,
      paddingBottom: theme.spacing(1),
      display: "flex",
      alignItems: "center",
    },
    purchaseRequestButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white !important",
      border: "1px solid black !important",
      color: "black !important",
      width: "150px",
      height: "30px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      "&:hover": {
        backgroundColor: "black !important",
        border: "1px solid black !important",
        color: "white !important",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },
  })
);