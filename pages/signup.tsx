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
import s from '../styles/signup.module.css'


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useState } from 'react';


interface State {
  password: string;
  showPassword: boolean;
  email: string;
  emailError: boolean;
  emailIsAvailable: boolean;
}

export default function Signup() {
  const { t } = useTranslation('signup');
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    email: '',
    emailError: false,
    emailIsAvailable: false
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if(values.emailError) {
      setValues({ ...values, emailError: emailIsInvalid(event.target.value)});  
    } else {
      setValues({ ...values, email: event.target.value });
    }

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

  const checkForExistingEmail = async (event)=>  {
    event.preventDefault();

    try {
      const json = await (await fetch("https://localhost:5001/api/User?email=fds")).json();
      setValues({ ...values, emailIsAvailable: true });
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
              <div>
                <TextField label={t('username')} fullWidth />
              </div>
              <div>
                <TextField id="first-name" className={s.marginRight} label={t('firstName')} />
                <TextField id="last-name" className={s.marginLeft} label={t('lastName')} />
              </div>
              <div>
                <TextField 
                  id="email" 
                  label={t('email')} 
                  fullWidth 
                  type="email"
                  onChange={handleEmailChange}
                  onBlur={checkForExistingEmail}
                  error={values.emailError}
                  helperText={values.emailError ? t('invalid') : t('valid')} />
              </div>
              <div>
              <FormControl>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
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
                />
              </FormControl>
              </div>
              <div>
                <TextField id="standard-basic" label={t('password')} />
              </div>

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