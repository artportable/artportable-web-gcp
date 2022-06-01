import { RWebShare } from "react-web-share";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next"
import { styles } from './inviteFriendsFeed.css';

export default function InviteFriendsFeed() {
  const { t } = useTranslation(['common']);
  const s = styles();

  return (
    <div>
      <RWebShare
        data={{
          text: t('common:description'),
          url: "https://beta.artportable.com/register",
          title: t('common:invite'),
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button
          className={s.buttonFeed}
          size="small"
          variant="contained"
          color="primary"
          disableElevation >
          {t('invite')}
        </Button>
      </RWebShare>
    </div>
  )
}