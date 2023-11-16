import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    story: {
        //width:'800px', 
        marginLeft:'auto', 
        marginRight:'auto',
        maxWidth: '850px',
        backgroundColor:'#ffffff',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    published: {
        color: '#999999',
        fontSize: '16px',
        padding: '2rem'
    },
    titleText: {
        //height:'1000px'
        padding: '2rem'
    },
    title: {
        //textAlign:'center',
        fontSize: '38px',
        marginBottom: '20px',
    },
    text: {
        fontSize: '18px',
        padding: '1.5rem 0px'
    },


  }),
);