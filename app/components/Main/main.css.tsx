import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      height: 'var(--viewport-minus-header)',
      marginTop: 'calc(35px + var(--header-height))',

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
        '/ 1fr 1124px 1fr')
      }
    },
    content: {
      gridArea: 'content',
    }
  }),
);
