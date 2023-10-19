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
      }
      
      // display:'flex',
      // flexWrap:'wrap',
      // flexDirection:'row',
      
      //justifyContent:'space-evenly'
    },
  }),
);
