import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: 'flex',
      padding: theme.spacing(0, 2, 2, 2),
      background: theme.palette.grey[200],
      boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      justifyContent: 'space-between',
      flexWrap: 'wrap',

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 8, 2, 8)
      },
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(0, 16, 2, 16)
      }
    },
    flexItem: {
      padding: theme.spacing(2, 1),
      '& .MuiTypography-root': {
        marginBottom: '3px'
      }
    },
    links: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(2),
    },
    logo: {
      width: '180px',
      alignSelf: 'flex-start',
      marginBottom: theme.spacing(2)
    }
  }),
);
