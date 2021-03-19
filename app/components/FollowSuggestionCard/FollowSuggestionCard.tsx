import { styles } from './followSuggestionCard.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { CardHeader, Avatar } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next';
import { capitalizeFirst } from '../../utils/util';

export default function FollowSuggestionCard({ suggestedUsers }) {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);  

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('artistsWeThinkYouWouldLike')} 
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
                  {capitalizeFirst(t('common:words.follow'))}
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>  
  );
}