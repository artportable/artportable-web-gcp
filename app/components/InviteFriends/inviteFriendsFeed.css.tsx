import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    buttonFeed: {
      color: '#ffffff',
      backgroundColor: 'var(--color-green)',
      '&.MuiButton-root:hover:hover':{
        backgroundColor: 'var(--color-green-darker)',
      },
      marginTop: '16px',
      height: '28px',
      width: '100%',
    },
  })
);
