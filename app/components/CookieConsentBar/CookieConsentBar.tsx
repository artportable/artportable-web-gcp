import CookieConsent from "react-cookie-consent";
import { styles } from "./cookieConsentBar.css";

export default function CookieConsentBar() {
  const s = styles();

  return (
    <CookieConsent
      disableStyles={true}
      buttonText={"OK"}
      containerClasses={s.cookieConsentBarContainer}
      contentClasses={s.cookieConsentBarContent}
      buttonClasses={s.cookieConsentBarButton}
    >
      {"This website uses cookies."}
      <a href="/gdpr">Read more</a>
    </CookieConsent>
  );
}
