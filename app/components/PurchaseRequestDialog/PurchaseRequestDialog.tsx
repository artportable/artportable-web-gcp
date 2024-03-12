import {
  Checkbox,
  Dialog,
  DialogContent,
  FormGroup,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import Grid from '@mui/material/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useContext, useEffect, useState } from "react";
import clsx from 'clsx'
import Button from "../Button/Button";
import { styles } from "./purchaseRequestDialog.css";
import { useTranslation } from "next-i18next";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import { Link } from 'next/link'
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import { UserContext } from "../../contexts/user-context";

export default function PurchaseRequestDialog({ open, onClose, props }) {
  const { t } = useTranslation(["common", "art", "forms"]);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [messageResponse, setMessageResponse] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const { email, phone, given_name, family_name, isSignedIn } = useContext(UserContext);

  useEffect(() => {
    if (email.value) {
      setUserEmail(email.value);
    }
    if (phone.value) {
      setUserPhone(phone.value);
    }
    if (given_name.value && family_name.value) {
      setUserName(`${given_name.value} ${family_name.value}`);
    }
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
      const redirectHref = `${window.origin}${isDefaultLocale ? "" : `/${router.locale}`
        }/${props.pathname}?artwork=${artwork}`;
      setSignUpRedirectHref(redirectHref);
    }
  }, []);

  return (
    <Dialog open={open} onClose={onCloseClick} maxWidth={ messageResponse ? 'sm' : 'md' }>
      {messageResponse ? (
        <DialogContent>
          <Typography variant="h3" className={s.thanksTypo}>
            {messageResponse == "200"
              ? t("thanksForYourInterestTitle")
              : t("somethingWentWrongTitle")}
          </Typography>

          {messageResponse == "200" ? (
            <Typography>{t("thanksForYourInterestText")}</Typography>
          ) : (
            t("somethinWentWrongText")
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
                {t("createAccountToChat")}
              </Button>
            )}
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <form className={clsx(s.form, s.requestForm)}>
            <Typography variant="h3" component="h2" className={clsx(s.sendMailTypo, s.sendMailHeader)} style={{ textAlign: 'center' }}>
              {t("forms:purchaseRequest")}
            </Typography>
            <IconButton
              aria-label="close"
              className={s.closeButton}
              onClick={onCloseClick}
            >
              <CloseIcon className={s.closeIcon} />
            </IconButton>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
              <Grid container item xs={12} sm={6} direction="column" >
                <Typography variant="body1" component="p">
                  {t("forms:aboutRequests")}
                </Typography>
              </Grid>
              <Grid container item xs={12} sm={6} direction="column" >
                <Typography variant="h4" component="h2" className={s.sendMailTypo}>
                  {t("forms:aboutYou")}
                </Typography>
                {/*<Typography>{t("forms:name")}*</Typography>
                <TextField
                  classes={{
                    root: s.textField,
                  }}
                  // className={clsx(s.textField, s.requestForm)}
                  fullWidth
                  id="name"
                  placeholder={''}
                  value={userName ? userName : ''}
                  onChange={(e) => setUserName(e.target.value)}
                  variant="outlined"
                ></TextField>*/}
                <Typography>{t("forms:email")}*</Typography>
                <TextField
                  classes={{
                    root: s.textField,
                  }}
                  fullWidth
                  id="email"
                  placeholder={''}
                  // value={email.value ? email.value : ''}
                  value={userEmail ? userEmail : ''}
                  onChange={(e) => setUserEmail(e.target.value)}
                  variant="outlined"
                  disabled={isSignedIn?.value}
                ></TextField>

                {/*<Typography>{t("forms:phone")}</Typography>
                <TextField
                  classes={{
                    root: s.textField
                  }}
                  fullWidth
                  placeholder={''}
                  value={userPhone ? userPhone : ''}
                  onChange={(e) => setUserPhone(e.target.value)}
                  variant="outlined"
                ></TextField>*/}
                <Typography>{t("forms:messageToArtist")}</Typography>
                <TextField
                  classes={{
                    root: s.textFieldMultiline,
                  }}
                  fullWidth
                  multiline
                  minRows={5}
                  inputProps={{ maxLength: 500 }}
                  placeholder={''}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  variant="outlined"
                ></TextField>
              </Grid>
            </Grid>

            <FormGroup style={{ alignItems: 'center' }}>
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
                {t("forms:sendRequest")}
              </Button>
            </FormGroup>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

/*
<DialogContent>
          <form className={s.form}>
            <Typography variant="h5" component="h2" className={s.sendMailTypo}>
              {t("sendEmailToArtist")}
            </Typography>
            <Typography>{t("fillInYourEmail")}</Typography>
            <TextField
              classes={{
                root: s.textField,
              }}
              fullWidth
              id="email"
              placeholder={t("yourEmail")}
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
                {t("SendPurchaseRequest")}
              </Button>
            </FormGroup>
          </form>
        </DialogContent>
        */