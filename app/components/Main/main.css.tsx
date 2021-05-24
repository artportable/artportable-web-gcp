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
          `/ 1fr ${theme.breakpointMainWidths.sm.regular}px 1fr`)
      },
      [theme.breakpoints.up('smPlus')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.smPlus.regular}px 1fr`)
      },
      [theme.breakpoints.up('md')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.md.regular}px 1fr`)
      },
      [theme.breakpoints.up('mdPlus')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.mdPlus.regular}px 1fr`)
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.lg.regular}px 1fr`)
      },
      [theme.breakpoints.up('lgPlus')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.lgPlus.regular}px 1fr`)
      },
      [theme.breakpoints.up('xl')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.xl.regular}px 1fr`)
      },
    },
    wide: {
      [theme.breakpoints.up('sm')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.sm.wide}px 1fr`)
      },
      [theme.breakpoints.up('smPlus')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.smPlus.wide}px 1fr`)
      },
      [theme.breakpoints.up('md')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.md.wide}px 1fr`)
      },
      [theme.breakpoints.up('mdPlus')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.mdPlus.wide}px 1fr`)
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.lg.wide}px 1fr`)
      },
      [theme.breakpoints.up('lgPlus')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.lgPlus.wide}px 1fr`)
      },
      [theme.breakpoints.up('xl')]: {
        gridTemplate:
          ('\". content .\" auto' +
          `/ 1fr ${theme.breakpointMainWidths.xl.wide}px 1fr`)
      },
    },
    full: {
      display: 'block'
    },
    content: {
      gridArea: 'content',
    },
  }),
);
