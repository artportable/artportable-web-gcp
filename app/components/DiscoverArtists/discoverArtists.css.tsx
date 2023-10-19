import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    searchField: {
      marginBottom: theme.spacing(4),
    },
    discoverArtistWrapper: {
      display:'grid', 
      //gridTemplateColumns:'1fr',
      justifyContent:'center',

      [theme.breakpoints.up('lg')] : {
        gridTemplateColumns:'1fr 1fr',
      },
      [theme.breakpoints.up('lgPlus')] : {
        gridTemplateColumns:'1fr 1fr 1fr',
      },
      
      // display:'flex',
      // flexWrap:'wrap',
      // flexDirection:'row',
      
      //justifyContent:'space-evenly'
    },
    emblem: {
      width: '25px',
      height: "50px",
      justifySelf: 'center',
    },
    [theme.breakpoints.up('smPlus')]: {
      emblem: {
        margin: '0 20px',
        width: '60px'
      },
    },
  }),
);
