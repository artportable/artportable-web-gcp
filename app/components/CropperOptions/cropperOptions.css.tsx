import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cropperOptions: {
      gridArea: 'options',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    startIcon: {
      margin: theme.spacing(0.25, 0),
      
    },
    // deleteIconButton: {
    //   backgroundColor: theme.palette.error.main,
    //   '&:hover': {
    //     backgroundColor: theme.palette.error.light,
    //   }
    // },
    hide: {
      visibility: 'hidden',
    },
    done: {
      '&.MuiButton-outlinedPrimary': {
      backgroundColor: 'var(--color-green)',
      color: '#000',
      border: '1px solid #000',
    }
  }
  }),
);