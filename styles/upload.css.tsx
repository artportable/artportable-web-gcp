import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { relative } from "node:path";
import { rowGap, columnGap } from "../app/utils/styleUtils";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainGrid: {
      // [theme.breakpoints.up("mdPlus")]: {
      //   display: "grid",
      //   gap: "16px",
      //   gridTemplate:
      //     '"upload   form" minmax(0, 2fr)' +
      //     '"pickBackgroundColor   form" auto' +
      //     '"options   form" auto' +
      //     '"instructions   form" auto' +
      //     '"previews form" minmax(0, 1fr)' +
      //     "/  3fr      1fr",
      //   alignItems: "stretch",
      // },
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "center",
    },
    uploadBox: {
      gridArea: "upload",
      display: "flex",
      borderRadius: "6px",
      fontFamily: "GT-America-Standard",
      marginTop: "20px",
      [theme.breakpoints.down("sm")]: {
        background: "transparent",
        width: "100%",
        marginBottom: "10px",
        justifyContent: "center",
      },
    },
    cropperBox: {
      gridArea: "upload",
      display: "flex",
      borderRadius: "6px",
      fontFamily: "GT-America-Standard",
      marginBottom: "10px",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
    },
    cropper: {
      width: "100%",
      height: "100%",
      // '& .cropper-bg': {
      //   backgroundImage: 'none'
      // },
      // '& .cropper-modal': {
      //   opacity: '1',
      // },
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "transparent",
        height: "300px",
        width: "100%",
        marginBottom: "10px",
        justifyContent: "center",
      },
    },
    dropzone: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& .MuiDropzonePreviewList-root": {
        display: "none",
      },
      "& .MuiDropzoneArea-text": {
        padding: "0 20px",
        fontWeight: 500,
        marginLeft: "100px",
        marginRight: "100px",
        [theme.breakpoints.down("sm")]: {
          fontWeight: 500,
          marginLeft: "0px",
          marginRight: "0px",
        },
      },
      [theme.breakpoints.down("sm")]: {
        background: "transparent",
        // height: "400px",
        width: "100%",
        marginBottom: "10px",
        justifyContent: "center",
      },
    },
    previewsContainer: {
      gridArea: "previews",
      display: "flex",
      gap: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    previewItem: {
      display: "flex",
      justifyContent: "center",
      height: "100%",
      width: "33.33%",
      borderRadius: "6px",
      overflow: "hidden",
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },
    },
    mobilePreview: {
      maxWidth: "100%",
      height: "400px",
      objectFit: "contain",
    },
    noImgPreview: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: theme.palette.common.white,
      border: "dashed",
      borderColor: theme.palette.grey[400],
      borderRadius: "4px",
    },
    mobileUploadResetButton: {
      marginTop: theme.spacing(1),
    },
    form: {
      gridArea: "form",
    },
    uploadButton: {
      width: "100%",
      marginTop: "10px",
      backgroundColor: "var(--color-green)",
      color: "var(--absolute-black)",
      "&.MuiButton-root:hover": {
        backgroundColor: "var(--color-green-lighter)",
      },
    },
    disabledButton: {
      width: "100%",
      marginTop: "10px",
      backgroundColor: "var(--disabled)",
      color: "#b3b1b1",
      "&.MuiButton-root:hover": {
        backgroundColor: "var(--disabled)",
      },
    },
    uploadButtonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    hide: {
      display: "none",
    },
    cropperPreview: {
      height: "100%",
      width: "100%",
      overflow: "hidden",
      justifySelf: "center",
      alignSelf: "center",
    },
    backgroundColorFlex: {
      display: "flex",
      gridArea: "pickBackgroundColor",
    },
    pickColor: {
      width: "40px",
      height: "40px",
      pointer: "cursor",
      border: "1px solid #000",
      marginRight: "10px",
    },
    instructionsTypo: {
      gridArea: "instructions",
      textAlign: "right",
      fontWeight: 500,
      marginTop: "3px",
      marginBottom: "20px",
    },
    zendeskForm: {
      marginTop: theme.spacing(4),
      width: "100%",
    },
    paddingWidth: {
      [theme.breakpoints.up("lg")]: {
        padding: "0 100px 0 100px",
      },
    },
    flexPaper: {
      display: "flex",
      flexDirection: "column",
      ...columnGap(20),
      justifyContent: "center",
    
      [theme.breakpoints.up("mdPlus")]: {
        flexDirection: "row",
        ...rowGap(20),
      },
    },
    paperLeft: {
      padding: "0 20px",
      width: "100%",
      [theme.breakpoints.up("mdPlus")]: {
        width: "100%",
      },
    },
    paperRight: {
      padding: "30px 20px 20px 20px",
      [theme.breakpoints.up("mdPlus")]: {
        height: "50%",
      },
    },
    headerTypo: {
      fontWeight: 600,
      marginBottom: "40px",
    },
    textBlock: {
      margin: "30px 0 30px 0",
      "& a": {
        fontWeight: 500,
      },
    },
    textBlockWidth: {
      [theme.breakpoints.up("mdPlus")]: {
        width: "70%",
      },
    },
    textBlockRight: {
      margin: "15px 0 15px 0",
    },
    typoBold: {
      fontWeight: 500,
    },
    icon: {
      marginRight: "10px",
      fontSize: "40px",
    },
    iconTextFlex: {
      display: "flex",
      alignItems: "center",
      ...columnGap(20),
    },
    linkText: {
      fontWeight: 500,
      fontSize: "1.1rem",
    },
    bold: {
      fontWeight: 500,
    },
    logo: {
      width: "200px",
      marginBottom: "20px",
    },
    clickMe: {
      fontWeight: 600,
    },
    publishErrorMessage: {
      minHeight: "25px",
      marginTop: "10px",
      color: "red",
    },
    clampedContainer: {
      width: "100%",
      [theme.breakpoints.up("mdPlus")]: {
        maxWidth: "750px",
      },
    },
  })
);

export default styles;
