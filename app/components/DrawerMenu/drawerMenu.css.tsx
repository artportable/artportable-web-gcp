import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: '240px'
    },
    closeDiv: {
      display: 'flex',
      justifyContent: 'right',
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1)

    },
    closeButton: {
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '18px'
    },
  }),
);