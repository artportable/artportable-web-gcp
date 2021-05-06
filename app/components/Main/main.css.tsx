import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      height: '100vh',
      paddingTop: 'calc(35px + var(--header-height))',

      [theme.breakpoints.up('sm')]: {
        gridTemplate:
            ('\". content .\" auto' +
            `/ 1fr ${theme.breakpointMainWidths.sm}px 1fr`)
      },
      [theme.breakpoints.up('md')]: {
        gridTemplate:
        ('\". content .\" auto' +
        `/ 1fr ${theme.breakpointMainWidths.md}px 1fr`)
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplate:
        ('\". content .\" auto' +
        `/ 1fr ${theme.breakpointMainWidths.lg}px 1fr`)
      }
    },
    content: {
      gridArea: 'content',
    },
  }),
);
