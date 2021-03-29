import { styles } from './followSuggestionCard.css'
import AvatarSkeleton from '../AvatarSkeleton/AvatarSkeleton'
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
  const bucketUrl = 'https://artportable-images.s3.eu-north-1.amazonaws.com/Images/'; // TODO: Fetch from config

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('artistsWeThinkYouWouldLike')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
        {!suggestedUsers?.isError ? (
          <List className={s.list} dense>
              {!suggestedUsers ? (
                <div>
                  <AvatarSkeleton></AvatarSkeleton>
                  <AvatarSkeleton></AvatarSkeleton>
                  <AvatarSkeleton></AvatarSkeleton>
                  <AvatarSkeleton></AvatarSkeleton>
                </div>
                ) : (
                suggestedUsers?.map((user) => 
                  <ListItem key={user.UserId} className={s.listItem}>
                    <ListItemAvatar>
                      <Avatar className={s.avatar}>
                        {user?.ProfilePicture ? (
                          <Avatar src={`${bucketUrl}${user?.ProfilePicture}`}
                            alt="Profile picture"
                            style={{ height: '45px', width: '45px' }}
                          />
                        ) : (
                          <AccountCircleIcon style={{ fontSize: 48 }} color="secondary"></AccountCircleIcon>
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={s.listItemText} primary={user.Username} secondary={user.Location} />
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
                )
              )}
          </List>
        ) : (
          <p>Couldn't load recommended users...</p>
        )}
      </CardContent>
    </Card>  
  );
}