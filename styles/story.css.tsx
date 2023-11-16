import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    story: {
        //width:'800px', 
        marginLeft:'auto', 
        marginRight:'auto',
        maxWidth: '800px',
        //backgroundColor:'#ffffff',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    published: {
        color: '#999999',
        fontSize: '16px',
        //padding: '1rem'
    },
    titleText: {
        //height:'1000px'
        //padding: '0.5rem'
    },
    title: {
        //textAlign:'center',
        fontSize: '38px',

    },
    text: {
        fontSize: '18px',
        padding: '1rem 0px'
    },


  }),
);