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
import { useState } from 'react';


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
        <div className={s.formCard}>
          <Card>
            <CardContent>
              <Typography variant="h1" gutterBottom>
                {t('createAnAccount')}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
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
              <Typography variant="subtitle1" gutterBottom>
                {t('dateOfBirth')}
              </Typography>

              <div className={s.ageContainer}>
                <FormControl className={s.day}>
                  <InputLabel id="day-label">{t('day')}</InputLabel>
                  <Select
                    labelId="day-label"
                    id="day"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={s.month}>
                  <InputLabel id="month-label">{t('month')}</InputLabel>
                  <Select
                    labelId="month-label"
                    id="month"
                  >
                    <MenuItem value={1}>Januari</MenuItem>
                    <MenuItem value={2}>Februari</MenuItem>
                    <MenuItem value={3}>Mars</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={s.year}>
                  <InputLabel id="year-label">{t('year')}</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year"
                  >
                    <MenuItem value={1987}>1987</MenuItem>
                    <MenuItem value={1988}>1988</MenuItem>
                    <MenuItem value={1989}>1989</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className={s.postButtonContainer}>
                <Link href="/signup">
                  <a>
                    <Button 
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
        </div>
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

export async function getStaticProps({ locale }) {
  return { 
    props: {
      ...await serverSideTranslations(locale, ['header', 'signup']),
    } 
  };
}