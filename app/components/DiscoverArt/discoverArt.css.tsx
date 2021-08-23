import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    rowsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2)
    },
    row: {
      display: 'flex',
      gap: theme.spacing(2),
      justifyContent: 'flex-start',
      overflow: 'hidden'
    },
    categoryTags: {
      display: 'flex',
      gap: theme.spacing(1),
      paddingInlineStart: 0,
      listStyleType: 'none',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    categoryTag: {
      minWidth: '55px'
    },
    selected: {
      '& .MuiChip-root': {
        background: theme.palette.primary.dark,
        border: `1px solid ${theme.palette.primary.dark}`,

      },
    }
  }),
);
