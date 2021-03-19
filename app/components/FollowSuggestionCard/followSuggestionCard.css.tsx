import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: 'transparent',
    },
    list: {
      padding: 0
    },
    listItem: {
      paddingLeft: 0,
      paddingRight: 75,
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
    }
  }),
);