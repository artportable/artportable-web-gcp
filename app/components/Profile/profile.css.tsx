import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    secondaryColor: {
      backgroundColor: theme.palette.secondary.main
    },

    nameAndFollowContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
      marginTop: '-30px',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }
    },

    btnWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    fullName: {
      fontWeight: 600,
      fontSize: '2rem',
      justifyContent:'center',
      textAlign:'center',
      [theme.breakpoints.up('mdPlus')]: {
        letterSpacing: '13px'
      }
    },


    fontSize: {
      [theme.breakpoints.up('md')]: {
        fontSize: '1em'
      }
    },
    followerButton: {
      margin: '10px',
      cursor: 'pointer',
    },

    followeeButton: {
      cursor: 'pointer',
    },
    artwork: {
      paddingLeft: '10px'
    }
  })
)
