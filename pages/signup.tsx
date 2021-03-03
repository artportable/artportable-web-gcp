import Head from 'next/head';
import clsx from 'clsx';
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


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '25ch',
    },
  }),
);

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

export default function Signup() {
  const { t } = useTranslation('signup');
  const classes = useStyles();
  const [values, setValues] = useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
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

  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="signUpContainer">
        <div className="formCard">
          <Card>
            <CardContent>
              <FormControl className='form'>
                <Typography variant="h1" gutterBottom>
                  {t('createAnAccount')}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {t('alreadyHaveAnAccountQuestion')}?
                </Typography>
                <div>
                  <TextField className={classes.margin} label={t('username')} fullWidth />
                </div>
                <div>
                  <TextField id="standard-basic" className={clsx(classes.margin, classes.textField)} label={t('firstName')} />
                  <TextField id="standard-basic" className={clsx(classes.margin, classes.textField)} label={t('lastName')} />
                </div>
                <div>
                  <TextField id="standard-basic" label={t('email')} fullWidth />
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
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
      <style jsx>{`
        div.signUpContainer {
          height: var(--viewport-minus-header);
          display: grid;
          grid-template: 
          ". . ." 1fr
          ". form ." auto
          ". . ." 1fr
          
          / 1fr auto 170px;
        }

        .formCard {
          grid-area: form;
        }
      `}</style>
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