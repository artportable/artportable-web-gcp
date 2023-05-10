import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
createStyles({
    cardLayout: {
        marginBottom: '10px',
        '& :hover': {
            textDecoration: 'none',
        }
    },
    cardHeaderContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .MuiBox-root": {
          paddingRight: "20px",
          fontSize: "14px",
        },
    },
    cardHeader: {
      padding: "12px",
      alignItems: "center",
      '& .MuiTypography-body2': {
        color: '#000000',
      }
    },
    cardContent: {
        padding: '0px 24px 20px 24px',
    }
}))