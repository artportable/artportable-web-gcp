import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiCardContent-root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiList-root': {
          flexGrow: 1,
        },
        '& a': {
          alignSelf: 'center'
        },
        '& .MuiButton-root': {
          minWidth: '155px'
        }
      }
    },
  }),
);