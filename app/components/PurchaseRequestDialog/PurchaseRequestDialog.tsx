import { Checkbox, Dialog, DialogContent, FormGroup, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import { styles } from "./purchaseRequestDialog.css";
import { useTranslation } from "next-i18next";
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { useRouter } from "next/router";
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../utils/googleAnalytics';
import { UserContext } from "../../contexts/user-context";

interface EmailData {
  email: EmailValue;
}

interface EmailValue {
  value: string;
  error: boolean
}

export default function PurchaseRequestDialog({ open, onClose, props }) {
  const { t } = useTranslation(['art', 'common']);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [messageResponse, setMessageResponse] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [signUpRedirectHref, setSignUpRedirectHref] = useState('');

  const [usersEmail, setUsersEmail] = useState<EmailData>({
    email: { value: '', error: false },
  });
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [formUntouched, setFormUntouched] = useState(true);
  const { email, family_name, given_name, phone } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(usersEmail).some(key => usersEmail[key].error)) {
      setFormHasErrors(true);
    } else if (email.value) {
    setFormHasErrors(false);
    } else {
      setFormHasErrors(false);
    }
  }, [usersEmail]);

  useEffect(() => {
    if (email.value) {
      setFormUntouched(false);
    } else {
      setFormHasErrors(false);
    }
  }, [email.value]);

  const handleChange = (event, key: keyof EmailData) => {
    const newValue: EmailValue = {
      value: event.target.value,
      error: false,
    }

    setUsersEmail(prevValue => ({
      ...prevValue,
      [key]: newValue
    }));
  }

  const validateFormValue = (value, key: keyof EmailData) => {
    if (formUntouched) {
      setFormUntouched(false);
    }

    const isInvalid = checkIsInvalid(value, key);

    const newFormValue: EmailValue = {
      value: value,
      error: isInvalid
    }

    setUsersEmail(prevValue => ({
      ...prevValue,
      [key]: newFormValue
    }));
  }

  const validateEmail = (newValue: string): boolean => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newValue)) {
      return false;
    }
    return true;
  }

  const checkIsInvalid = (newValue: string, key: keyof EmailData): boolean => {
    switch (key) {
      case 'email':
        return validateEmail(newValue);
    }
  }

  const validateField = () => {
    const emailError = checkIsInvalid(usersEmail.email.value, 'email');

    const emailFormValue = {
      email: {
        ...usersEmail.email,
        error: emailError
      },
    }

    setUsersEmail(emailFormValue);

    if (emailError) {
      setFormHasErrors(true);
      return false;
    } else {
      return true;
    }
  }

  const onPurchaseRequestClick = async () => {
    if (validateField()) {
      // api anrop för att maila/skicka meddelande
      const response = await fetch(`${apiBaseUrl}/api/messages/purchaserequest?email=${usersEmail.email.value}&message=${customMessage}&artworkurl=${props.url}&artworkName=${props.title}&artistId=${props.referTo}&artworkImageUrl=${props.imageUrl}`, {
        method: 'GET',
      });
      setMessageResponse(response.status.toString())
    }
  }

  const onCloseClick = () => {
    onClose();
    trackGoogleAnalytics(ActionType.PURCHASE_REQUEST_DIALOG_CLOSE, CategoryType.INTERACTIVE)
    setCustomMessage('');
    setSignUpRedirectHref('');
    setMessageResponse('');
  }

  useEffect(() => {
    if (props) {
      const isDefaultLocale = router.locale == router.defaultLocale;
      const artwork = encodeURIComponent(JSON.stringify({
        title: props.title,
        creator: props.creator,
        url: props.url
      }));
      const redirectHref = `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/${props.pathname}?artwork=${artwork}`
      setSignUpRedirectHref(redirectHref);
    }
  }, []);



  return (
    <Dialog open={open} onClose={onCloseClick}>
      {messageResponse
        ?
        <DialogContent>
          <Typography variant="h3" className={s.thanksTypo}>
            {messageResponse == '200' ?
              t('thanksForInterestTitle')
              :
              t('somethingWentWrongTitle')
            }
          </Typography>

          {messageResponse == '200' ?
            <Typography>
              {t('thanksForInterestText')}
            </Typography>
            :
            t('somethinWentWrongText')
          }
          <div className={s.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              rounded
              onClick={onCloseClick}
            >
              {t('common:words.close')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              rounded
              onClick={() => {
                keycloak.register({
                  locale: router.locale,
                  redirectUri: signUpRedirectHref
                });
                trackGoogleAnalytics(ActionType.SIGN_UP_PURCHASE_REQUEST_AFTER, CategoryType.BUY);
              }}
            >
              {t('createAccountToChat')}
            </Button>
          </div>
        </DialogContent>
        :
        <DialogContent>
          <form className={s.form}>
            <Typography variant="h5" component="h2" className={s.sendMailTypo}>
              {t('sendEmailToArtist')}
            </Typography>
            <TextField
              classes={{
                root: s.textField
              }}
              fullWidth
              id="email"
              placeholder={t('yourEmail')}
              value={email.value ? email.value : usersEmail.email.value}
              error={usersEmail.email.error}
              onChange={(e) => handleChange(e, 'email')}
              onBlur={(e) => validateFormValue(e.target.value, 'email')}
              helperText={usersEmail.email.error ? t('common:emailErrorMessage') : ''}
              variant="outlined"
            >
            </TextField>
            <TextField
              classes={{
                root: s.textFieldMultiline
              }}
              fullWidth
              multiline
              rows={5}
              inputProps={{ maxLength: 500 }}
              placeholder={t('common:messageOptional')}
              onChange={(e) => setCustomMessage(e.target.value)}
              variant="outlined"
            >
            </TextField>
            <FormGroup>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                rounded
                className={s.messageButton}
                onClick={() => {
                  onPurchaseRequestClick();
                  trackGoogleAnalytics(ActionType.PURCHASE_REQUEST_SEND_SIGNED_OUT, CategoryType.BUY)
                }}
                disabled={formHasErrors || formUntouched}
              >
                {t('SendPurchaseRequest')}
              </Button>
            </FormGroup>
          </form>
        </DialogContent>
      }
    </Dialog>
  );
}