import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    dialogPaper: {
      overflow: 'visible',
      margin: theme.spacing(10, 4)
    },
    modalHeader: {
      position: 'absolute',
      width: '100%',
      top: theme.spacing(-9),
      left: theme.spacing(0)
    },
    modalContainer: {
      position: 'relative',
      overflow: 'visible',
      '&:focus': {
        outline: 'none'
      },
    },
    modalContent: {
    },
    rightActions: {
      position: 'absolute',
      right: theme.spacing(-6),
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
      maxWidth: '100%',
      borderRadius: theme.spacing(1),
      overflow: 'hidden'
    },
    extraImages: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around'
    }
  }),
);