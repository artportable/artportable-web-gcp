import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    rowsContainer: {
      display: 'flex',
      flexDirection: 'column',
      ...columnGap(16),
    },
    row: {
      display: 'flex',
      ...rowGap(16),
      justifyContent: 'flex-start',
      overflow: 'hidden'
    },
    categoryTags: {
      display: 'flex',
      ...rowGap(8),
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