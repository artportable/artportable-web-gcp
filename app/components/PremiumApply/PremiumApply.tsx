import React, { useState, useEffect, useContext } from 'react';
import { Paper, Typography, Snackbar, Box } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert'
import { useTranslation } from 'next-i18next'
import { capitalizeFirst } from '../../utils/util';
import { styles } from './premiumApply.css';
import Link from 'next/link'
import Button from '../Button/Button';

// import { UserContext } from '../../contexts/user-context'


const artportableZapierApiUrl = `https://hooks.zapier.com/hooks/catch/6936905/b6qrvec/`

export default function PremiumApply() {
  const s = styles();
  const { t } = useTranslation(['join', 'support', 'premium']);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<Color>("success");
  // const { email, family_name, given_name } = useContext(UserContext);
   
  const submit = async () => {
    console.log("submit")
      const response = await postDataToZapier();
      handleResponse (response);
    }

  const postDataToZapier  = async () :Promise<Response> => {
    try { 
      const FormRequest = JSON.stringify({
      "request": {
      "requester": {
        // "artistArtEnthusiast": '',
        // "name": {value: given_name.value + ' ' + family_name.value} ?? '',
        // "phoneNumber": '',
        // "email": {value: email.value},
        // "url":  window.location.href
          },
        }
      });
      console.log(FormRequest);
      const response = await fetch(artportableZapierApiUrl, {
        method: 'POST',
        body: FormRequest
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const handleResponse = (response: Response) => {
    if (response?.status === 200) {
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

  return (
    <Paper className={s.paper}>
      <div className={s.container}>
        <img className={s.artImage}
              src="images/lotwinther1.jpg"
              alt="Artist image"
             />
        <div className={s.rightContainer}> 
          <div className={s.logoDiv}>
            <img className={s.logo}
              src="/Artportable_Logotyp_Black.svg"
              alt="Logo Artportable"
             />
          </div>
          <div className={s.textRight}>
            <div className={s.contentCenter}>
                <div className={s.textFlex}>
                  <Typography component="h1" variant="h2">
                    <Box fontWeight="fontWeightMedium"fontFamily="LyonDisplay">
                      Premium
                    </Box>
                  </Typography> 
                  <Typography component="p" variant="body1" className={s.text}>{capitalizeFirst(t('premium:sale'))}</Typography>
                  </div>
                  </div>   
                  <div className={s.button}>
                    <Link href='/feed'>
                      <a>
                        <Button 
                          rounded
                          variant="contained" 
                          color="primary" 
                          onClick={submit}>
                          Skicka
                        </Button>
                      </a>
                    </Link>
                </div>         
            </div>
        </div> 
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={(e) => handleSnackbarClose(e, "")} variant="filled" severity={snackbarSeverity}>
            {t(`${snackbarSeverity}Message`)}
          </Alert>
      </Snackbar>
    </Paper>
  );
} 