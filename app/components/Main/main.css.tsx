import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      backgroundColor: 'var(--background-color)',
      height: 'var(--viewport-minus-header)',
      boxShadow: 'inset 0px 90px 40px -100px var(--ion-color-primary)',
      paddingTop: '35px',

      [theme.breakpoints.up('sm')]: {
        gridTemplate:
            ('\". content .\" auto' +
            '/ 1fr 430px 1fr')
      },
      [theme.breakpoints.up('md')]: {
        gridTemplate:
        ('\". content .\" auto' +
        '/ 1fr 669px 1fr')
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplate:
        ('\". content .\" auto' +
        '/ 1fr 1024px 1fr')
      }
    },
    content: {
      gridArea: 'content',
    }
  }),
);
