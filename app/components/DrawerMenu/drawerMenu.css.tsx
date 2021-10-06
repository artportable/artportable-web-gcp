import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: '240px'
    },
    listsContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '100%',

    },
    authList: {
      display: 'initial',
      paddingBottom: theme.spacing(2)
    },

    [theme.breakpoints.up('smPlus')]: {
      authList: {
        display: 'none',
      }
    },
  }),
);