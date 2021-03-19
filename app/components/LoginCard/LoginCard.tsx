import { CardActions, CardHeader, Checkbox, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useTranslation } from "next-i18next";
import { styles } from './loginCard.css';
import Link from 'next/link';
import Button from '../Button/Button';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { capitalizeFirst } from '../../utils/util';


export default function LoginCard({setEmail, setPassword, remember, setRemember, onClick}) {
  const { t } = useTranslation(['login']);
  const s = styles();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card elevation={2}>
      <CardHeader
        title={t('title')}
        subheader= {
          <div>
            {t('newUser')}{' '}
            <Link href="/signup">
              <a>
                {t('createAccount')}
              </a>
            </Link>
          </div>
        }
      />
      <CardContent>
        <div className={s.inputContainer}>
          <TextField
            id="email"
            label={capitalizeFirst(t('email'))}
            fullWidth
            required
            type="email"
            onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className={s.inputContainer}>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">{capitalizeFirst(t('password'))}</InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              required
            />
          </FormControl>
        </div>
        <div className={s.forgotCredentials}>
          <Link href="/login#">
            <a>
              {t('login:forgotCredentials')}
            </a>
          </Link>
        </div>
        <div className={s.rememberCredentials}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                name="remember"
              />
            }
            label={
              <Typography
                variant="body2"
                color="textSecondary">
                  {t('keepLoggedin')}
              </Typography>
            }
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          roundedButton size="small"
          disableElevation
          onClick={onClick}
        >
          {t('loginButton')}
        </Button>
      </CardActions>
    </Card>
  ); 
}
