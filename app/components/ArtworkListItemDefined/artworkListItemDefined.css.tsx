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
    },
    titleAndLike: {
      height:'30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.h6.fontSize
    },
    likeContainer: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      bottom: '10px',
      right: '4px',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary
    },
    title: {
      padding: '3px 0 0 4px'
    },
    likeButton: {
      paddingRight: 0,
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }
  }),
);