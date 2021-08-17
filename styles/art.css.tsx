import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    backBtnContainer: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifySelf: 'center',
      width: 'fit-content'
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
    card: {
      marginBottom: '50px',
      width: 'min-content'
    },
    imageContainer: {
      position: 'relative',
      maxWidth: '100%',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      textAlign: 'center',
    },
    primaryImage: {
      maxWidth: '850px',
      maxHeight: '850px'
    },
    infoBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: '5px',
      marginRight: '5px',
    },
    actionBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: '5px',
      marginRight: '5px',
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
      alignItems: 'center'
    },
    extraImage: {
      maxWidth: '400px',
      maxHeight: '400px'
    },
    tagsContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '10px'
    },
    chip: {
      marginRight: '5px'
    },
  }),
);