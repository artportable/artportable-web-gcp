import { useContext, useEffect, useState } from 'react';
import { Paper, TextField, Typography, Snackbar, MenuItem } from '@material-ui/core'
import Alert, { Color } from '@material-ui/lab/Alert'
import Button from '../Button/Button'
import { styles } from './zendeskFormMenu.css'
import { useTranslation } from 'next-i18next'
import { UserContext } from '../../contexts/user-context';

const artportableZendeskApiUrl = 'https://artportable.zendesk.com/api/v2/requests.json'

interface ZendeskFormData {
  subject: FormValue;
  email: FormValue;
  message: FormValue;
}

interface FormValue {
  value: string;
  error: boolean
}

export default function ZendeskForm() {
  const s = styles();
  const { t } = useTranslation(['support']);
  const { username } = useContext(UserContext);

  const [formData, setFormData] = useState<ZendeskFormData>({
    subject: { value: '', error: false },
    email: { value: '', error: false },
    message: { value: '', error: false },
  });
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [formUntouched, setFormUntouched] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<Color>("success");

  const subjectOptions = [

    {
      value: 'support@artportable.com',
      label: t('support'),
    },
    {
      value: 'invoice@artportable.com',
      label: t('economy')
    },
    {
      value: 'production@artportable.com',
      label: t('production')
    },
    {
      value: 'report@artportable',
      label: t('report')
    },
  ];

  useEffect(() => {
    if (Object.keys(formData).some(key => formData[key].error)) {
      setFormHasErrors(true);
    } else {
      setFormHasErrors(false);
    }
  }, [formData]);

  const handleChange = (event, key: keyof ZendeskFormData) => {
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
      case 'message':
      case 'subject':
        return newValue === '';
    }
  }

  const validateAllFields = () => {
    const emailError = checkIsInvalid(formData.email.value, 'email');
    const subjectError = checkIsInvalid(formData.subject.value, 'subject');
    const messageError = checkIsInvalid(formData.message.value, 'message');

    const emailFormValue = {
      email: {
        ...formData.email,
        error: emailError
      },
      subject: {
        ...formData.subject,
        error: subjectError
      },
      message: {
        ...formData.message,
        error: messageError
      }
    }

    setFormData(emailFormValue);

    if (emailError || subjectError || messageError) {
      setFormHasErrors(true);
      return false;
    } else {
      return true;
    }
  }

  const submit = async () => {
    if (validateAllFields()) {
      const response = await postDataToZendesk();

      handleResponse(response);
    }
  }

  const postDataToZendesk = async () => {
    try {
      const response = await fetch(artportableZendeskApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "request": {
            "requester": {
              "name": username.value ?? 'Anonymous',
              "email": formData.email.value
            },
            "subject": formData.subject.value,
            "comment": {
              "body": formData.message.value
            }
          }
        }),
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const handleResponse = (response: Response) => {
    if (response.status === 201) {
      resetForm();
      showSuccessMessage();
    } else {
      showErrorMessage();
    }
  }

  const showSuccessMessage = () => {
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }

  const showErrorMessage = () => {
    setSnackbarSeverity("warning");
    setSnackbarOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  const resetForm = () => {
    setFormData({
      subject: { value: '', error: false },
      email: { value: '', error: false },
      message: { value: '', error: false },
    });
    setFormUntouched(true);
    setFormHasErrors(false);
  }

  return (
    <div>
      <form className={s.form}>
        <div className={s.textFieldFlex}>
          <TextField
            classes={{
              root: s.textField
            }}
            fullWidth
            select
            label={t('subject')}
            required
            variant="outlined"
            value={formData.subject.value}
            error={formData.subject.error}
            onChange={(e) => handleChange(e, 'subject')}
            onBlur={(e) => validateFormValue(e.target.value, 'subject')}
            helperText={formData.subject.error ? t('mustNotBeEmptyMessage') : ''}
          >
            {subjectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            classes={{
              root: s.textField
            }}
            fullWidth
            placeholder={t('email')}
            required
            variant="outlined"
            value={formData.email.value}
            error={formData.email.error}
            onChange={(e) => handleChange(e, 'email')}
            onBlur={(e) => validateFormValue(e.target.value, 'email')}
            helperText={formData.email.error ? t('emailErrorMessage') : ''}
          >
          </TextField>
          <TextField
            classes={{
              root: s.textFieldMultiline
            }}
            fullWidth
            placeholder={t('message')}
            multiline
            rows={5}
            required
            variant="outlined"
            value={formData.message.value}
            error={formData.message.error}
            onChange={(e) => handleChange(e, 'message')}
            onBlur={(e) => validateFormValue(e.target.value, 'message')}
            helperText={formData.message.error ? t('mustNotBeEmptyMessage') : ''}
          >
          </TextField>

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
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={(e) => handleSnackbarClose(e, "")} variant="filled" severity={snackbarSeverity}>
          {t(`${snackbarSeverity}Message`)}
        </Alert>
      </Snackbar>
    </div>
  );
}
