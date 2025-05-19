import { RWebShare } from "react-web-share";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next";
import { styles } from "./inviteFriendsFeed.css";
import { ActionType, trackGoogleAnalytics } from "../../utils/googleAnalytics";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context";

export default function InviteFriendsFeed() {
  const { t } = useTranslation(["common"]);
  const s = styles();
  const { username } = useContext(UserContext);

  const userProfileUrl = `https://artportable.com/profile/@${username.value}`;
  return (
    <RWebShare
      data={{
        text: t("common:description"),
        url: userProfileUrl,
        title: t("common:inviteFriends"),
      }}
      onClick={() => trackGoogleAnalytics(ActionType.INVITE_FEED)}
    >
      <Button
        className={s.buttonFeed}
        size="small"
        variant="contained"
        rounded
        disableElevation
      >
        {t("inviteFriends")}
      </Button>
    </RWebShare>
  );
}
