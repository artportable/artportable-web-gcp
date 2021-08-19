import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    backBtnContainer: {
      alignSelf: 'flex-start'
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifySelf: 'center',
    },
    paper: {
      maxWidth: '100%'
    },
    avatar: {
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    followButton: {
      maxHeight: '30px'
    },
    imageContainer: {
      position: 'relative',
      maxWidth: '100%',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      textAlign: 'center',
    },
    primaryImage: {
      minWidth: '100%',
      width: '100%',
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: 'calc(100vh - var(--header-plus-box-shadow-padding) - 16px)',
      objectFit:  'contain'
    },
    infoBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: theme.spacing(1.6),
      marginRight: theme.spacing(1.6),
    },
    actionBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      alignItems: 'center'
    },
    text: {
      marginLeft: '10px',
      marginRight: '10px',
      paddingBottom: '10px'
    },
    extraImages: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      '& :not(:first-child)': {
        marginLeft: theme.spacing(2),
      }
    },
    extraImage: {
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: '50vh',
      width: '100%'
    },
    tagsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: '10px'
    },
    chip: {
      marginRight: '5px'
    },
  }),
);