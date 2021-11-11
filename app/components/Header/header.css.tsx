import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: theme.palette.background.default,
      boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
      width: 'calc(100% + 10px)',
    },
    container: {
      display: 'flex',
      width: '100%',
      height: 'var(--header-height, 70px)',
      gap: '0 16px',
      alignItems: 'center',
    },
    logoContainer: {
      flexGrow: 1,

      flexBasis: '100%',
      position: 'relative',
      '& a': {
        position: 'absolute',
        right: 'calc(50% - 72px)',
        bottom: '-13px',
      }
    },
    menuIcon: {
      display: 'none',
      gridArea: 'menu'
    },
    logo: {
      width: '135px',
      paddingTop: theme.spacing(0.2)
    },
    navigation: {
      display: 'none'
    },
    discover: {
      display: 'none',
    },
    language: {
      display: 'none',
      gridArea: 'language',
    },

    login: {
      display: 'none',
    },
    upload: {
      display: 'none',
      whiteSpace: 'nowrap',
    },
    uploadButton: {
      whiteSpace: 'nowrap'
    },
    singleNotificationButton: {
      minWidth: '54px'
    },

    notificationButton: {
      width: '54px',
      display: 'flex',
      '& > *': {
        margin: 'auto'
      },

      '& .raf-icon-badge svg': {
        fill: theme.palette.secondary.main
      },
      '& .raf-icon-badge:hover svg': {
        fill: theme.palette.secondary.main
      }
    },

    [theme.breakpoints.up('sm')]: {
      language: {
        display: 'initial',
      },
      logoContainer: {
        flexBasis: 'initial',
        '& a': {
          position: 'static'
        }
      }
    },
    
    [theme.breakpoints.up('smPlus')]:{
      menuIcon: {
        display: 'initial',
      },
      menuIconWithBadge: { 
        display: 'none',
      },
      singleNotificationButton: {
        display: 'none',
      
      },
      login: {
        display: 'flex',
        alignItems: 'center',
        gridArea: 'login',
        '& .MuiButton-root .MuiButton-label': {
            margin: theme.spacing(0, 2)
        },
        '& > *': {
          margin: theme.spacing(0, 1)
        },
        '& > .MuiIconButton-root': {
          padding: theme.spacing(0.5)
        }
      },
      language: {
        display: 'initial'
      },
    },

    [theme.breakpoints.up('md')]: {
      toolbar: {
        backgroundColor: theme.palette.background.default,
        boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
        width: 'calc(100% + 10px)',
        '&.MuiPaper-elevation0': {
          boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
        }
      },
      container: {
        display: 'grid',
        width: '100%',
        height: 'var(--header-height, 70px)',
        gap: '0 16px',
        alignItems: 'center',
        justifyItems: 'start',
        gridTemplate: (
        '\"menu logo navigation login language\" auto' +
        '/ auto auto 1fr auto auto'
        ),
      },
      
      upload: {
        display: 'initial'
      },
      logo: {
        width: '188px'
      }
    },
    text: {
      fontSize: '18px',
    },
    
    iconButtons: {
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.up('mdPlus')]: {
      menuButton: {
        // display: 'none',
      },
      navigation: {
        display: 'initial',
        gridArea: 'navigation',
        marginLeft: '20px',
      },
    },
  }),
);