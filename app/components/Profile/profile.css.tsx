import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    secondaryColor: {
      backgroundColor: theme.palette.secondary.main
    },

    nameAndFollowContainer: {
      display: '',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
      marginTop: '-30px',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        marginLeft: '10%'
      }
    },

    btnWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-10px',
      [theme.breakpoints.up('smPlus')]: {
        marginLeft: '-4.5vw'
      },
      [theme.breakpoints.up('md')]: {
        marginTop: '0px'
      }
    },

    fullName: {
      fontWeight: 600,
      fontSize: '2rem',
      marginLeft: '0%',
      [theme.breakpoints.up('smPlus')]: {
        marginRight: '3vw'
      },
      [theme.breakpoints.up('mdPlus')]: {
        letterSpacing: '13px'
      }
    },

    location: {
      display: 'none',
      [theme.breakpoints.up('mdPlus')]: {
        display: 'contents',
        paddingRight: '20px'
      }
    },

    fontSize: {
      fontSize: '0.55em',
      [theme.breakpoints.up('smPlus')]: {
        fontSize: '0.85em'
      }
    },
    followerButton: {
      padding: '10px',
      cursor: 'pointer',
      [theme.breakpoints.up('md')]: {
        paddingLeft: '3.5vw'
      }
    },
    followeeButton: {
      cursor: 'pointer'
    },
    artwork: {
      paddingLeft: '10px'
    }
  })
)
