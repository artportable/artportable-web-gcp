import {
  Checkbox,
  Dialog,
  DialogContent,
  FormGroup,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import { styles } from "./purchaseRequestDialog.css";
import { useTranslation } from "next-i18next";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import { UserContext } from "../../contexts/user-context";

export default function PurchaseRequestDialog({ open, onClose, props }) {
  const { t } = useTranslation(["art"]);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [messageResponse, setMessageResponse] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const { email, isSignedIn } = useContext(UserContext);

  useEffect(() => {
    if (email.value) {
      setUserEmail(email.value);
    }
    console.log("is signed in: " + isSignedIn.value);
    
  }, []);

  const onPurchaseRequestClick = async () => {
    if (userEmail || email.value) {
      // api anrop för att maila/skicka meddelande
      const response = await fetch(
        `${apiBaseUrl}/api/messages/purchaserequest?email=${userEmail}&message=${customMessage}&artworkurl=${props.url}&artworkName=${props.title}&artistId=${props.referTo}&artworkImageUrl=${props.imageUrl}`,
        {
          method: "GET",
        }
      );
      setMessageResponse(response.status.toString());
    }
  };

  const onCloseClick = () => {
    onClose();
    trackGoogleAnalytics(
      ActionType.PURCHASE_REQUEST_DIALOG_CLOSE,
      CategoryType.INTERACTIVE
    );
    setCustomMessage("");
    setSignUpRedirectHref("");
    setMessageResponse("");
  };

  useEffect(() => {
    if (props) {
      const isDefaultLocale = router.locale == router.defaultLocale;
      const artwork = encodeURIComponent(
        JSON.stringify({
          title: props.title,
          creator: props.creator,
          url: props.url,
        })
      );
      const redirectHref = `${window.origin}${
        isDefaultLocale ? "" : `/${router.locale}`
      }/${props.pathname}?artwork=${artwork}`;
      setSignUpRedirectHref(redirectHref);
    }
  }, []);

  return (
    <Dialog open={open} onClose={onCloseClick}>
      {messageResponse ? (
        <DialogContent>
          <Typography variant="h3" className={s.thanksTypo}>
            {messageResponse == "200"
              ? t("art:thanksForInterestTitle")
              : t("art:somethingWentWrongTitle")}
          </Typography>

          {messageResponse == "200" ? (
            <Typography>{t("art:thanksForInterestText")}</Typography>
          ) : (
            t("art:somethinWentWrongText")
          )}
          <div className={s.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              rounded
              onClick={onCloseClick}
            >
              {t("common:words.close")}
            </Button>
         {!isSignedIn.value && (
             <Button
             variant="contained"
             color="primary"
             disableElevation
             rounded
             onClick={() => {
               keycloak.register({
                 locale: router.locale,
                 redirectUri: signUpRedirectHref,
               });
               trackGoogleAnalytics(
                 ActionType.SIGN_UP_PURCHASE_REQUEST_AFTER,
                 CategoryType.BUY
               );
             }}
           >
             {t("art:createAccountToChat")}
           </Button>

         )

         }
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <form className={s.form}>
            <Typography variant="h5" component="h2" className={s.sendMailTypo}>
              {t("art:sendEmailToArtist")}
            </Typography>
            <Typography>{t("art:fillInYourEmail")}</Typography>
            <TextField
              classes={{
                root: s.textField,
              }}
              fullWidth
              id="email"
              placeholder={t("art:yourEmail")}
              value={email.value ? email.value : null}
              onChange={(e) => setUserEmail(e.target.value)}
              variant="outlined"
            ></TextField>
            <TextField
              classes={{
                root: s.textFieldMultiline,
              }}
              fullWidth
              multiline
              rows={5}
              inputProps={{ maxLength: 500 }}
              placeholder={t("common:messageOptional")}
              onChange={(e) => setCustomMessage(e.target.value)}
              variant="outlined"
            ></TextField>
            <FormGroup>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                rounded
                className={s.messageButton}
                onClick={() => {
                  onPurchaseRequestClick();
                  trackGoogleAnalytics(
                    ActionType.PURCHASE_REQUEST_SEND_SIGNED_OUT,
                    CategoryType.BUY
                  );
                }}
              >
                {t("art:SendPurchaseRequest")}
              </Button>
            </FormGroup>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}