import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.common.white,
      width: "40px",
      height: "40px",
      margin: "10px"
    },
  }),
);

export default styles;
