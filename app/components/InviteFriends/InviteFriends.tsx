import { RWebShare } from "react-web-share";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next"
import { styles } from './inviteFriends.css';
import { ActionType, trackGoogleAnalytics } from "../../utils/googleAnalytics";

export default function InviteFriends() {
  const { t } = useTranslation(['common']);
  const s = styles();

  return (
    <RWebShare
      data={{
        text: t('common:description'),
        url: "https://artportable.com/register",
        title: t('common:invite'),
      }}
      onClick={() => trackGoogleAnalytics(ActionType.INVITE_PROFILE)}
    >
      <Button
        className={s.buttonFeed}
        size="small"
        rounded
        variant="outlined">
        {t('followersInvite')}
      </Button>
    </RWebShare>
  )
}