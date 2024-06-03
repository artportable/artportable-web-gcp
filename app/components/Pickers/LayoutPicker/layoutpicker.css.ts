import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    layoutPicker: {
      width: '100%',
      maxWidth: 400,
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      [theme.breakpoints.up("md")]: {
        maxWidth: 768,
        justifyContent: 'space-between',
      },
      '--layout-item-width': '157px',
    },
    layoutPickerItem: {
      width: 'var(--layout-item-width)',
      maxWidth: 'calc(50% - var(--side-mobile) * 2)', // Make sure two items fit on a row on smallest devices.
      margin: '0 10px 14px 10px',
      boxSizing: 'content-box',
      backgroundColor: 'white',
      boxShadow: '0px 5px 10px #e5e6e4',
      cursor: 'pointer',
    },
    layoutPickerItemSelected: {
      // Inset box shadow instead of border, easier to make same size as not selected items.
      boxShadow: 'inset 0 0 0 4px black, 0px 5px 10px #e5e6e4',
    },
  })
)