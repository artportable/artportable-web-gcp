import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: '240px'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      languageElement: {
        display: 'none',
      },
    },
    [theme.breakpoints.up('mdPlus')]: {
      articleLink: {
        display: 'none',
      },
    },
  }),
);