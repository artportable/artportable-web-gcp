import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
fontPicker: {
      position: 'relative',
      width: 300,
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      [theme.breakpoints.up("md")]: {
        width: '100%',
        maxWidth: 850,
        justifyContent: 'space-between',
      },
    },
    fontPickerItem: {
      position: 'relative',
      width: 70,
      height: 70,
      margin: '0 4px 32px 4px',
      border: '1px solid black',
      boxSizing: 'content-box',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.up("md")]: {
        width: 93,
        height: 93,
      }
    },
    fontPickerItemSelected: {
      // Inset box shadow instead of border, easier to make same size as not selected items.
      boxShadow: 'inset 0 0 0 4px black',
    },
    fontExample: {
      fontSize: '24px',
      [theme.breakpoints.up("md")]: {
        fontSize: '30px',
      }
    },
    fontName: {
      position: 'absolute',
      top: '110%',
      left: 0,
      fontSize: '12px',
      [theme.breakpoints.up("md")]: {
        fontSize: '24px',
      }
    },
  })
)