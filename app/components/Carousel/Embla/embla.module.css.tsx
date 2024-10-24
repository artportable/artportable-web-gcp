import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import { rowGap, columnGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    embla: {
      position: "relative",
      // maxWidth: '48rem',
      width: "100%",
      margin: "auto",
      "--slide-height": "19rem",
      "--slide-height-story": "23rem",
      "--slide-spacing": "1rem",
      "--slide-size": "50%",
      "--slide-size-desktop": "25%",
      "--text-body": "rgb(54, 49, 61)",
      "--arrow-size": "2.6rem",
      "--detail-medium-contrast": "rgb(234, 234, 234)",
      "--text-high-contrast-rgb-value": "49, 49, 49",
    },
    embla__viewport: {
      overflow: "hidden",
    },
    embla__container: {
      "backface-visibility": "hidden",
      display: "flex",
      "touch-action": "pan-y",
      marginLeft: "calc(var(--slide-spacing) * -1)",
    },
    embla__slide: {
      flex: "0 0 var(--slide-size)",
      minWidth: 0,
      // maxWidth: '100%',
      // paddingLeft: 'var(--slide-spacing)',
      marginLeft: "var(--slide-spacing)",
      "&.has-shadow": {
        marginTop: 4,
        marginBottom: 6,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      },
    },
    embla__slide__desktop: {
      flex: "0 0 var(--slide-size-desktop)",
    },
    embla__slide__desktopStory: {
      flex: "0 0 var(--slide-size-desktop)",
      backgroundColor: "transparent",
    },
    embla__slide__story: {
      flex: "0 0 var(--slide-size)",
      minWidth: 0,
      // maxWidth: '100%',
      // paddingLeft: 'var(--slide-spacing)',
      marginLeft: "var(--slide-spacing)", // margin instead of padding, so box-shadow not too large
      "&.has-shadow": {
        marginTop: 4,
        marginBottom: 2,
      },
    },
    // Set dynamic_width after embla__slide__desktop so flex don't get overwritten.
    // Dynamic images will get object-fit:cover.
    dynamic_width: {
      flex: "0 0 auto",
      minWidth: 0,
      maxWidth: "75%",
      height: "100%",
    },
    embla__slide__image: {
      position: "relative",
      // boxShadow: 'inset 0 0 0 0.2rem var(--detail-medium-contrast)',
      // borderRadius: '1.8rem',
      // fontSize: '4rem',
      // fontWeight: 600,

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "var(--slide-height)",
      "&.story-image": {
        height: "var(--slide-height-story)",
        maxHeight: "53vh",
      },
      "& img": {
        // height: 'var(--slide-height)',
      },
      "&:hover": {
        "& > *": {
          opacity: 1,
        },
      },
    },
    has_footer: {
      marginBottom: "0px",
    },
    // image__container: {
    //   position: 'relative',
    //   // Must set height to contain image.
    //   height: '100%',
    // },
    image__element: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
    },
    dynamic_image: {
      // Make image as high as slide, so overlay and image have the same height.
      // width: '100%', // This makes image too wide on safari.
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    rounded__corners: {
      borderRadius: "15px",
    },
    overlay_content: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: "20px",
    },
    hover__image: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0,
      // '&:hover': {
      //   opacity: 1,
      // },
      "& img": {
        objectFit: "cover",
      },
    },
    hover__overlay_content: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: "20px",
      backgroundColor: "rgba(0, 0, 0, .3)",
      // flexFlow: 'column nowrap',
      // display: 'flex',
      // justifyContent: 'flex-end',
      // alignItems: 'flex-start',
      // display: 'none',
      opacity: 0,
      // '&:hover': {
      // },
    },
    slide__footer: {
      display: "flex",
      flexDirection: "column",
    },
    embla__controls: {
      // display: 'grid',
      // 'grid-template-columns': 'auto 1fr',
      // justifyContent: 'space-between',
      // gap: '1.2rem',
      marginTop: "1.8rem",
    },
    // embla__buttons: {
    //   display: 'grid',
    //   'grid-template-columns': 'repeat(2, 1fr)',
    //   gap: '0.6rem',
    //   alignItems: 'center',
    // },
    embla__button: {
      position: "absolute",
      top: "calc(var(--slide-height) / 2 - var(--arrow-size) / 2)",
      "-webkit-tap-highlight-color":
        "rgba(var(--text-high-contrast-rgb-value), 0.5)",
      "-webkit-appearance": "none",
      appearance: "none",
      backgroundColor: "transparent",
      "touch-action": "manipulation",
      display: "inline-flex",
      textDecoration: "none",
      cursor: "pointer",
      border: 0,
      padding: 0,
      margin: 0,
      // boxShadow: 'inset 0 0 0 0.2rem var(--detail-medium-contrast)',
      width: "var(--arrow-size)",
      height: "var(--arrow-size)",
      zIndex: 1,
      borderRadius: "50%",
      color: "var(--text-body)",
      // display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      // '&:disabled': {
      //   color: 'var(--detail-high-contrast)',
      // }
    },
    embla__button__svg: {
      width: "35%",
      height: "35%",
    },
    embla__button__prev: {
      // left: 'calc(var(--arrow-size) * -1) + 0.1rem',
      // left: '-2.6rem',
      right: "calc(100% + 10px)",
      justifyContent: "flex-end",
    },
    embla__button__next: {
      left: "calc(100% + 10px)",
      justifyContent: "flex-start",
    },
    embla__dots: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "calc((2.6rem - 1.4rem) / 2 * -1)",
    },
    embla__dot: {
      "-webkit-tap-highlight-color":
        "rgba(var(--text-high-contrast-rgb-value), 0.5)",
      "-webkit-appearance": "none",
      appearance: "none",
      backgroundColor: "transparent",
      "touch-action": "manipulation",
      display: "inline-flex",
      textDecoration: "none",
      cursor: "pointer",
      // border: 0,
      padding: 0,
      margin: "0 0.3rem 0.3rem 0.3rem",
      width: "1rem",
      height: "1rem",
      // display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      border: "1px solid black",
      // '&:after': {
      //   boxShadow: 'inset 0 0 0 0.2rem var(--detail-medium-contrast)',
      //   width: '1.4rem',
      //   height: '1.4rem',
      //   borderRadius: '50%',
      //   display: 'flex',
      //   alignItems: 'center',
      //   content: '',
      // },
    },
    embla__dot__selected: {
      backgroundColor: "black",
      // '&:after': {
      //   boxShadow: 'inset 0 0 0 0.2rem var(--text-body)',
      // },
    },
    emblaForStory: {
      "& .arrow-button": {
        top: "calc(50% - 50px)",
      },
    },
  })
);
