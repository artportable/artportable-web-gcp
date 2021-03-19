import { styles } from './followSuggestionCard.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { CardHeader, Avatar } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '../Button/Button'

export default function FollowSuggestionCard({ userId }) {
  const s = styles();

  //TODO: Load suggestions here
  const suggestedUsers = [
    {
      id: "fkds",
      username: "BigArtist",
      location: "Stockholm"
    },
    {
      id: "fsadakds",
      username: "RautaKankkisaaaaaaaaaaaaaaaaaaaa",
      location: "Helsinkki, Finlandiadaiddiaais"
    }
  ];

  return (
    <Card elevation={2}>
      <CardHeader 
        title="Konstnärer vi tror du skulle gilla" 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
        <List className={s.list} dense>
          {suggestedUsers.map(user => 
            <ListItem key={user.id} className={s.listItem}>
              <ListItemAvatar>
                <Avatar className={s.avatar}>
                  <AccountCircleIcon style={{ fontSize: 48 }} color="secondary"></AccountCircleIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={s.listItemText} primary={user.username} secondary={user.location} />
              <ListItemSecondaryAction className={s.secondaryAction}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                  roundedButton>
                  Följ
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>  
  );
}