import { Box, ThemeProvider, Typography } from "@material-ui/core";
import CookieConsent from "react-cookie-consent";
import { styles } from './cookieConsentBar.css';
import { CookieOutlined } from "@mui/icons-material";


export default function CookieConsentBar() {
    const s = styles();
    
    return (
        <CookieConsent
            disableStyles={true}
            buttonText={'ACCEPTERAR COOKIES'}
            containerClasses={s.cookieConsentBarContainer}
            contentClasses={s.cookieConsentBarContent}
            buttonClasses={s.cookieConsentBarButton}
            enableDeclineButton flipButtons
            declineButtonText={'AVVISA COOKIES'}
            declineButtonClasses={s.cookieConsentBarButton}
        >

        <img />

        <Typography className={s.cookieHeader}>Vi använder cookies på den här webbplatsen</Typography>
        <Typography className={s.cookieText}>Här kan du läsa mer om hur vi använder cookies på vår webbplats.<br /><a href='/gdpr'> Vår cookie policy</a>
        </Typography>
        </CookieConsent>
    );
}


