import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      [theme.breakpoints.up("mdPlus")]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    titleText: {
      gridArea: 'rightCol',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
    formFields: {
      [theme.breakpoints.up("mdPlus")]: {
        width: '47%',
        paddingRight: '10px',
      },
    },
    tags: {
      marginTop: '20px',
      textAlign: 'center',
      [theme.breakpoints.up("mdPlus")]: {
        width: '47%',
      },
    },
    tagTitle: {
      textAlign: 'left',
      marginBottom: '10px',
      [theme.breakpoints.up("mdPlus")]: {
        textAlign: 'center',
      },
    }
  }),
);
