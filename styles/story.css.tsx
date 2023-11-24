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
    publishShare: {
        display: 'flex', 
        alignItems: 'center'
    },
    published: {
        color: '#999999',
        fontSize: '16px',
        marginRight:'10px'
    },
    title: {
        fontSize: '38px',
        textAlign: 'center'
    },
    text: {
        fontSize: '18px',
        padding: '1rem 0px',
        lineHeight:'1.7em',
    },
    btnContainer: {
        display:'flex', 
        justifyContent:'center',
        gap: 20
    },
    editButton: {
        backgroundColor: "#ffd700",
        '&:hover': {
            backgroundColor: "#ffd700",
        }
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
    },
    shareButton: {
        height:'28px', 
        backgroundColor:'#ffd700',
        '&:hover': {
            backgroundColor:'#ffd700'
        }
      },

  }),
);