import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { columnGap, rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      ...columnGap(32),
      marginBottom: "0.5vh",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      backgroundColor: "white",
    },

    rightCol: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "calc(280px + 40vw)",
      justifyContent: "center",
      ...columnGap(16),
    },

    [theme.breakpoints.up("smPlus")]: {
      container: {
        ...columnGap(0),
      },
    },
    [theme.breakpoints.up("lgPlus")]: {
      container: {
        // display: 'grid',
        // alignItems: 'start',
        // ...rowGap(16),
        // gridTemplate: '"mainCard   rightCol" auto' + '/  7fr         3fr'
      },
      rightCol: {
        // gridArea: 'rightCol',
        // display: 'flex',
        // flexDirection: 'column',
        // ...columnGap(16)
      },
    },
  })
);
