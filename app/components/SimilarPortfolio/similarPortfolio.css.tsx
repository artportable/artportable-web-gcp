import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "column"
    },
    images: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "5px"
    },
    imageGrid: {
      display: 'grid',
      gap: "0px 0px",
      gridTemplate: ('\"first first second forth\" 100px ' +
      '\"first first third fifth\" 100px ' +
      '/ 1fr 1fr 1fr 1fr'),
      width: '400px',
      height: '200px'
    },
    first: {
      gridArea: 'first'
    },
    second: {
      gridArea: 'second'
    },
    third: {
      gridArea: 'third'
    },
    forth: {
      gridArea: 'forth'
    },
    fifth: {
      gridArea: 'fifth'
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    avatar: {
      marginRight: "10px"
    },
    userLink: {
      textDecoration: 'none',
      color: 'primary'
    }
  }),
);
