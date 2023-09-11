import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    secondaryColor: {
      backgroundColor: theme.palette.secondary.main
    },
    counterBox: {
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: theme.spacing(1),
      '& > *': {
        width: '33.3%'
      }
    },
    fullnameConatiner: {
      position: 'absolute',
      top: '20%',
      textAlign: 'center',
      display: 'flex'
    },
    fullName: {
      fontWeight: 600,
    },
    nameMargin:{
      marginTop: '1.5vh'
    },
    title: {
      lineHeight: 1.5,
      fontWeight: 400
    },
    username: {
      lineHeight: 1.5
    },
    noPictureIcon: {
      fontSize: '160px',
      backgroundColor: theme.palette.background.default
    },
    followersButton: {
      display: 'block',
      padding: 0
    },
    followeesButton: {
      display: 'block',
      padding: 0
    }
  })
)
