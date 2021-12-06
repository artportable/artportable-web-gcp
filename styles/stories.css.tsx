import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    firstItem: {
      width: '800px',
      height: '800px',
      backgroundRepeat: 'no-repeat',
      objectFit: 'cover',
      display: 'flex',
      alignItems: 'flex-end',
    },
    containerFirstItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      width: '65%',
      marginLeft: '15px',
      marginBottom: '15px',
    },
    
    publishFirstItem: {
      textAlign: 'right',
      marginInlineEnd: theme.spacing(2),
      fontWeight: 500,
    },
    headingFirstItem: {
    color: 'var(--ion-color-primary)',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
    },
    preambleFirstItem: {
      margin: theme.spacing(2),
    }
  }),
);