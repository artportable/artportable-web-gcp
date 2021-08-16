import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      cursor: 'pointer',
      display: 'inline-block'
    },
    imageContainer: {
      borderRadius: '4px',
      overflow: 'hidden',
      textAlign: 'center'
    },
    titleAndLike: {
      display: 'flex',
      height: '30px',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.h6.fontSize
    },
    like: {
      display: 'inline-block',
      float: 'right',
      padding: '3px 3px 0 4px',

    },
    likeContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary
    },
    title: {
      flexGrow: 1,
      width: 0,
      padding: '3px 0 0 4px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  }),
);
