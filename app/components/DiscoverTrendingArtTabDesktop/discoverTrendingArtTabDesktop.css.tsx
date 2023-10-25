import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({

    filter: {
      backgroundColor:'transparent !important',
      //Trying to remove the margin increase when Accordion is active
      // margin:'0px',
      // '&.Mui-expanded': {
      //   backgroundColor:'lightblue !important',
      //   maxHeight: '50px',
      //   justifyContent:'center',
      //   alignItems:'start',
      // },
    },

    filterSummary: {
      fontSize:'14px',
      fontWeight: 300,
    },

    filterDetailsTags: {
      display: "flex",
      flexDirection: "column",
      backgroundColor:'#fdf9f7', 
      overflowY: 'scroll',
      position:'absolute', 
      zIndex: 1,
      paddingTop: '10px',
      paddingBottom: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      maxHeight:'400px',
      fontSize:'10px',
      fontWeight: 500,
      borderRadius: "10px"
    },
    filterItemTags: {
      justifyContent:'start', 
      width:'auto',
      paddingBottom:'6px', 
      paddingTop:'6px', 
      paddingRight:'16px',
      paddingLeft:'16px'
    },

    filterDetails: {
      display:'grid', 
      gridTemplateColumns:'1fr',
      position: 'absolute', 
      backgroundColor: '#fdf9f7', 
      zIndex: 1, 
      padding: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      fontSize:'15px',
      fontWeight:500,
      borderRadius: "10px",
      
    },
    filterItem: {
      
      paddingBottom:'6px', 
      paddingTop:'6px', 
      paddingRight:'16px',
      paddingLeft:'16px',
      width:'200px',
      fontWeight: "lighter",
      fontSize: "12px"
    },
    filterIcon: {
      marginRight:'7px',
    },
    filterClearBtn: {
      margin: '6px',
      marginTop: "10px",
      borderRadius: '20px',
      height: '30px',
      width: '100px',
      textAlign: 'center',
      border: '1px solid black',
      color: 'black',
      fontSize: '12px',
      padding: '1px',
    },
    selectedTagWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: "transparent"
    },
    selectedTagsDesktop: {
      textAlign:'center',
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: "10px",
      margin: "4px",
      border: "1px solid black",
      borderRadius: "20px",
      padding: "12px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: 'rgba(0,0, 0, 0.05)'
      }
    },
    removeTagButton: {
      display: 'flex',
      alignItems: 'center',
      cursor: "pointer",
    },
    desktopContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '-30px',
      marginBottom: '10px',
      width: "100%",
      height: '60px',
      justifyContent: 'center'
    },

  })
);