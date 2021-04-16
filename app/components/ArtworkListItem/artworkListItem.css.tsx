import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      cursor: 'pointer'
    },
    imageContainer: {
      position: 'relative',
      height: 'calc(100% - 48px)',
      borderRadius: '6px',
      overflow: 'hidden',
      '& img': {
        height: '100%',
      }
    },
    titleAndLike: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.h6.fontSize
    },
    likeContainer: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary
    },
    likeButton: {
      paddingRight: 0,
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }
  }),
);