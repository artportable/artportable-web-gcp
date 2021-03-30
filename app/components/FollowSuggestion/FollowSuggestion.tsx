import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import Button from '../Button/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from "react";
import { styles } from "./followSuggestion.css";
import { useTranslation } from "next-i18next";
import { capitalizeFirst } from '../../utils/util';


export default function FollowSuggestionCard({ user, onFollowClick }) {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);

  const bucketUrl = 'https://artportable-images.s3.eu-north-1.amazonaws.com/Images/'; // TODO: Fetch from config

  return (
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
          roundedButton
          onClick={() => onFollowClick(user)}>
            {capitalizeFirst(t('common:words.follow'))}
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );

}
