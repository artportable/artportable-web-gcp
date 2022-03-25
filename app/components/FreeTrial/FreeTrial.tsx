import { Typography, TextField, Snackbar } from "@material-ui/core";
import Alert, { Color } from '@material-ui/lab/Alert'
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { styles } from "./freeTrial.css";
import { zapierFreeTrial } from "../../utils/zapierLead";

interface ZendeskFormData {
  email: FormValue;
}

interface FormValue {
  value: string;
  error: boolean
}

export default function FreeTrial() {
  const { t } = useTranslation(['trial']);
  const s = styles();
  const [sentEmail, setSentEmail] = useState(false)
  const [formData, setFormData] = useState<ZendeskFormData>({
    email: { value: '', error: false },
  });
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [formUntouched, setFormUntouched] = useState(true);


  useEffect(() => {
    if (Object.keys(formData).some(key => formData[key].error)) {
      setFormHasErrors(true);
    } else {
      setFormHasErrors(false);
    }
  }, [formData]);

  const handleChange = (event, key: keyof ZendeskFormData) => {
    validateFormValue(event.target.value, 'email');
    const newValue: FormValue = {
      value: event.target.value,
      error: false,
    }

    setFormData(prevValue => ({
      ...prevValue,
      [key]: newValue
    }));
  }

  const validateFormValue = (value, key: keyof ZendeskFormData) => {
    if (formUntouched) {
      setFormUntouched(false);
    }

    const isInvalid = checkIsInvalid(value, key);

    const newFormValue: FormValue = {
      value: value,
      error: isInvalid
    }

    setFormData(prevValue => ({
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

  const checkIsInvalid = (newValue: string, key: keyof ZendeskFormData): boolean => {
    switch (key) {
      case 'email':
        return validateEmail(newValue);
    }
  }

  const validateAllFields = () => {
    const emailError = checkIsInvalid(formData.email.value, 'email');


    const emailFormValue = {
      email: {
        ...formData.email,
        error: emailError
      }
    }

    setFormData(emailFormValue);

    if (emailError) {
      setFormHasErrors(true);
      return false;
    } else {
      return true;
    }
  }


  const submit = async () => {
    console.log(formData.email.value)
    if (validateAllFields()) {
      zapierFreeTrial({
        "email": formData.email.value
      })
      setSentEmail(true)
    }
  }

  return (
    <article className={s.articleContainer}>
      <div className={s.imageDiv}>
        <img src='images/jason.jpg' className={s.image} />
      </div>
      {!sentEmail ?
        <div className={s.contentDiv}>
          <Typography variant="h1" className={s.header}>{t('headline')}</Typography>

          {/* <Typography className={s.textFirst}>
              {t('uploadtext')}
            </Typography> */}

          {/* <Typography className={s.textSecond}></Typography> */}
          <Typography >
            {t('uploadArtwork')}
          </Typography>
          <Typography >
            {t('audience')}
          </Typography>
          <Typography >
            {t('price')}
          </Typography>
          <Typography className={s.textSecond}>
            {t('tryFree')}
          </Typography>
          <Typography className={s.textThird}>
          {t('fillEmail')}
          </Typography>
          <form onSubmit={submit}>
            <div className={s.textFieldDiv}>
              <TextField
                classes={{
                  root: s.textField
                }}
                fullWidth
                label="Email"
                required
                variant="outlined"
                value={formData.email.value}
                error={formData.email.error}
                onChange={(e) => handleChange(e, 'email')}
                onBlur={(e) => validateFormValue(e.target.value, 'email')}
                helperText={formData.email.error ? t('mustNotBeEmptyMessage') : ''}
                inputProps={{ maxLength: 50 }}
              >
              </TextField>
              <Typography className={s.textFourth}>
                {t('readArtportable')}<a href="/villkor"> Allmänna villkor</a>
              </Typography>
              <div className={s.buttonDiv}>
                <Button
                  className={s.sendButton}
                  variant="contained"
                  color="primary"
                  disableElevation
                  rounded
                  onClick={() => submit()}
                  disabled={formHasErrors || formUntouched}
                >
                  {t('send')}
                </Button>
              </div>

            </div>
          </form>
        </div>
        :
        <div className={s.contentDiv}>
          <Typography variant="h1" className={s.header}>{t('welcome')}</Typography>
          <Typography className={s.textFifth}>
            {t('welcomeText')}
          </Typography>
        </div>
      }
    </article >
  );
}
