import { styles } from "./followSuggestionCard.css";
import AvatarSkeleton from "../AvatarSkeleton/AvatarSkeleton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader, Avatar } from "@material-ui/core";
import { List } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import React from "react";
import FollowSuggestion from "../FollowSuggestion/FollowSuggestion";
import InviteFriendsFeed from "../InviteFriends/InviteFriendsFeed";

export default function FollowSuggestionCard({
  suggestedUsers,
  onFollowClick,
}) {
  const s = styles();
  const { t } = useTranslation(["feed", "common"]);

  const noOfSuggestions = 4;

  return (
    <Card elevation={2}>
      <div className={s.flexCard}>
        <CardHeader
          title={t("artistsWeThinkYouWouldLike")}
          titleTypographyProps={{ variant: "subtitle1" }}
        ></CardHeader>
      </div>
      <CardContent>
        {!suggestedUsers?.isError ? (
          <List className={s.list} dense>
            {!suggestedUsers ? (
              <div>
                <AvatarSkeleton></AvatarSkeleton>
                <AvatarSkeleton></AvatarSkeleton>
                <AvatarSkeleton></AvatarSkeleton>
                <AvatarSkeleton></AvatarSkeleton>
                <AvatarSkeleton></AvatarSkeleton>
              </div>
            ) : suggestedUsers.length !== 0 && suggestedUsers.length > 0 ? (
              suggestedUsers
                ?.slice(0, noOfSuggestions)
                .map((user) => (
                  <FollowSuggestion
                    key={user.Username}
                    user={user}
                    onFollowClick={onFollowClick}
                  ></FollowSuggestion>
                ))
            ) : (
              <>
                <p className={s.nothing}>{t("noRecommendedUsers")}</p>
              </>
            )}
          </List>
        ) : (
          <p>{t("recommendedUsersError")}</p>
        )}
      </CardContent>
    </Card>
  );
}
