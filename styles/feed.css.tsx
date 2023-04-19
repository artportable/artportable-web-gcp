import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      backgroundColor: 'var(--background-color)',
      display: 'flex',
      flexDirection: 'column',
    },
    colLeft: {
      marginBottom: '20px',
      '& .MuiCardContent-root': {
        padding: '28px',
        height: '100%',
        maxHeight: '360px',
      }
    },
    colFeed: {
      display: 'flex',
      flexDirection: 'column',
      '& .MuiCard-root': {
        marginBottom: '10px',
      }
    },
    colFollow: {
      display: 'none',
      '& .MuiCard-root': {
        height: '100%',
        maxHeight: '360px',
      }
    },

    [theme.breakpoints.up('sm')]: {
      colLeft: {
        width: '100%',
        marginRight: '20px',
        marginBottom: 0,
        alignItems: 'center',
        '& .MuiCard-root': {
          height: '100%',
        }
      },
      colFollow: {
        width: '100%',
        display: 'flex',
        '& .MuiCard-root': {
          height: 'fit-content',
          width: '100%',
        },
        '& .MuiCardContent-root': {
          paddingBottom: '10px',
        }
      },
      sidebarLeft: {
        display: 'flex',
        width: '100%',
        marginBottom: '20px',
      },
    },

    [theme.breakpoints.up('mdPlus')]: {
      feedContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      colFollow: {
        display: 'block',
        '& .MuiCardContent-root': {
          padding: '16px 20px 5px 20px',
        }
      },
      sidebarLeft: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '20px',
        width: '100%',
        maxWidth: '350px',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 'calc(var(--header-height) + var(--header-box-shadow-padding))',
      },
      colFeed: {
        width: '100%',
        maxWidth: '400px',
      },
      colLeft: {
        marginBottom: '12px',
        '& .MuiCardContent-root': {
          padding: '20px',
        },
        '& .MuiBox-root': {
          display: 'flex',
          flexDirection: 'row',
        },
      },
    },

    [theme.breakpoints.up('lg')]: {
      colFeed: {
        maxWidth: '600px',
      },
    }
  }),
);