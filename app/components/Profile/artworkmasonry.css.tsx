import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "0 20px",
    },
    flexContainer: {
      width: "100%",
      display: "flex",
      flexFlow: "row wrap",
    },
    masonryCardTwoOne: {
      width: "50%",
      marginBottom: 28,
      "&:nth-child(3n + 1)": {
        width: "calc(50% - 5px)",
        marginRight: 4,
        "& .ratioDummy": {
          marginTop: "65%",
        },
      },
      "&:nth-child(3n + 2)": {
        width: "calc(50% - 5px)",
        marginLeft: 4,
        "& .ratioDummy": {
          marginTop: "65%",
        },
      },
      "&:nth-child(3n)": {
        width: "100%",
        "& .ratioDummy": {
          marginTop: "50%",
        },
      },
    },
    masonryCardImage: {
      flexGrow: 1,
    },
    masonryCardSameSize: {
      width: "50%",
      height: "100px",
      marginBottom: 10,
      "& .ratioDummy": {
        marginTop: "65%",
      },
      "&:nth-child(2n + 1)": {
        width: "calc(50% - 5px)",
        height: 150,
        marginRight: 5,
      },
      "&:nth-child(2n + 2)": {
        width: "calc(50% - 5px)",
        height: 150,
        marginLeft: 5,
      },
    },
    masonryCard3: {
      width: "100%",
      height: 200,
    },
    masonryCard4: {
      width: "100%",
    },
    thinBorder: {
      border: "1px solid black",
    },
    thickBorder: {
      border: "5px solid black",
    },
    roundedCorners: {
      borderRadius: 10,
    },
    shadow: {
      boxShadow:
        "-3px 3px 8px rgba(0, 0, 0, .2), 3px 3px 8px rgba(0, 0, 0, .2)",
    },
  })
);
