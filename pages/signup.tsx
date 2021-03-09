import Head from 'next/head';
import Link from 'next/link';
import MuiLink from '@material-ui/core/Link';
import Button from '../app/components/Button/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import s from '../styles/signup.module.css'


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'


interface State {
  password: string;
  showPassword: boolean;
  username: string;
  usernameError: boolean;
  usernameIsAvailable: boolean;
  email: string;
  emailError: boolean;
  emailIsAvailable: boolean;
}

export default function Signup() {
  const { t } = useTranslation('signup');
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    username: '',
    usernameError: false,
    usernameIsAvailable: true,
    email: '',
    emailError: false,
    emailIsAvailable: true
  });
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [canContact, setCanContact] = useState(false);
  const days = getDays(1);
  const years = getYears();

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    
    setValues({ ...values,
      username: event.target.value,
      usernameError: false,
      usernameIsAvailable: true
    });  
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    
    setValues({ ...values,
      email: event.target.value,
      emailError: false,
      emailIsAvailable: true
    });  
  }

  const getUsernameErrorMessage = () => {
    if(!values.usernameIsAvailable) {
      return t('usernameAlreadyExists');
    } else if (values.usernameError && values.username === "") {
      return t('usernameIsRequired');
    }
  }

  const getEmailErrorMessage = () => {
    if(!values.emailIsAvailable) {
      return t('emailAlreadyExists');
    }

    return values.emailError ? t('invalid') : '';
  }

  const handleBecomeMemberClick = (event) => {
    event.preventDefault();

    if(emailIsInvalid(values.email)) {
      setValues({ ...values, emailError: true });
      return;
    }
  }

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  }

  const handleDayChange = (event) => {
    setDay(event.target.value);
  }

  const handleYearChange = (event) => {
    setYear(event.target.value);
  }

  const handleCanContactChange = (event) => {
    setCanContact(event.target.checked);
  }

  function emailIsInvalid(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return false;
    }
    return true;
  }

  const handleOnBlurEmail = async (event) => {
    event.preventDefault();

    if(emailIsInvalid(values.email)) {
      setValues({ ...values, 
        emailError: true });
    } else {
      try {
        const isAvailable = await (await fetch(`https://localhost:5001/api/user?email=${event.target.value}`)).json();
        setValues({ ...values, 
          emailIsAvailable: isAvailable, 
          emailError: !isAvailable });
      } catch (error) {
         console.warn("Could not connect to server");
      }
    }
  }

  const handleOnBlurUsername = async (event) => {
    event.preventDefault();

    if(event.target.value === "") {
      setValues({ ...values, usernameError: true });
      return;
    }

    try {
      const isAvailable = await (await fetch(`https://localhost:5001/api/user?username=${event.target.value}`)).json();
      setValues({ ...values, 
        usernameIsAvailable: isAvailable, 
        usernameError: !isAvailable });
    } catch (error) {
        console.warn("Could not connect to server");
    }
    
  }

  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.signUpContainer}>
        <form className={s.formCard}>
          <Card>
            <CardContent>
              <Typography variant="h1" gutterBottom>
                {t('createAnAccount')}
              </Typography>
              <Typography variant="subtitle1" component="p" gutterBottom>
                {t('alreadyHaveAnAccountQuestion')}?{' '}
                <Link href="#" passHref>
                  <MuiLink>
                    {t('login')}
                  </MuiLink>
                </Link>
              </Typography>
              <div className={s.inputContainer}>
                <TextField 
                  id="username"
                  label={t('username')} 
                  fullWidth
                  required
                  error={values.usernameError}
                  onChange={handleUsernameChange}
                  onBlur={handleOnBlurUsername}
                  helperText={getUsernameErrorMessage()} />
              </div>
              <div className={clsx(s.namesContainer, s.inputContainer)}>
                <TextField id="first-name" className={s.marginRight} label={t('firstName')} />
                <TextField id="last-name" className={s.marginLeft} label={t('lastName')} />
              </div>
              <div className={s.inputContainer}>
                <TextField 
                  id="email" 
                  label={t('email')} 
                  fullWidth
                  required
                  type="email"
                  onChange={handleEmailChange}
                  onBlur={handleOnBlurEmail}
                  error={values.emailError}
                  helperText={getEmailErrorMessage()} />
              </div>
              <div className={s.inputContainer}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                />
              </FormControl>
              </div>
              <Typography variant="subtitle1" component="p" gutterBottom>
                {t('dateOfBirth')}
              </Typography>

              <div className={clsx(s.ageContainer, s.inputContainer)}>
                <FormControl className={clsx(s.day, s.marginRight)}>
                  <InputLabel id="day-label">{t('day')}</InputLabel>
                  <Select
                    labelId="day-label"
                    id="day"
                    value={day}
                    onChange={handleDayChange}
                  >
                    {days.map(d => 
                      <MenuItem key={d} value={d}>{d}</MenuItem>  
                    )}
                  </Select>
                </FormControl>

                <FormControl className={clsx(s.month , s.marginLeft, s.marginRight)}>
                  <InputLabel id="month-label">{t('month')}</InputLabel>
                  <Select
                    labelId="month-label"
                    id="month"
                    value={month}
                    onChange={handleMonthChange}
                  >
                    <MenuItem value={1}>{t('months.jan')}</MenuItem>
                    <MenuItem value={2}>{t('months.feb')}</MenuItem>
                    <MenuItem value={3}>{t('months.mar')}</MenuItem>
                    <MenuItem value={4}>{t('months.apr')}</MenuItem>
                    <MenuItem value={5}>{t('months.may')}</MenuItem>
                    <MenuItem value={6}>{t('months.jun')}</MenuItem>
                    <MenuItem value={7}>{t('months.jul')}</MenuItem>
                    <MenuItem value={8}>{t('months.aug')}</MenuItem>
                    <MenuItem value={9}>{t('months.sep')}</MenuItem>
                    <MenuItem value={10}>{t('months.oct')}</MenuItem>
                    <MenuItem value={11}>{t('months.nov')}</MenuItem>
                    <MenuItem value={12}>{t('months.dec')}</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={clsx(s.year, s.marginLeft)}>
                  <InputLabel id="year-label">{t('year')}</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year"
                    value={year}
                    onChange={handleYearChange}
                  >
                    {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                  </Select>
                </FormControl>
              </div>
              <div className={s.inputContainer}>
                <FormControl fullWidth>
                  <InputLabel id="country-or-region-label">{t('countryOrRegion')}</InputLabel>
                  <Select
                    labelId="country-or-region-label"
                    id="country-or-region"
                    defaultValue=""
                  >
                    <MenuItem value={"se"}>{t("countryOrRegionList.sweden")}</MenuItem>
                    <MenuItem value={"uk"}>{t("countryOrRegionList.uk")}</MenuItem>
                  </Select>
                </FormControl>
              </div>


              <div>
                <Typography variant="body2" gutterBottom>
                  {t('emailDisclaimer1')} {' '} 
                  <Link href="#" passHref>
                    <MuiLink>
                      {t('privacyPolicy')}
                    </MuiLink>
                  </Link>
                  . {t('emailDisclaimer2')}.
                </Typography>
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox size="small" checked={canContact} onChange={handleCanContactChange} name="gilad" />}
                  label={<Typography variant="body2" color="textSecondary">{t('emailAgreementCheckbox')}</Typography>}
                />
              </div>
              <div>
                <Typography variant="body2" gutterBottom>
                  {t('agreementText1')} {' '} 
                  <Link href="#" passHref>
                    <MuiLink>
                      {t('usageAgreement')}
                    </MuiLink>
                  </Link>
                  {' '} {t('and')} {' '}
                  <Link href="#" passHref>
                    <MuiLink>
                      {t('privacyPolicy')}
                    </MuiLink>
                  </Link>.
                </Typography>
              </div>

              <div className={s.postButtonContainer}>
                <Link href="/signup">
                  <a>
                    <Button
                      type="submit"
                      size="small" 
                      variant="contained" 
                      color="primary"
                      disableElevation 
                      roundedButton
                      onClick={handleBecomeMemberClick}>
                        {t('becomeMember')}
                    </Button>
                  </a>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      <style jsx global>{`
        body {
          background-image: url("/images/itl.cat_ocean-wallpaper_146662.png");
          background-size: cover;
        }
      `}</style>
    </>
  );
}

function getDays(month) {
  return new Array(31)
    .fill(undefined)
    .map((_, i) => i + 1);
}

function getYears() {
  const numberOfYearsBackwards = 140;
  const currentLegalYear = new Date().getFullYear() - 18;

  return new Array(numberOfYearsBackwards)
    .fill(undefined)
    .map((_, i) => currentLegalYear - i);
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      ...await serverSideTranslations(locale, ['header', 'signup']),
    } 
  };
}