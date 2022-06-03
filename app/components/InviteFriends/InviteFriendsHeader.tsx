import { RWebShare } from "react-web-share";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next"
import { styles } from './inviteFriendsFeed.css';
import { ActionType, trackGoogleAnalytics } from "../../utils/googleAnalytics";

export default function InviteFriendsFeed() {
  const { t } = useTranslation(['common']);
  const s = styles();

  return (
      <RWebShare
        data={{
          text: t('common:description'),
          url: "https://artportable.com",
          title: t('common:invite'),
        }}
        onClick={() => trackGoogleAnalytics(ActionType.INVITE_FEED)}
      >
        <Button
          className={s.buttonFeed}
          size="small"
          variant="primary"
          rounded
          disableElevation >
          {t('invite')}
        </Button>
      </RWebShare>
  )
}