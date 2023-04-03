import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: 0
    },
    nothing: {
      fontStyle: "italic",
      textAlign: "center",
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      '& .MuiCardHeader-root': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      },
      '& .MuiTypography-subtitle1': {
        fontWeight: 500,
        fontSize: '14px',
        textAlign: 'center',
      }
    },
    divInviteButton: {
      display: 'flex',
      justifyContent: 'center',
    }
  }),
);