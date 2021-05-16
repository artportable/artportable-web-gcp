import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      cursor: 'pointer'
    },
    imageContainer: {
      borderRadius: '4px',
      overflow: 'hidden',
    },
    titleAndLike: {
      height:'30px',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.h6.fontSize
    },
    likeInline: {
      display: 'inline-block',
      float: 'right',
      height: '30px',
    },
    likeContainer: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary
    },
    title: {
      display: 'inline-block',
      width: 'calc(100% - 48px)',
      padding: '3px 0 0 4px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    likeButton: {
      padding: theme.spacing(0.2, 0.5, 0, 1),
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }
  }),
);