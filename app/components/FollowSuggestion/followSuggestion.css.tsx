import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: 'transparent',
    },
    listItem: {
      paddingLeft: 0,
      paddingRight: 90,
    },
    listItemText: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '& .MuiTypography-root': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }
    },
    secondaryAction: {
      right: '2px'
    },
    followButton: {
      height: '1.5rem',
      background: '#000000',
      color: '#FFFFFF',
      textTransform: 'uppercase',
      fontWeight: 500,
      "&:hover": {
        background: "theme.palette.secondary.main",
        color: "#000000",
      },
    }
  }),
);