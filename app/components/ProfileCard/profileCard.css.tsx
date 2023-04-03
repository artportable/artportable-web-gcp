import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    secondaryColor: {
      backgroundColor: theme.palette.secondary.main
    },
    avatar: {
      backgroundColor: 'transparent',
      border: `0.15rem solid ${theme.palette.common.white}`,
      width: 120,
      height: 120
    },
    badgeIcon: {
      backgroundColor: 'white',
      borderRadius: '50%',
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.dark,
      }
    },
    counterBox: {
      display: 'flex',
      justifyContent: 'space-evenly',
      marginTop: '16px',
      '& > *': {
        width: '33.3%'
      },
      '& .MuiButton-label': {
        display: 'flex',
        flexDirection: 'row',
      },
      '& .MuiTypography-body2': {
        marginRight: '10px',
        fontWeight: 500,
        fontSize: '14px',
      },
      '& .MuiTypography-caption': {
        fontSize: '14px',
      },
    },

    fullName: {
      fontWeight: 600
    },
    title: {
      lineHeight: 1.5,
      fontWeight: 400
    },
    username: {
      lineHeight: 1.5,
    },
    noPictureIcon: {
      fontSize: '160px',
      backgroundColor: theme.palette.background.default,
    },
    followersButton: {
      display: 'block',
      padding: 0,
    },
    uploadArtButton: {
      background: '#000000',
      color: '#FFFFFF',
      textTransform: 'uppercase',
      width: '100%',
      marginTop: '20px',
      padding: '8px',
      '& .MuiButton-label': {
        fontSize: '12px',
      }
    },

    profileBox: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0',
    },
    profileData: {
      textAlign: 'center',
      width: '100%',
    },
    uploadButtons: {
      display: 'flex',
      width: '100%',
      maxWidth: '350px',
      justifyContent: 'center',
      '& a': {
        width: '100%',
      },
    },

    [theme.breakpoints.up('sm')]: {
      profileData: {
        marginLeft: '40px',
        '& .MuiBox-root': {
            justifyContent: 'flex-start !important',
        },
      },
      followersButton: {
        '& .MuiButton-label': {
            justifyContent: 'flex-start',
        }
      },
      uploadButtons: {
        width: '100%',
        maxWidth: '260px',
      },
      uploadArtButton: {
        marginTop: '28px',
        padding: '10px',
      },
      counterBox: {
        width: '60%',
        justifyContent: 'flex-start',
        '& .MuiTypography-body2': {
          marginRight: '20px',
          fontSize: '14px',
        },
        '& .MuiTypography-caption': {
          fontSize: '14px',
        }
      },
    },

    [theme.breakpoints.up('md')]: {
      uploadArtButton: {
        marginBottom: 0,
        marginTop: '20px',
      },
      profileBox: {
        width: '100%',
      },
      uploadButtons: {
        maxWidth: '300px',
      },
      counterBox: {
        flexDirecrion: 'row',
        marginRight: 0,
        width: '100%',
        justifyContent: 'space-between',
        '& .MuiTypography-body2': {
            marginRight: '5px',
          },
      },
      profileData: {
        marginLeft: '10px',
      }
    }
  }),
);