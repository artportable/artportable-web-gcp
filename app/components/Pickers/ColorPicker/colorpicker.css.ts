import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    colorPicker: {
      position: 'relative',
      width: 300,
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.up("md")]: {
        width: '100%',
        maxWidth: 540,
        justifyContent: 'space-between',
      },
    },
    colorPickerItem: {
      width: 70,
      height: 70,
      margin: 4,
      borderWidth: 4,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: '50%',
      boxSizing: 'content-box',
      boxShadow: '-3px 3px 8px rgba(0, 0, 0, .2), 3px 3px 8px rgba(0, 0, 0, .2)',
      cursor: 'pointer',
      // WebkitTapHighlightColor: 'transparent', // Avoid blue square on mobile click, item is round.
      [theme.breakpoints.up("md")]: {
        width: 50,
        height: 50,
      }
    },
    colorPickerItemSelected: {
      boxShadow: 'inset 0 0 0 4px white, -3px 3px 8px rgba(0, 0, 0, .2), 3px 3px 8px rgba(0, 0, 0, .2)', // Inner white border.
    },
  })
)