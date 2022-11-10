import { ThemeProvider, Typography } from "@material-ui/core";
import CookieConsent from "react-cookie-consent";
import { styles } from './cookieConsentBar.css';
import { theme } from "../../../styles/theme";
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';



export default function CookieConsentBar() {
    const s = styles();
    
    return (
        <CookieConsent
            disableStyles={true}
            buttonText={'Acceptera'}
            containerClasses={s.cookieConsentBarContainer}
            contentClasses={s.cookieConsentBarContent}
            buttonClasses={s.cookieConsentBarButton}
            enableDeclineButton flipButtons
            declineButtonText={'Neka'}
            declineButtonClasses={s.cookieConsentBarButton}
        >
        <h2><CookieOutlinedIcon />Vi använder cookies på den här webbplatsen.</h2>
        <h4>Här kan du läsa mer om hur vi använder cookies på vår webbplats. <a href='/gdpr'> Vår cookie policy</a></h4>
        </CookieConsent>
    );
}


