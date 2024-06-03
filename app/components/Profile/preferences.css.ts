import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    openerSection: {
      borderBottom: '1px solid #D9D9D9',
      textAlign: 'center',
      '& button': {
        margin: '0 auto',
      },
    },
    root: {
      height: "100%",
      '& h1': {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      '& h2': {
        fontSize: '16px',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 'var(--side-mobile)',
        [theme.breakpoints.up("md")]: {
          paddingLeft: 'var(--side-desktop)',
        }
      },
      '& h3': {
        fontSize: '16px',
        fontWeight: 'normal',
        alignSelf: 'flex-start',
      },
      '--side-mobile': '10px',
      '--side-desktop': '62px',
    },
    content: {
      width: '100%',
      margin: '0 auto',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
    },
    header: {
      position: 'relative',
      width: '100%',
      height: 80,
      borderBottom: '1px solid #D9D9D9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& h1': {
        maxWidth: 'calc(100% - 80px)',
      },
      '& .close-button': {
        position: 'absolute',
        top: '50%',
        left: 10,
        padding: 0,
        transform: 'translateY(-50%)',
        '& svg': {
          height: 21,
          width: 'auto',
        },
      },
      [theme.breakpoints.up("md")]: {
        height: 150,
        '& h1': {
          maxWidth: '50%',
        },
      },
    },
    profileButton: {
      padding: '7px 34px',
      border: '1px solid black',
      fontSize: '16px',
    },
    saveButtonMobile: {
      display: 'inline',
      [theme.breakpoints.up("md")]: {
        display: 'none',
      }
    },
    saveButtonDesktop: {
      display: 'none',
      position: 'absolute',
      top: '50%',
      right: 68,
      transform: 'translateY(-50%)',
      [theme.breakpoints.up("md")]: {
        display: 'inline',
      }
    },
    styleDropdownContainer: {
      width: 'calc(100% - var(--side-mobile) * 2)',
      [theme.breakpoints.up("md")]: {
        maxWidth: 768,
      },
    },
    styleDropdown: {
      width: '100%',
    },
    dropDownItem: {
      width: '100%',
      padding: 14,
      justifyContent: 'flex-start',
    },
  })
)