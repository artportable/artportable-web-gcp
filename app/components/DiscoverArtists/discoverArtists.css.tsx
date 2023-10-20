import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    searchField: {
      marginBottom: theme.spacing(4),
    },
    titleEmblem: {
      marginBottom: "40px", 
      marginTop: "40px",
      display: 'flex', 
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent:'center',
      [theme.breakpoints.up('smPlus')]: {
        justifyContent:'flex-start',
      },
    },
    title: {
      fontSize: "23px", 
      fontWeight: "bold", 
      [theme.breakpoints.up('smPlus')]: {
        fontSize: '30px',
      },
    },
    emblem: {
      margin: '0 20px',
      width: '60px'
    },
    [theme.breakpoints.up('smPlus')]: {
      emblem: {
        margin: '0 20px',
        width: '60px'
      },
    },
    discoverArtistWrapper: {
      display:'grid', 
      justifyContent:'center',

      [theme.breakpoints.up('lg')] : {
        gridTemplateColumns:'1fr 1fr',
      },
      [theme.breakpoints.up('lgPlus')] : {
        gridTemplateColumns:'1fr 1fr 1fr',
      },
    },
  }),
);
