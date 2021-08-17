import { useEffect, useState } from 'react'
import { Typography, Chip, Paper } from '@material-ui/core';
import { styles } from './indexHero.css'
import { useTranslation } from "next-i18next";
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from "next/router";

import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import Button from '../Button/Button'
import { FullWidthBlock } from '../Main/Main'

export default function IndexHero() {
  const s = styles();
  const { t } = useTranslation('index');
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const promotedUser = "Dace Strausa";

  const [signUpRedirectHref, setSignUpRedirectHref] = useState('');

  useEffect(() => {
    const isDefaultLocale = router.locale == router.defaultLocale;
    const redirectHref = `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/plans`
    setSignUpRedirectHref(redirectHref);
  }, []);

  return (
    <>
      <FullWidthBlock>
        <div className={s.background}></div>
      </FullWidthBlock>
      <div className={s.container}>
        <div className={s.flexContainer}>
            <div className={s.left}>
              <Typography variant="h1" className={s.headline}>
                {t('header')}
              </Typography> 
              <Typography variant="body1" className={s.description}>
                {t('subHeader')}
              </Typography>
              <div className={s.signupButtonContainer}>
                <Button
                  classes={{ 
                    label: s.buttonLabel
                  }}
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                  rounded
                  onClick={() => keycloak.register({ 
                    locale: router.locale,
                    redirectUri: signUpRedirectHref})}>
                  {t('signUp')}
                </Button>
              </div>
            </div>
            <div className={s.right}>
              <div className={s.paintingContainer}>
                <Paper elevation={5}>
                  <img 
                    className={s.boosted} 
                    src="/images/art_landing_horses_painting.png" 
                    alt={`${t("artworkFrom")} + ${promotedUser}`}
                    title={`${t("artworkFrom")} + ${promotedUser}`}/>
                </Paper>
                <div className={s.createdBy}>
                  <span>
                    {t('createdBy')}
                  </span>
                  <Chip
                    classes={{
                      root: s.chip,
                    }}
                    avatar={
                      <div className={s.chipAvatar}>
                        <ProfileAvatar size={25} profilePicture={undefined} />
                      </div>
                    }
                    label={promotedUser}/>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
