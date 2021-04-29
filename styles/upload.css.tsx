import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey'
import { relative } from 'node:path';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainGrid: {
      display: 'grid',
      height: 'calc(100vh - var(--header-plus-box-shadow-padding))',
      gap: '16px',
      gridTemplate: (
      '\"upload   form\" minmax(0, 2fr)' +
      '\"options   form\" auto' +
      '\"previews form\" 1fr' +
      '/  3fr      1fr'),
      alignItems: 'stretch'
    },
    uploadBox: {
      gridArea: 'upload',
      display: 'flex',
      alignItems: 'stretch',
      borderRadius: '6px',
      fontFamily: 'GT-America-Standard' 
    },
    cropperBox: {
      gridArea: 'upload',
      display: 'flex',
      alignItems: 'stretch',
      borderRadius: '6px',
      fontFamily: 'GT-America-Standard' 
    },
    dropzone: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    previewsContainer: {
      gridArea: 'previews',
      position: 'relative',
    },
    form: {
      gridArea: 'form'
    },
    uploadButton: {
      width: '100%',
      marginTop: '20px'
    },
    hide: {
      display: 'none',
    },
    cropperOptions: {
      gridArea: 'options',
      display: 'flex',
      justifyContent: 'space-between'
    },
    cropperPreview: {
      height: '100%',
      maxWidth: '400px',
      overflow: 'hidden',
    },
    startIcon: {
      margin: theme.spacing(0.25, 0),
    },
    deletIconButton: {
      backgroundColor: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.light,
      }
    }
  }),
);

export default styles;