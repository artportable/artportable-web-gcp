import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiListItemIcon-root': {
        minWidth: 20,
      },
      '& .MuiListItemText-root .MuiListItemText-primary': {
        fontSize: '0.8rem',
      },
      '&.MuiListItem-gutters': {
        paddingLeft: 0,
        paddingRight: 0,
      }
    },
  }),
);


export default function PlansInfoList({ texts, everythingFromPrevious = false}) {
  const classes = useStyles();


  const textsToRender = everythingFromPrevious ? texts.slice(1) : texts;

  return (
    <div>
      <List dense>
        {everythingFromPrevious ? 
        <ListItem classes={classes}>
          <ListItemIcon> 
            <ArrowBackIcon style={{ fontSize: 14 }} color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={texts[0]}
          />
        </ListItem> : <></>}
        
        {textsToRender.map(text => 
        <ListItem classes={classes}>
          <ListItemIcon>
            <CheckIcon style={{ fontSize: 14 }} color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={text}
          />
        </ListItem>
        )}
       
      </List>
    </div>
  );
}