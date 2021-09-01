import React, { useEffect, useRef, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import { Activity, NotificationActivity, connect, FeedAPIResponse, RealTimeMessage, StreamFeed, UR } from 'getstream'
import { Badge, Button, Collapse, debounce, List, ListItem, Typography } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Link from 'next/link'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import { useGetUserProfilePicture } from '../../hooks/dataFetching/UserProfile'
import { profile } from 'node:console'

type NotificationItemProps = {
  notificationActivity: NotificationActivity;
};

type ArtworkActivity = {
  artwork : Artwork;
} & Activity<UR>

type Artwork = {
  id : string;
  title : string;
}

const NotificationItem = (props: NotificationItemProps) => {
  const { notificationActivity } = props;
  const profilePictue = useGetUserProfilePicture(notificationActivity.activities[0].actor);

  switch (notificationActivity.verb) {
    case ('follow'):
      return (
        <>
          <Link href={`/profile/@${notificationActivity.activities[0].actor}`}>
            <a>
              <Button
                color={notificationActivity.is_seen ? 'secondary' : undefined}
                startIcon={<ProfileAvatar profilePicture={(!profilePictue.isLoading && profilePictue.data && !profilePictue.isError) ? profilePictue.data : null} size={30}></ProfileAvatar>}>
                {notificationActivity.activities[0].actor} started following you
              </Button>
            </a>
          </Link>
        </>
      )
    case ('like'):
      var activity = notificationActivity.activities[0] as ArtworkActivity;
      return (
        <>
          <Link href={`/art/${activity.artwork.id}`}>
            <a>
              <Button
                color={notificationActivity.is_seen ? 'secondary' : undefined}
                startIcon={<ProfileAvatar profilePicture={(!profilePictue.isLoading && profilePictue.data && !profilePictue.isError) ? profilePictue.data : null} size={30}></ProfileAvatar>}>
                {notificationActivity.activities[0].actor} {notificationActivity.actor_count > 1 ? `and ${notificationActivity.actor_count - 1} others like` : 'likes' } your artwork
              </Button>
            </a>
          </Link>
        </>
      )
  }
}

export default NotificationItem;