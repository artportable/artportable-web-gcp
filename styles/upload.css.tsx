import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { relative } from "node:path";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainGrid: {
      [theme.breakpoints.up("mdPlus")]: {
        display: "grid",
        gap: "16px",
        gridTemplate:
          '"upload   form" minmax(0, 2fr)' +
          '"pickBackgroundColor   form" auto' +
          '"options   form" auto' +
          '"instructions   form" auto' +
          '"previews form" minmax(0, 1fr)' +
          "/  3fr      1fr",
        alignItems: "stretch",
      },
    },
    uploadBox: {
      gridArea: "upload",
      display: "flex",
      borderRadius: "6px",
      fontFamily: "GT-America-Standard",
      [theme.breakpoints.down("sm")]: {
        width: "250px",
        marginBottom: "10px",
        justifyContent: "center",
      },
    },
    cropperBox: {
      gridArea: "upload",
      display: "flex",
      borderRadius: "6px",
      fontFamily: "GT-America-Standard",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "10px",
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
        backgroundColor: "red",
        height: "300px",
        width: "250px",
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
        backgroundColor: "green",
        height: "400px",
        width: "250px",
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
      marginTop: "20px",
      backgroundColor: "var(--color-green)",
      color: "var(--absolute-black)",
      "&.MuiButton-root:hover": {
        backgroundColor: "var(--color-green-lighter)",
      },
    },
    disabledButton: {
      width: "100%",
      marginTop: "20px",
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
    },
  })
);

export default styles;
