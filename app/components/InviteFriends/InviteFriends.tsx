import { RWebShare } from "react-web-share";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next"

export default function InviteFriends() {
  const { t } = useTranslation(['common']);

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
          size="small"
          rounded
          variant="outlined">
          {t('invite')}
        </Button>
      </RWebShare>
    </div>
  )
}