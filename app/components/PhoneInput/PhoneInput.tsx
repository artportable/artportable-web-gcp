import { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button'
import { TextField } from "@material-ui/core";
import { styles } from './phoneInput.css'
import { useTranslation } from 'next-i18next'

interface PhoneNumber {
  phone: FormValue;
}
interface FormValue {
  value: string;
  error: boolean
}
export default function DialogConstruction() {
  const s = styles();
  const { t } = useTranslation(['header', 'common']);

  const [formData, setFormData] = useState<PhoneNumber>({
    phone: { value: '', error: false }
  });
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [formUntouched, setFormUntouched] = useState(true);

  useEffect(() => {
    if(Object.keys(formData).some(key => formData[key].error)) {
      setFormHasErrors(true);
    } else {
      setFormHasErrors(false);
    }
  }, [formData]);

  const handleChange = (event, key: keyof PhoneNumber) => {
    const newValue: FormValue = {
      value: event.target.value,
      error: false,
    }

    setFormData(prevValue => ({
      ...prevValue,
      [key]: newValue
    }));
  }

  const validateFormValue = (value, key: keyof PhoneNumber) => {
    if(formUntouched) {
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

  const validatePhone = (newValue: string): boolean => {
    if (/[0-9]/.test(newValue)) {
      return false;
    }
    return true;
  }

  const checkIsInvalid = (newValue: string, key: keyof PhoneNumber): boolean => {
    switch (key) {
      case 'phone':
        return newValue === '';
    }
  }

  const validateAllFields = () => {
    const phoneError = checkIsInvalid(formData.phone.value, 'phone');

    const phoneFormValue = { 

      phone: {
        ...formData.phone,
        error: phoneError
      }
    }

    setFormData(phoneFormValue);

    if ( phoneError ) {
      setFormHasErrors(true);
      return false;
    } else {
      return true;
    }
  }

  const submit = async () => {
  }


  return (
    <div>
        <TextField
          classes={{
            root: s.textField
          }}
          fullWidth
          placeholder={t('email')}
          required
          variant="outlined"
          value={formData.phone.value}
          error={formData.phone.error}
          onChange={(e) => handleChange(e, 'phone')}
          onBlur={(e) => validateFormValue(e.target.value, 'phone')}
          helperText={formData.phone.error ? t('phoneErrorMessage') : ''}
          />
          <Button 
          variant="contained" 
          color="primary"
          disableElevation 
          rounded
          onClick={() => submit()}
          disabled={formHasErrors || formUntouched}
          >
          {t('send')}</Button>
    </div>
  );
}
