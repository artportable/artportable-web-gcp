import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    unread: {
      fontWeight: 800,
      position: 'relative',
      '& .channel-preview__content-name': {
        fontWeight: 800,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        right: '-18px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: theme.palette.primary.main
      }
    }
  }),
);

export default styles;
