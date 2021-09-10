import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridArea: 'priceSpan',
      justifySelf: 'center',
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      display: 'flex',
      paddingRight: theme.spacing(1),
    }
  }),
);