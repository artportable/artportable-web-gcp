import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // height: '300px',
      // width: '100%',
      // backgroundColor: theme.palette.grey[300],
      // overflow: 'hidden',
      // position: 'absolute',
      // top: 'var(--header-height)',
      // display: 'flex',
      // justifyContent: 'center',
      // visibility: 'hidden'
    },
    profileCoverPhoto: {
      // objectFit: 'cover',
      // minHeight: '100%',
      // minWidth: '100%',
    },
    buttonContainer: {
      position: "absolute",
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      bottom: 0,
      marginBottom: theme.spacing(1),
      right: "15px",
    },
    editCoverPhotoText: {
      display: "none",
    },
    cameraIcon: {
      position: "relative",
      right: "-5px",
    },
    buttonPosition: {
      position: "relative",
    },
  })
);

export default styles;
