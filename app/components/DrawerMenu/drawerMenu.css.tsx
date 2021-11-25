import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: '240px'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    upgradeButton: {
      whiteSpace: 'nowrap',
      width: '130px',

  },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    spacing: {
     paddingTop: theme.spacing(8),
     paddingBottom: theme.spacing(1)
    },
    spacingBottom: {
      paddingBottom: theme.spacing(5),
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