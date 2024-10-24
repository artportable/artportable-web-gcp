import {
  Checkbox,
  Dialog,
  DialogContent,
  FormGroup,
  FormControlLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Grid from "@mui/material/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Button from "../Button/Button";
import { styles } from "./messageRequestDialog.css";
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
import ReCAPTCHA from "react-google-recaptcha";
import { theme } from "../../../styles/theme";

export default function MessageRequestDialog({ open, onClose, props }) {
  const { t } = useTranslation(["common", "art", "forms"]);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const google_captcha = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("smPlus"));
  const [messageResponse, setMessageResponse] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [messageError, setMessageError] = useState(false);
  const [messageHelperText, setMessageHelperText] = useState("");

  const validateMessage = (message) => {
    return message.trim().length > 0;
  };

  const handleMessageBlur = () => {
    if (!validateMessage(customMessage)) {
      setMessageError(true);
      setMessageHelperText(t("forms:requiredMessage"));
    } else {
      setMessageError(false);
      setMessageHelperText("");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    if (userEmail && !validateEmail(userEmail)) {
      setEmailError(true);
      setEmailHelperText(t("forms:invalidEmail"));
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  };

  const { email, phone, given_name, family_name, isSignedIn } =
    useContext(UserContext);

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
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }
    let isValid = true;

    // Validate email
    if (!userEmail || !validateEmail(userEmail)) {
      setEmailError(true);
      setEmailHelperText(t("forms:invalidEmail"));
      isValid = false;
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }

    // Validate message
    if (!validateMessage(customMessage)) {
      setMessageError(true);
      setMessageHelperText(t("forms:requiredMessage"));
      isValid = false;
    } else {
      setMessageError(false);
      setMessageHelperText("");
    }

    if (!isValid) {
      return;
    }

    // Proceed with your API call
    const response = await fetch(
      `${apiBaseUrl}/api/messages/emailmessgerequest?email=${userEmail}&message=${customMessage}&username=${props.referTo}&recaptchaToken=${recaptchaToken}`,
      {
        method: "GET",
      }
    );
    setMessageResponse(response.status.toString());
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
    setRecaptchaToken(null);
  };

  return (
    <Dialog
      fullScreen={isTinyDevice ? false : true}
      open={open}
      onClose={onCloseClick}
      maxWidth={messageResponse ? "sm" : "md"}
    >
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
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <form className={clsx(s.form, s.requestForm)}>
            <Typography
              variant="h3"
              component="h2"
              className={clsx(s.sendMailTypo, s.sendMailHeader)}
              style={{ textAlign: "center" }}
            >
              {t("forms:sendMessageTo")} {props?.userProfile?.data?.Name}{" "}
              {props?.userProfile?.data?.Surname}
            </Typography>
            <IconButton
              aria-label="close"
              className={s.closeButton}
              onClick={onCloseClick}
            >
              <CloseIcon className={s.closeIcon} />
            </IconButton>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 4, md: 6 }}
            >
              <Grid container item xs={12} sm={6} direction="column">
                <Typography variant="body1" component="p">
                  {t("forms:aboutMessages")}
                </Typography>
              </Grid>

              <Grid container item xs={12} sm={6} direction="column">
                <Typography
                  variant="h4"
                  component="h2"
                  className={s.sendMailTypo}
                >
                  {t("forms:aboutYou")}
                </Typography>
                <Typography>{t("forms:email")}*</Typography>
                <TextField
                  classes={{
                    root: s.textField,
                  }}
                  fullWidth
                  id="email"
                  value={userEmail || ""}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  variant="outlined"
                  disabled={isSignedIn?.value}
                  error={emailError}
                  helperText={emailHelperText}
                />

                <Typography>{t("forms:messageToArtist")}*</Typography>
                <TextField
                  classes={{
                    root: s.textFieldMultiline,
                  }}
                  fullWidth
                  multiline
                  required
                  minRows={5}
                  inputProps={{ maxLength: 500 }}
                  placeholder=""
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onBlur={handleMessageBlur}
                  variant="outlined"
                  error={messageError}
                  helperText={messageHelperText}
                />
              </Grid>
            </Grid>
            {/* ReCAPTCHA widget */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <ReCAPTCHA
                sitekey={google_captcha}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>
            <FormGroup style={{ alignItems: "center" }}>
              <Button
                variant="contained"
                rounded
                className={s.messageButton}
                onClick={onPurchaseRequestClick}
              >
                {t("forms:messageRequest")}
              </Button>
            </FormGroup>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
