import React from "react";
import { Activity, NotificationActivity, UR } from "getstream";
import { Button } from "@material-ui/core";
import Link from "next/link";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import { useGetUserProfilePicture } from "../../hooks/dataFetching/UserProfile";
import { useGetUsernameFromSocialId } from "../../hooks/dataFetching/useGetUsernameFromSocialId";

type NotificationItemProps = {
  notificationActivity: NotificationActivity;
};

type ArtworkActivity = {
  artwork: Artwork;
} & Activity<UR>;

type Artwork = {
  id: string;
  title: string;
};

const NotificationItem = (props: NotificationItemProps) => {
  const { notificationActivity } = props;
  const { data: username } = useGetUsernameFromSocialId(
    notificationActivity.activities[0].actor
  );
  const profilePictue = useGetUserProfilePicture(username);

  switch (notificationActivity.verb) {
    case "follow":
      return (
        <>
          <Link href={`/profile/@${username}`}>
            <a>
              <Button
                color={notificationActivity.is_seen ? "secondary" : undefined}
                startIcon={
                  <ProfileAvatar
                    profilePicture={
                      !profilePictue.isLoading &&
                      profilePictue.data &&
                      !profilePictue.isError
                        ? profilePictue.data
                        : null
                    }
                    size={30}
                  ></ProfileAvatar>
                }
              >
                {username} started following you
              </Button>
            </a>
          </Link>
        </>
      );
    case "like":
      var activity = notificationActivity.activities[0] as ArtworkActivity;
      return (
        <>
          <Link href={`/art/${activity.artwork.id}`}>
            <a>
              <Button
                color={notificationActivity.is_seen ? "secondary" : undefined}
                startIcon={
                  <ProfileAvatar
                    profilePicture={
                      !profilePictue.isLoading &&
                      profilePictue.data &&
                      !profilePictue.isError
                        ? profilePictue.data
                        : null
                    }
                    size={30}
                  ></ProfileAvatar>
                }
              >
                {username}{" "}
                {notificationActivity.actor_count > 1
                  ? `and ${notificationActivity.actor_count - 1} others like`
                  : "likes"}{" "}
                your artwork
              </Button>
            </a>
          </Link>
        </>
      );
  }
};

export default NotificationItem;
