import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: 0
    },
    nothing: {
      fontStyle: "italic",
      textAlign: "center"
    },
    flex: {
      display: 'flex',
    },
    divInviteButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '16px 16px 0 16px 0',
      wrap: 'nowrap'
    }
  }),
);