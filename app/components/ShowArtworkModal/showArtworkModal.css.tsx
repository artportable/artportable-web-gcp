import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    modalHeader: {
      position: 'absolute',
      width: '100%',
      top: theme.spacing(-9),
    },
    modalContainer: {
      position: 'relative',
      '&:focus': {
        outline: 'none'
      },
    },
    modalContent: {
    },
    rightActions: {
      position: 'absolute',
      right: theme.spacing(-6)
    },
    colorWhite: {
      color: theme.palette.common.white
    },
    followButton: {
      margin: 0
    },
    backdrop: {
      background: 'rgba(0,0,0,0.7) !important',
    },
    tagsContainer: {
      display: 'flex',
      gap: theme.spacing(1)
    },
    imageContainer: {
      position: 'relative',
      maxWidth: '100%'
    }
  }),
);