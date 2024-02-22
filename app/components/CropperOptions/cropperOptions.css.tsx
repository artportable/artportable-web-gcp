import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cropperOptions: {
      gridArea: 'options',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      [theme.breakpoints.down("sm")]: {
        flexFlow: 'column nowrap',
      },
      '& div[role="group"]': {
        width: '45%',
        marginBottom: '10px',
        [theme.breakpoints.down("sm")]: {
          width: '100%',
        },
      }
    },
    fiveButtons: {
      // First button larger because it has text that needs to fit.
      '& button': {
        flexBasis: '20%',
      },
      '& :first-child': {
        flexBasis: '25%',
        flexGrow: 1,
      }
    },
    twoButtons: {
      '& button': {
        flexBasis: '50%',
        flexGrow: 1,
      },
    },
    startIcon: {
      margin: theme.spacing(0.25, 1, 0.25, 0),
    },
    // deleteIconButton: {
    //   backgroundColor: theme.palette.error.main,
    //   '&:hover': {
    //     backgroundColor: theme.palette.error.light,
    //   }
    // },
    hide: {
      visibility: 'hidden',
      display: 'none',
    },
    done: {
      '&.MuiButton-outlinedPrimary': {
      backgroundColor: 'var(--color-green)',
      color: '#000',
      border: '1px solid #000',
      width: '50%',
      marginLeft: '50%',
    }
  }
  }),
);
