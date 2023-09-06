import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({

    displayText: {
        zIndex: 10,
            color: "#3e3e3e",
            fontWeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            fontSize: "14px",
            marginTop: "10px",
            width: "95%",
            [theme.breakpoints.up("smPlus")]: {
                fontSize: "22px",
                fontWeight: 400,
                
        
              },
    }
  }),
);