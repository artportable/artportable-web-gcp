import Button from "../../../app/components/Button/Button";
import { useTranslation } from "next-i18next";
import { useRedirectToLoginIfNotLoggedIn } from "../../../app/hooks/useRedirectToLoginIfNotLoggedIn";
import { styles } from "./messageAndFollowButton.css";
import ChatIcon from "@material-ui/icons/Chat";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../../app/utils/googleAnalytics";
import { capitalizeFirst } from "../../../app/utils/util";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../app/contexts/user-context";
import { useBreakpointDown } from "../../../app/hooks/useBreakpointDown";
import AddIcon from "@material-ui/icons/Add";
import usePostFollow from "../../../app/hooks/dataFetching/usePostFollow";
import { TokenContext } from "../../../app/contexts/token-context";

export default function MessageAndFollowButton({
  userProfile,
  userProfileSummary,
}) {
  const s = styles();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const { t } = useTranslation("common");
  const { isSignedIn, username, socialId, membership, phone } =
    useContext(UserContext);
  const [isFollowed, setFollow] = useState(userProfile?.data?.FollowedByMe);
  const smScreenOrSmaller = useBreakpointDown("sm");
  const { follow } = usePostFollow();
  const token = useContext(TokenContext);

  useEffect(() => {
    setFollow(userProfile?.data?.FollowedByMe);
  }, [userProfile?.data?.FollowedByMe]);

  function toggleFollow() {
    redirectIfNotLoggedIn();
    follow(
      userProfileSummary.data?.SocialId,
      !isFollowed,
      socialId.value,
      token
    );
    setFollow(!isFollowed);
  }

  return (
    <div className={s.btnWrapper}>
      <Button
        onClick={() => {
          redirectIfNotLoggedIn({
            pathname: "/messages",
            query: {
              referTo: userProfileSummary.data?.SocialId,
            },
          });
          trackGoogleAnalytics(
            ActionType.SEND_MESSAGE,
            CategoryType.INTERACTIVE
          );
        }}
        className={s.followButton}
        size={smScreenOrSmaller ? "small" : "medium"}
        variant={"contained"}
        startIcon={<ChatIcon color={"inherit"} />}
        disableElevation
        rounded
        disabled={!isSignedIn}
      >
        <div className={s.messageButtonText}>
          {" "}
          {capitalizeFirst(t("common:message"))}
        </div>
      </Button>
      <Button
        className={s.followButton}
        size={smScreenOrSmaller ? "small" : "medium"}
        variant={!isFollowed ? "contained" : "outlined"}
        startIcon={!isFollowed ? <AddIcon /> : null}
        disableElevation
        rounded
        disabled={!isSignedIn}
        onClick={() => {
          toggleFollow();
          !isFollowed
            ? trackGoogleAnalytics(
                ActionType.FOLLOW_PROFILE,
                CategoryType.INTERACTIVE
              )
            : null;
        }}
      >
        {capitalizeFirst(
          !isFollowed ? t("common:words.follow") : t("common:words.following")
        )}
      </Button>
    </div>
  );
}
