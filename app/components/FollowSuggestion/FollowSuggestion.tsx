import Link from 'next/link'
import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import Button from '../Button/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState } from "react";
import { styles } from "./followSuggestion.css";
import { useTranslation } from "next-i18next";
import { capitalizeFirst } from '../../utils/util';
import AddIcon from '@material-ui/icons/Add';
import * as gtag from '../../../lib/gtag'


export default function FollowSuggestionCard({ user, onFollowClick }) {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);

  const [isFollowed, setFollow] = useState(false);

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  function toggleFollow() {
    onFollowClick(user.SocialId, !isFollowed);
    setFollow(!isFollowed);
  }
  const followButton = () => {
    gtag.event({
      action: "follow_förslag",
      category: "buy",
      label: "",
      value: ""
    })
  }

  return (
    <ListItem key={user.UserId} className={s.listItem}>
      <Link href={`/profile/@${user.Username}`}>
        <a>
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
        </a>
      </Link>
      <Link href={`/profile/@${user.Username}`}>
        <a>
          <ListItemText className={s.listItemText} primary={user.Username} secondary={user.Location} />
        </a>
      </Link>
      <ListItemSecondaryAction className={s.secondaryAction}>
        <Button
          size="small"
          variant={!isFollowed ? "contained" : "outlined"}
          color="primary"
          startIcon={!isFollowed ? <AddIcon/> : null}
          disableElevation
          rounded
          onClick={() => { toggleFollow(); followButton();}}>
            {capitalizeFirst(
              !isFollowed ?
                t('common:words.follow') :
                t('common:words.following')
            )}
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );

}
