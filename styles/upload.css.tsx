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
      '\"previews form\" minmax(0, 1fr)' +
      '/  3fr      1fr'),
      alignItems: 'stretch'
    },
    uploadBox: {
      gridArea: 'upload',
      display: 'flex',
      borderRadius: '6px',
      fontFamily: 'GT-America-Standard' 
    },
    cropperBox: {
      gridArea: 'upload',
      display: 'flex',
      borderRadius: '6px',
      fontFamily: 'GT-America-Standard' 
    },
    cropper: {
      width: '100%',
      height: '100%',
    },
    dropzone: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    previewsContainer: {
      gridArea: 'previews',
      position: 'relative',
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplate: "1fr / repeat(3, minmax(0, 1fr))",
      gap: theme.spacing(2),
      paddingBottom: theme.spacing(4),
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
    cropperPreview: {
      height: '100%',
      maxWidth: '400px',
      minWidth: '100%',
      minHeight: '100%',
      overflow: 'hidden',
    }
  }),
);

export default styles;