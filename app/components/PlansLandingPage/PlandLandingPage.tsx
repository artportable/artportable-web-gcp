import { useState} from 'react'
import Button from '../Button/Button';
import { useTranslation } from "next-i18next";
import type { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { useRouter } from "next/router";
import { styles } from './plansLandingPage.css'
import Paper from '@material-ui/core/Paper'

export default function PlansLandingPage() {
  const s = styles();
  const { t } = useTranslation('index');
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const [signUpRedirectHref, setSignUpRedirectHref] = useState('');
  return (
    <div className={s.container}>
      <Paper elevation={5} className={s.free}>
        <h1>
        {t('artLover')}
        </h1>
        <p>
        {t('artloverDescription')}
        </p>
        <div className={s.row}>
        <h1>
          0 SEK
        </h1>
        <Button
          className={s.signUp}
          variant="contained" 
          color="secondary"
          disableElevation 
          rounded
          onClick={() => keycloak.register({
            locale: router.locale,
            redirectUri: signUpRedirectHref})}>
         {t('signUpArtlover')}
          </Button>
          </div>
      </Paper>

      <Paper elevation={5} className={s.artist}>
        <h1>
        {t('artist')}
        </h1>
        
        <p className={s.text}>
        {t('artistDescription')}
  
        </p>
        <div className={s.row}>
        <h1>
        {t('price')}
        </h1>
        
        <Button
          className={s.signUp}
          variant="contained" 
          color="secondary"
          disableElevation 
          rounded
          onClick={() => keycloak.register({
            locale: router.locale,
            redirectUri: signUpRedirectHref})}>
Bli medlem          </Button>
          </div>
      </Paper>
      
    </div>
  );
}