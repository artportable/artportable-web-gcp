import CookieConsent from "react-cookie-consent";
import { styles } from "./cookieConsentBar.css";
import { useTranslation } from "next-i18next";

export default function CookieConsentBar() {
  const s = styles();
  const { t } = useTranslation([ "index" ]);

  return (
    <CookieConsent
      disableStyles={true}
      buttonText={t("acceptCookies")}
      declineButtonText={t('acceptNecessaryCookies')}
      buttonWrapperClasses={s.cookieConsentBarContainerButtons}
      containerClasses={s.cookieConsentBarContainer}
      contentClasses={s.cookieConsentBarContent}
      buttonClasses={s.cookieConsentBarButton}
      declineButtonClasses={s.cookieConsentBarButton}
      enableDeclineButton={true}
      flipButtons
    >
      <div>
        <img
          alt="Cookie icon"
          src="Cookies_Icon.svg"
          className={s.cookieConsentBarIconClass}
          height={46}
          width={46}
        ></img>
      </div>
      <div>
        <h1 className={s.cookieConsentBarHeadingClass}>
          {t("weUseCookies")}
        </h1>
        <p className={s.cookieConsentBarTextClass}>
        {t("readMoreCookies")}
        </p>
        <a href="/gdpr">{t("cookiePolicy")}</a>
      </div>
    </CookieConsent>
  );
}