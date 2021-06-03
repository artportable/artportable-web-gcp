import { makeStyles, createStyles } from '@material-ui/core/styles';
import { theme } from '../../../styles/theme';

export const styles = makeStyles(() =>
  createStyles({
    card: {
      overflow: 'hidden',
    },
    imageGrid: {
      display: 'grid',
      gap: "0px 0px",
      gridTemplate: ('\"first first second forth\" 100px ' +
      '\"first first third fifth\" 100px ' +
      '/ 25% 25% 25% 25%'),
      
    },
    image: {
      objectFit: 'cover',
      width: '100%',
      height: '100%'
    },
    first: {
      gridArea: 'first',
      position: 'relative'
    },
    second: {
      gridArea: 'second',
      position: 'relative'
    },
    third: {
      gridArea: 'third',
      position: 'relative'
    },
    forth: {
      gridArea: 'forth',
      position: 'relative'
    },
    fifth: {
      gridArea: 'fifth',
      position: 'relative'
    },
    footer: {
      display: "flex",
      gap: theme.spacing(1),
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing(0.6, 0.6)
    },
    userLink: {
      textDecoration: 'none',
      color: 'primary'
    }
  }),
);
