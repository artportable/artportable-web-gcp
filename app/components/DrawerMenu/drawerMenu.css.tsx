import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: '240px',
      backgroundColor: 'var(--header-color)',
      [theme.breakpoints.up('md')]: {
        minWidth: '300px',
      },
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    upgradeButton: {
      whiteSpace: 'nowrap',
      width: '130px',

  },
  closeButtonFlex: {
    display: 'flex',
    justifyContent: 'right',
  },
    closeButton: {
      top: theme.spacing(1),
      color: '#000',

    },
    spacing: {
     paddingTop: theme.spacing(8),
     paddingBottom: theme.spacing(1)
    },
    spacingBottom: {
      paddingBottom: theme.spacing(5),
     },
    // [theme.breakpoints.up('sm')]: {
    //   languageElement: {
    //     display: 'none',
    //   },
    // },
    [theme.breakpoints.up('mdPlus')]: {
      articleLink: {
        display: 'none',
      },
    },
    color: {
      color: 'black',
    },
  }),
);