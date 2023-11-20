import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    story: {
        marginLeft:'auto', 
        marginRight:'auto',
        maxWidth: '800px',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    published: {
        color: '#999999',
        fontSize: '16px',
    },
    title: {
        fontSize: '38px',
    },
    text: {
        fontSize: '18px',
        padding: '1rem 0px'
    },
    editButton: {
    },
    writerContainer: {
        marginTop:'2rem',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    writerImage: {
        height: "120px", 
        width: "120px"
    }

  }),
);