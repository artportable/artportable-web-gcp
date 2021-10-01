import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: '240px',
      height: 'initial',
    },
    listsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    authList: {
      display: 'initial',
      paddingBottom: theme.spacing(2)
    },

    [theme.breakpoints.up('md')]: {
      authList: {
        display: 'none',
      }
    },
  }),
);