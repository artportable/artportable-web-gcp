import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey'

const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainGrid: {
      display: 'grid',
      height: 'calc(100vh - var(--header-plus-box-shadow-padding))',
      gap: '16px',
      gridTemplate: (
      '\"upload   form\" 2fr' +
      '\"previews form\" 1fr' +
      '/  3fr      1fr'),
      alignItems: 'stretch'
    },
    uploadBox: {
      gridArea: 'upload',
      display: 'grid',
      alignItems: 'center',
      justifyItems: 'center',
      border: '6px dashed ' + grey[500],
      borderRadius: '6px'
    },
    previewsContainer: {
      gridArea: 'previews'
    },
    form: {
      gridArea: 'form'
    }
  }),
);

export default styles;