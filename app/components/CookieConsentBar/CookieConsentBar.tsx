import CookieConsent from "react-cookie-consent";
import { styles } from "./cookieConsentBar.css";

export default function CookieConsentBar() {
  const s = styles();

  return (
    <CookieConsent
      disableStyles={true}
      buttonText={"Acceptera cookies"}
      buttonWrapperClasses={s.cookieConsentBarContainerButtons}
      containerClasses={s.cookieConsentBarContainer}
      contentClasses={s.cookieConsentBarContent}
      buttonClasses={s.cookieConsentBarButton}
    >
      <div>
        <img
          src="Cookies_Icon.svg"
          className={s.cookieConsentBarIconClass}
        ></img>
      </div>
      <div>
        <h1 className={s.cookieConsentBarHeadingClass}>
          Vi använder cookies på den här webbplatsen
        </h1>
        <p className={s.cookieConsentBarTextClass}>
          Här kan du läsa mera om hur vi använder cookies på vår webbplats.
        </p>
        <a href="/gdpr">Vår cookie policy</a>
      </div>
    </CookieConsent>
  );
}
