import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({

    mobileButton: {
      width: "100%", 
      borderRadius: "20px"
    },

    mobileContainer: {
      display: 'flex', 
      flexDirection: 'column', 
      width: "100%", 
      height: '100%', 
      backgroundColor: "#fdf9f7", 
      overflowY: "scroll",
    },
    mobileList: {
      flexGrow: 1,
    },
    mobileListItem: {
      display: "flex", 
      fontSize: "20px", 
      fontWeight: "bold", 
      padding: "10px" 
    },
    cancelPresentationIcon: {
      marginLeft:'6px',
    },
    mobileAccordionWrapper: {
      textAlign: "center", 
      display: "flex", 
      flexDirection: "column" 
    },
    mobileFormControl: {
      marginTop: "20px", 
      alignItems: "center" 
    },
    mobileAccordion: {
      borderRadius: "20px !important", 
      width: "90%", 
      alignItems: "center",
      backgroundColor: "#faf3ee"
    },
    mobileTitleIcon: {
      display: 'flex',
      alignItems:'flex-end'
    },
    mobileIcon: {
      marginRight:'4px',
    },
    mobileTemp: {
      fontWeight: 'bold'
    },
    mobileOverflow: {
      maxHeight: '300px', 
      overflowY: 'auto'
    },
    mobileTag: {
      fontSize: "12px", 
      fontWeight: "lighter"
    },
    highlightIcon: {
      border: '0px solid #c67777',
      color: '#c67777',
      alignItems: 'center',
      fontSize: "12px"
    },
    mobileSummary: {
      height: '100%'
    },
    activeFilterContainer: {
      position: "fixed", 
      width: "100%", 
      bottom: "0", 
      left: "0"
    },
    activeFilter: {
      display: "flex", 
      backgroundColor: "#faf3ee", 
      justifyContent: "space-between", 
      padding: '10px',
       borderTop: '1px solid #ddd'
    },
    activeFilterClear: {
      backgroundColor: "#fadf87", 
      borderRadius: "20px", 
      padding: "10px", 
      border: "none", 
      color: "black"
    },
    activeFilterResult: {
      backgroundColor: "#02a16c", 
      borderRadius: "20px",
      padding: "10px",
      color: "white"
    },
    tuneIcon: {
      marginLeft: "5px"
    },
    mobileContainer1: {
      marginBottom:'30px'
    },
    selectedTagContainer: {
      display: "flex",

    },
    selectedTags: {
      display: "flex",
      marginTop: "10px",
      flexDirection: "column-reverse",
      padding: "10px",
    },
    selectedTagWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "transparent"
    },
  })
);